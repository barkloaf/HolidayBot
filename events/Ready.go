package events

import (
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//GuildCache Guilds
var GuildCache []*discordgo.Guild

//Ready event
func Ready(client *discordgo.Session, ready *discordgo.Ready) {
	GuildCache = ready.Guilds

	client.UpdateStatusComplex(discordgo.UpdateStatusData{
		Status: "online",
		Game: &discordgo.Game{
			Type: discordgo.GameTypeWatching,
			Name: "for h]help",
		},
	})

	misc.Log("", "info", "start", nil, nil, "")
}
