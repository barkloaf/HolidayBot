package commands

import (
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func About(client *discordgo.Session, interaction *discordgo.Interaction) error {
	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color:       misc.Config.UseColor,
					Title:       "Hello, my name is HolidayBot!",
					Description: "I am a bot created with DiscordGo that spits out real holidays that you may have never heard of before. All holidays are grabbed from [checkiday.com](https://checkiday.com).\nCreated by barkloaf :3",
					Thumbnail: &discordgo.MessageEmbedThumbnail{
						URL: client.State.User.AvatarURL(""),
					},
					Fields: []*discordgo.MessageEmbedField{
						{
							Name:   "Check out the source and invite link!",
							Value:  "[GitHub](https://github.com/barkloaf/HolidayBot)",
							Inline: false,
						},
						{
							Name:   "Vote for HolidayBot!",
							Value:  "[Top.gg](https://top.gg/bot/504508062929911869/vote)",
							Inline: false,
						},
					},
				},
			},
		},
	})

	return nil
}
