package commands

import (
	"math"
	"strconv"

	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func Ping(client *discordgo.Session, interaction *discordgo.Interaction) error {
	latency := strconv.FormatFloat(math.Round(.000001*float64(client.HeartbeatLatency())), 'f', -1, 64)

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color: misc.Config.UseColor,
					Title: "Pong!\n🏓  " + latency + " ms",
				},
			},
		},
	})

	return nil
}
