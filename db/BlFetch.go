package db

import (
	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

//BlFetch func
func BlFetch(blacklisteeID string) (Blacklistee, error) {
	cursor, err := rethinkdb.DB("HolidayBot").Table("blacklist").Get(blacklisteeID).Run(conn)

	var blacklistee Blacklistee
	cursor.One(&blacklistee)

	return blacklistee, err
}
