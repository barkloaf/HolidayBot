package commands

import (
	"strconv"
	"strings"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func settings(p Params) bool {
	defaultChannel, err := misc.GetDefaultChannel(p.Client, p.Guild)
	if err != nil {
		return false
	}

	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:       config.Config.UseColor,
		Title:       "Current guild settings for " + p.Guild.Name,
		Description: "Run `help set` for more information",
		Thumbnail: &discordgo.MessageEmbedThumbnail{
			URL: p.Guild.IconURL(),
		},
		Fields: []*discordgo.MessageEmbedField{
			{
				Name:   "Prefix (default: `h]`):",
				Value:  strings.Join(p.DBResult.Prefix, " "),
				Inline: false,
			},
			{
				Name:   "Region (default: `" + misc.GetDefaultRegion(p.Guild) + "`):",
				Value:  p.DBResult.Region,
				Inline: false,
			},
			{
				Name:   "Adult (default: `false`):",
				Value:  strconv.FormatBool(p.DBResult.Adult),
				Inline: false,
			},
			{
				Name:   "Daily Posting (default: `true`):",
				Value:  strconv.FormatBool(p.DBResult.Daily),
				Inline: false,
			},
			{
				Name:   "Daily Posting Channel (if enabled) (default: `<#" + defaultChannel.ID + ">` ):",
				Value:  "<#" + p.DBResult.DailyChannel + ">",
				Inline: false,
			},
			{
				Name:   "Holiday Command (default: `true`):",
				Value:  strconv.FormatBool(p.DBResult.Command),
				Inline: false,
			},
		},
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}
	p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

	return true
}
