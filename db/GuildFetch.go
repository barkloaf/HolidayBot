package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//GuildFetch func
func GuildFetch(guildID string) (Guild, error) {
	cursor, err := rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Run(conn)

	var guild Guild
	cursor.One(&guild)

	return guild, err
}
