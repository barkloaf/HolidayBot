package misc

import (
	"errors"

	"github.com/bwmarrin/discordgo"
)

func GetDefaultChannel(client *discordgo.Session, guild *discordgo.Guild) (*discordgo.Channel, error) {
	obj, err := client.State.Guild(guild.ID)
	if err != nil {
		return nil, err
	}

	var channel *discordgo.Channel
	for _, value := range obj.Channels {
		perms, err := client.State.UserChannelPermissions(client.State.User.ID, value.ID)
		if err != nil {
			return nil, err
		}

		if (perms&discordgo.PermissionViewChannel == discordgo.PermissionViewChannel) && (perms&discordgo.PermissionSendMessages == discordgo.PermissionSendMessages) && (perms&discordgo.PermissionEmbedLinks == discordgo.PermissionEmbedLinks) && (value.Type == discordgo.ChannelTypeGuildText) {
			channel = value
			break
		}
	}
	if channel == nil {
		return nil, errors.New("no channels")
	}

	return channel, nil
}
