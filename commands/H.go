package commands

import (
	"errors"
	"time"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func H(client *discordgo.Session, interaction *discordgo.Interaction) error {
	var opt string
	if len(interaction.ApplicationCommandData().Options) > 0 {
		opt = interaction.ApplicationCommandData().Options[0].StringValue()
	}

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionApplicationCommandAutocompleteResult,
		Data: &discordgo.InteractionResponseData{
			Choices: misc.Autocomplete(misc.Zones, opt),
		},
	})

	if interaction.Type != discordgo.InteractionApplicationCommand {
		return errors.New("")
	}

	var (
		tz    string
		adult bool
	)

	guild, err := client.Guild(interaction.GuildID)
	if err == nil && guild.ID != "" {
		dbResult, err := db.SelectGuild(guild.ID)
		if err != nil {
			return errors.New("")
		}

		if !dbResult.Command {
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
							Description: "This command has been disabled in this guild.",
						},
					},
				},
			})

			return errors.New("")
		}

		tz = dbResult.Timezone
		adult = dbResult.Adult
	} else {
		tz = "UTC"
		adult = false
	}

	_, err = time.LoadLocation(opt)
	if err == nil && opt != "" && opt != "Local" {
		tz = opt
	}

	fields, err := misc.Feed(tz, adult)
	if err != nil {
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
						Description: "There was an error getting the feed from [Checkiday](https://checkiday.com)",
					},
				},
			},
		})

		return errors.New("FEED")
	}

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color:  misc.Config.UseColor,
					Title:  "Today's Holidays (" + tz + "):",
					URL:    "https://checkiday.com",
					Fields: fields,
				},
			},
		},
	})

	return nil
}
