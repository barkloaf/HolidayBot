package misc

import (
	"errors"
	"fmt"

	"github.com/bwmarrin/discordgo"
)

//GetDefaultChannel func
func GetDefaultChannel(client *discordgo.Session, guild *discordgo.Guild) (*discordgo.Channel, error) {
	obj, err := client.State.Guild(guild.ID)
	if err != nil {
		return nil, err
	}

	var channel *discordgo.Channel
	for _, value := range obj.Channels {
		perms, err := client.State.UserChannelPermissions(client.State.User.ID, value.ID)
		if err != nil {
			fmt.Printf("Perms check Error: %v", err)
			return nil, err
		}

		if (perms&discordgo.PermissionReadMessages == discordgo.PermissionReadMessages) && (perms&discordgo.PermissionSendMessages == discordgo.PermissionSendMessages) && (perms&discordgo.PermissionEmbedLinks == discordgo.PermissionEmbedLinks) && (value.Type == discordgo.ChannelTypeGuildText) {
			channel = value
			break
		}
	}
	if channel == nil {
		return nil, errors.New("no channels")
	}

	return channel, nil
}
