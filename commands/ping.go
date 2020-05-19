package commands

import (
	"math"
	"strconv"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

func ping(p Params) bool {
	apiLatency := strconv.FormatFloat(math.Round(.000001*float64(p.Client.HeartbeatLatency())), 'f', -1, 64)

	var fieldArray []*discordgo.MessageEmbedField
	fieldArray = append(fieldArray, &discordgo.MessageEmbedField{
		Name:   "API Latency:",
		Value:  apiLatency + "ms",
		Inline: true,
	})

	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:  config.Config.UseColor,
		Title:  "Pinging...",
		Fields: fieldArray,
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	startMessage, err := p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)
	if err != nil {
		return false
	}

	startTime, _ := p.Message.Timestamp.Parse()
	endTime, _ := startMessage.Timestamp.Parse()

	msgLatency := strconv.FormatFloat(math.Round(.000001*(float64(endTime.UnixNano()-startTime.UnixNano()))), 'f', -1, 64)

	fieldArray = append(fieldArray, &discordgo.MessageEmbedField{
		Name:   "Message Latency:",
		Value:  msgLatency + "ms",
		Inline: true,
	})

	embed = &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:  config.Config.UseColor,
		Title:  "Pong!",
		Fields: fieldArray,
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	p.Client.ChannelMessageEditEmbed(p.Message.ChannelID, startMessage.ID, embed)

	return true
}
