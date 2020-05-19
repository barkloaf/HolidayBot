package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateGuildName func
func UpdateGuildName(guildID string, newGuildName string) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"guildname": newGuildName,
	}).RunWrite(conn)
}
