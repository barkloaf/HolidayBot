package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//GuildCreate event
func GuildCreate(client *discordgo.Session, guild *discordgo.GuildCreate) {
	for _, value := range GuildCache {
		if guild.ID == value.ID {
			return
		}
	}

	db.CreateGuild(client, guild.Guild)

	misc.Log("", "info", "join", nil, guild.Guild, "")
}
