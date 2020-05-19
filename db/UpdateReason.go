package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//UpdateReason func
func UpdateReason(blacklisteeID string, newReason string) {
	rethinkdb.DB("HolidayBot").Table("blacklist").Get(blacklisteeID).Update(map[string]interface{}{
		"reason": newReason,
	}).RunWrite(conn)
}
