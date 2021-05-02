package commands

import (
	"fmt"
	"strings"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"

	"github.com/Knetic/govaluate"
)

func eval(p Params) bool {
	var (
		title  string
		succ   bool
		output string
	)

	roCMD := strings.TrimPrefix(strings.TrimSpace(strings.Join(p.Args, " ")), p.Args[0]+" ")

	functions := map[string]govaluate.ExpressionFunction{
		"guildFetch": func(args ...interface{}) (interface{}, error) {
			return db.GuildFetch(args[0].(string))
		},
	}

	expr, compErr := govaluate.NewEvaluableExpressionWithFunctions(roCMD, functions)
	if compErr != nil {
		output = compErr.Error()
		title = "❌ Compiler Error!"
		succ = false
	} else {
		params := make(map[string]interface{})
		params["client"] = p.Client
		params["message"] = p.Message
		params["guild"] = p.Guild
		params["args"] = p.Args
		params["dbResult"] = p.DBResult

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

	if len(output) > 1018 {
		arrayized := strings.Split(output, " ")
		p.Client.ChannelMessageSend(p.Message.ChannelID, strings.Join(arrayized[:len(arrayized)/2], " "))
		p.Client.ChannelMessageSend(p.Message.ChannelID, strings.Join(arrayized[(len(arrayized)/2)+1:], " "))
		output = "overflow"
	}

	embed := &discordgo.MessageEmbed{
		Title: title,
		Fields: []*discordgo.MessageEmbedField{
			{
				Name:   "Input:",
				Value:  "```go\n" + roCMD + "```",
				Inline: false,
			},
			{
				Name:   "Output:",
				Value:  "```" + output + "```",
				Inline: false,
			},
		},
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

	if !succ {
		misc.Log(p.Message.Content, "fail", "ERR", p.Message.Author, p.Guild, "")
	}

	return succ
}
