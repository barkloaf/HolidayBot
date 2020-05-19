package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateCommand func
func UpdateCommand(guildID string, newCommand bool) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"command": newCommand,
	}).RunWrite(conn)
}
