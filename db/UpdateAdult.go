package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateAdult func
func UpdateAdult(guildID string, newAdult bool) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"adult": newAdult,
	}).RunWrite(conn)
}
