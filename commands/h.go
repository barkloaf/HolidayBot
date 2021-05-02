package commands

import (
	"time"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func h(p Params) bool {
	tz := p.DBResult.Region

	_, err := time.LoadLocation(p.Args[1])
	if err == nil && p.Args[1] != "" {
		tz = p.Args[1]
	}

	field, err := misc.Feed(tz, p.DBResult.Adult)
	if err != nil {
		Errors(p.Client, p.Message, p.Guild, "FEED", H)
		return false
	}

	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:  config.Config.UseColor,
		Title:  "Today's Holidays (" + tz + "):",
		URL:    "https://checkiday.com",
		Fields: field,
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

	return true
}
