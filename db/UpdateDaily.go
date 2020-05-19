package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateDaily func
func UpdateDaily(guildID string, newDaily bool) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"daily": newDaily,
	}).RunWrite(conn)
}
