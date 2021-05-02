package commands

import (
	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

func help(p Params) bool {
	var fieldArray []*discordgo.MessageEmbedField

	switch p.Args[1] {
	case "set":
		for _, value := range SetInfoList {
			fieldArray = append(fieldArray, &discordgo.MessageEmbedField{
				Name:   "`" + value.Syntax + "`",
				Value:  value.Desc,
				Inline: false,
			})
		}
	default:
		for _, value := range InfoList {
			fieldArray = append(fieldArray, &discordgo.MessageEmbedField{
				Name:   "`" + value.Syntax + "`",
				Value:  value.Desc,
				Inline: false,
			})
		}
	}
	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:  config.Config.UseColor,
		Title:  "HolidayBot Help",
		Fields: fieldArray,
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

	return true
}
