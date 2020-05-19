package db

import (
	"time"

	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//CreateBlacklistee func
func CreateBlacklistee(blacklisteeID string, reason string) {
	if reason == "" {
		reason = "None"
	}
	rethinkdb.DB("HolidayBot").Table("blacklist").Insert(map[string]interface{}{
		"id":     blacklisteeID,
		"reason": reason,
		"date":   time.Now().Unix(),
	}).RunWrite(conn)
}
