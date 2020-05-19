package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateRegion func
func UpdateRegion(guildID string, newRegion string) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"region": newRegion,
	}).RunWrite(conn)
}
