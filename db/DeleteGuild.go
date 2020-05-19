package db

import (
	"github.com/bwmarrin/discordgo"
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//DeleteGuild func
func DeleteGuild(guild *discordgo.Guild) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guild.ID).Delete().RunWrite(conn)
}
