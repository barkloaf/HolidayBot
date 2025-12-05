package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func GuildCreate(client *discordgo.Session, g *discordgo.GuildCreate) {
	guild := g.Guild

	if guild == nil {
		return
	}

	for _, value := range guildCache {
		if guild.ID == value.ID {
			return
		}
	}

	go db.InsertGuild(client, guild)

	misc.Logger(misc.Log{
		Group:    "info",
		Subgroup: "join",
		Guild:    guild.ID,
	})
}
