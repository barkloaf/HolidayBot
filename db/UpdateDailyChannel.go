package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateDailyChannel func
func UpdateDailyChannel(guildID string, newDailyChannel string) {
	rethinkdb.DB("HolidayBot").Table("guilds").Get(guildID).Update(map[string]interface{}{
		"dailyChannel": newDailyChannel,
	}).RunWrite(conn)
}
