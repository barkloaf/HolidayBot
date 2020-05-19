package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//DeleteBlacklistee func
func DeleteBlacklistee(blacklisteeID string) {
	rethinkdb.DB("HolidayBot").Table("blacklist").Get(blacklisteeID).Delete().RunWrite(conn)
}
