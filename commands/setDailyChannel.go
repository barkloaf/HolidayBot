package commands

import (
	"errors"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func setDailyChannel(client *discordgo.Session, interaction *discordgo.Interaction) error {
	channel := interaction.ApplicationCommandData().Options[0].Options[0].ChannelValue(client)

	perms, err := client.State.UserChannelPermissions(client.State.User.ID, channel.ID)
	if err != nil {
		misc.Logger(misc.Log{
			Content: err.Error(),
			Group:   "err",
		})

		return errors.New("PERM")
	}
	if (perms&discordgo.PermissionViewChannel != discordgo.PermissionViewChannel) || (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) || (channel.Type != discordgo.ChannelTypeGuildText) {
		return errors.New("PERM")
	}

	go db.UpdateDailyChannel(interaction.GuildID, channel.ID)

	return nil
}
