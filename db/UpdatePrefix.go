package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdatePrefix func
func UpdatePrefix(guildID string, newPrefix []string) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"prefix": newPrefix,
	}).RunWrite(conn)
}
