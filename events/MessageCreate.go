package events

import (
	"fmt"
	"runtime"
	"strings"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"

	"github.com/Knetic/govaluate"
)

func MessageCreate(client *discordgo.Session, m *discordgo.MessageCreate) {
	message := m.Message

	if message.Author.ID != misc.Config.OwnerID {
		return
	}

	var prefix string
	for _, value := range []string{
		"<@!" + client.State.User.ID + "> eval",
		"<@!" + client.State.User.ID + ">eval",
		"<@" + client.State.User.ID + "> eval",
		"<@" + client.State.User.ID + ">eval",
	} {
		if strings.HasPrefix(message.Content, value) {
			prefix = value
		}
	}
	if prefix == "" {
		return
	}

	var memory runtime.MemStats
	runtime.ReadMemStats(&memory)

	cmd := strings.TrimSpace(strings.TrimPrefix(message.Content, prefix))
	input := cmd

	var dbResult db.Guild
	guild, err := client.Guild(message.GuildID)
	if err == nil && guild.ID != "" {
		dbResult, _ = db.SelectGuild(message.GuildID)
	}

	functions := map[string]govaluate.ExpressionFunction{
		"selectGuild": func(args ...interface{}) (interface{}, error) {
			return db.SelectGuild(args[0].(string))
		},
	}

	var (
		title  string
		output string
		succ   bool
	)

	expr, compErr := govaluate.NewEvaluableExpressionWithFunctions(input, functions)
	if compErr != nil {
		output = compErr.Error()
		title = "❌ Compiler Error!"
		succ = false
	} else {
		params := map[string]interface{}{
			"client":   client,
			"message":  message,
			"guild":    guild,
			"dbResult": dbResult,
			"memory":   memory,
		}

		data, rtErr := expr.Evaluate(params)
		if rtErr != nil {
			output = rtErr.Error()
			title = "❌ Runtime Error!"
			succ = false
		} else {
			output = fmt.Sprint(data)
			title = "✅ Eval Successful!"
			succ = true
		}
	}

	if len(input) > 1014 {
		input = "overflow"
	}

	if len(output) > 1018 {
		arrayized := strings.Split(output, " ")
		msg, _ := client.ChannelMessageSend(message.ChannelID, strings.Join(arrayized[:len(arrayized)/4], " "))
		if msg != nil {
			client.ChannelMessageSend(message.ChannelID, strings.Join(arrayized[(len(arrayized)/4)+1:len(arrayized)/2], " "))
			client.ChannelMessageSend(message.ChannelID, strings.Join(arrayized[(len(arrayized)/2)+1:(3*(len(arrayized)/4))], " "))
			client.ChannelMessageSend(message.ChannelID, strings.Join(arrayized[(3*(len(arrayized)/4))+1:], " "))
		} else {
			fmt.Printf("\n%v\n", output)
		}

		output = "overflow"
	}

	embed := &discordgo.MessageEmbed{
		Title: title,
		Fields: []*discordgo.MessageEmbedField{
			{
				Name:   "Input:",
				Value:  "```go\n" + input + "```",
				Inline: false,
			},
			{
				Name:   "Output:",
				Value:  "```" + output + "```",
				Inline: false,
			},
		},
		Footer: &discordgo.MessageEmbedFooter{
			Text:    message.Author.Username,
			IconURL: message.Author.AvatarURL(""),
		},
	}

	client.ChannelMessageSendEmbed(message.ChannelID, embed)

	if !succ {
		misc.Logger(misc.Log{
			Interaction: &discordgo.Interaction{
				User: &discordgo.User{
					ID: message.Author.ID,
				},
			},
			Content:  cmd,
			Group:    "fail",
			Subgroup: "EVAL",
			Guild:    message.GuildID,
		})

		return
	}

	misc.Logger(misc.Log{
		Interaction: &discordgo.Interaction{
			User: &discordgo.User{
				ID: message.Author.ID,
			},
		},
		Content: cmd,
		Group:   "succ",
		Guild:   message.GuildID,
	})
}
