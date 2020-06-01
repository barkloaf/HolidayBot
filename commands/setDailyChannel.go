package commands

import (
	"fmt"
	"regexp"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/bwmarrin/discordgo"
)

func setDailyChannel(p Params) bool {
	if len(p.Args) < 3 {
		p.Args = append(p.Args, "")
	}

	idRegex := regexp.MustCompilePOSIX("([^>]*)")
	match := idRegex.FindStringSubmatch(p.Args[2])
	if len(match) < 2 {
		match = append(match, "", "")
	}

	channel, err := p.Client.Channel(match[1])
	if err != nil {
		idRegex = regexp.MustCompilePOSIX("<#([^>]*)>")
		match := idRegex.FindStringSubmatch(p.Args[2])
		if len(match) < 2 {
			match = append(match, "", "")
		}

		channel, err = p.Client.Channel(match[1])
		if err != nil {
			Errors(p.Client, p.Message, p.Guild, "SYN", SetDailyChannel)
			return false
		}
	}

	perms, err := p.Client.State.UserChannelPermissions(p.Client.State.User.ID, channel.ID)
	if err != nil {
		fmt.Printf("Perms check Error: %v", err)
		return false
	}
	if (perms&discordgo.PermissionReadMessages != discordgo.PermissionReadMessages) || (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) || (channel.Type != discordgo.ChannelTypeGuildText) {
		Errors(p.Client, p.Message, p.Guild, "SYN", SetDailyChannel)
		return false
	}

	go db.UpdateDailyChannel(p.Guild.ID, channel.ID)

	return true
}
