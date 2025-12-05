package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func GuildDelete(client *discordgo.Session, g *discordgo.GuildDelete) {
	guild := g.Guild

	if guild == nil {
		return
	}

	if guild.Unavailable {
		return
	}

	go db.DeleteGuild(guild.ID)

	misc.Logger(misc.Log{
		Group:    "info",
		Subgroup: "leave",
		Guild:    guild.ID,
	})
}
