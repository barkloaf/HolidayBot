package db

import (
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//CreateGuild func
func CreateGuild(client *discordgo.Session, guild *discordgo.Guild) {
	defaultChannel, err := misc.GetDefaultChannel(client, guild)
	if err != nil {
		return
	}

	rethinkdb.DB("HolidayBot").Table("guilds").Insert(map[string]interface{}{
		"id":        guild.ID,
		"guildname": guild.Name,
		"prefix": []string{
			"h]",
		},
		"region":       misc.GetDefaultRegion(guild),
		"adult":        false,
		"daily":        true,
		"dailyChannel": defaultChannel.ID,
		"command":      true,
	}).RunWrite(conn)
}
