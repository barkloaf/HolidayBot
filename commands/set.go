package commands

import (
	"fmt"
	"strings"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

func set(p Params) bool {
	perms, err := p.Client.State.UserChannelPermissions(p.Message.Author.ID, p.Message.ChannelID)
	if err != nil {
		fmt.Printf("Perms check Error: %v", err)
	}
	if perms&discordgo.PermissionManageServer != discordgo.PermissionManageServer {
		if p.Message.Author.ID != config.Config.OwnerID {
			Errors(p.Client, p.Message, p.Guild, "PERM", Set)
			return false
		}
	}
	if SetCommandMap[strings.ToLower(p.Args[1])] == nil {
		Errors(p.Client, p.Message, p.Guild, "SYN", Set)
		return false
	}

	succ := SetCommandMap[strings.ToLower(""+p.Args[1])](p)
	if succ {
		embed := &discordgo.MessageEmbed{
			Author: &discordgo.MessageEmbedAuthor{
				Name:    p.Client.State.User.Username,
				IconURL: p.Client.State.User.AvatarURL(""),
			},
			Color:       config.Config.UseColor,
			Title:       "Guild settings changed!",
			Description: "Run `settings` to view all settings",
			Footer: &discordgo.MessageEmbedFooter{
				Text:    p.Message.Author.Username,
				IconURL: p.Message.Author.AvatarURL(""),
			},
		}
		p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

		return true
	}

	return false
}
