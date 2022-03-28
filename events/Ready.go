package events

import (
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

var guildCache []*discordgo.Guild

func Ready(client *discordgo.Session, ready *discordgo.Ready) {
	guildCache = ready.Guilds

	client.UpdateStatusComplex(discordgo.UpdateStatusData{
		Status: "online",
		Activities: []*discordgo.Activity{
			{
				Name: "the holidays!",
				Type: discordgo.ActivityTypeWatching,
			},
		},
	})

	misc.Logger(misc.Log{
		Group:    "info",
		Subgroup: "ready",
	})
}
