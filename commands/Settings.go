package commands

import (
	"errors"
	"strconv"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func Settings(client *discordgo.Session, interaction *discordgo.Interaction) error {
	guild, err := client.Guild(interaction.GuildID)
	if err != nil || guild.ID == "" {
		return errors.New("")
	}

	defaultChannel, err := misc.GetDefaultChannel(client, guild)
	if err != nil {
		if err.Error() != "no channels" {
			misc.Logger(misc.Log{
				Content: err.Error(),
				Group:   "err",
			})
		}

		return errors.New("")
	}

	dbResult, err := db.SelectGuild(guild.ID)
	if err != nil || dbResult.ID == "" {
		return errors.New("")
	}

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Flags: discordgo.MessageFlagsEphemeral,
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color: misc.Config.UseColor,
					Title: "Current guild settings for " + guild.Name,
					Thumbnail: &discordgo.MessageEmbedThumbnail{
						URL: guild.IconURL(),
					},
					Fields: []*discordgo.MessageEmbedField{
						{
							Name:   "Timezone (default: `" + misc.GetDefaultTimezone(guild) + "`):",
							Value:  dbResult.Timezone,
							Inline: false,
						},
						{
							Name:   "Adult (default: `false`):",
							Value:  strconv.FormatBool(dbResult.Adult),
							Inline: false,
						},
						{
							Name:   "Daily Posting (default: `true`):",
							Value:  strconv.FormatBool(dbResult.Daily),
							Inline: false,
						},
						{
							Name:   "Daily Posting Channel (if enabled) (default: `<#" + defaultChannel.ID + ">` ):",
							Value:  "<#" + dbResult.DailyChannel + ">",
							Inline: false,
						},
						{
							Name:   "Holiday Command (default: `true`):",
							Value:  strconv.FormatBool(dbResult.Command),
							Inline: false,
						},
					},
				},
			},
		},
	})

	return nil
}
