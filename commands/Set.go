package commands

import (
	"errors"

	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

var setMap = map[string]func(client *discordgo.Session, interaction *discordgo.Interaction) error{
	"adult":        setAdult,
	"command":      setCommand,
	"daily":        setDaily,
	"dailychannel": setDailyChannel,
	"reset":        setReset,
	"timezone":     setTimezone,
}

func Set(client *discordgo.Session, interaction *discordgo.Interaction) error {
	guild, err := client.Guild(interaction.GuildID)
	if err != nil || guild.ID == "" {
		return errors.New("")
	}

	opt := interaction.ApplicationCommandData().Options[0].Name

	fn, exists := setMap[opt]
	if !exists {
		return errors.New("")
	}

	if interaction.Member.Permissions&discordgo.PermissionManageServer != discordgo.PermissionManageServer {
		client.InteractionRespond(interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Flags: uint64(discordgo.MessageFlagsEphemeral),
				Embeds: []*discordgo.MessageEmbed{
					{
						Author: &discordgo.MessageEmbedAuthor{
							Name:    client.State.User.Username,
							IconURL: client.State.User.AvatarURL(""),
						},
						Color:       misc.Config.FailColor,
						Title:       "Error!",
						Description: "You need Manage Server permissions to run this command.",
					},
				},
			},
		})

		return errors.New("PERM")
	}

	if interaction.Type != discordgo.InteractionApplicationCommand && opt != "timezone" {
		return errors.New("")
	}

	err = fn(client, interaction)

	if err != nil {
		var content string

		switch err.Error() {
		case "PERM":
			content = "I don't have either view channel, send messages, or embed links permissions for that channel!"
		case "TZ":
			content = "Invalid tz/zoneinfo database region! See full list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)."
		case "DENY":
			content = "You must confirm this command by filling its option with \"YES\" (all caps)."
		default:
			return err
		}

		client.InteractionRespond(interaction, &discordgo.InteractionResponse{
			Type: discordgo.InteractionResponseChannelMessageWithSource,
			Data: &discordgo.InteractionResponseData{
				Flags: uint64(discordgo.MessageFlagsEphemeral),
				Embeds: []*discordgo.MessageEmbed{
					{
						Author: &discordgo.MessageEmbedAuthor{
							Name:    client.State.User.Username,
							IconURL: client.State.User.AvatarURL(""),
						},
						Color:       misc.Config.FailColor,
						Title:       "Error!",
						Description: content,
					},
				},
			},
		})

		return err
	}

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Flags: uint64(discordgo.MessageFlagsEphemeral),
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color:       misc.Config.UseColor,
					Title:       "Guild settings changed!",
					Description: "Run `/settings` to view all settings",
				},
			},
		},
	})

	return nil
}
