package db

import (
	"fmt"

	"gopkg.in/rethinkdb/rethinkdb-go.v6"
)

var conn *rethinkdb.Session

//Guild struct
type Guild struct {
	ID           string   `rethinkdb:"id"`
	Guildname    string   `rethinkdb:"guildname"`
	Prefix       []string `rethinkdb:"prefix"`
	Region       string   `rethinkdb:"region"`
	DailyChannel string   `rethinkdb:"dailyChannel"`
	Adult        bool     `rethinkdb:"adult"`
	Daily        bool     `rethinkdb:"daily"`
	Command      bool     `rethinkdb:"command"`
}

//Blacklistee struct
type Blacklistee struct {
	ID     string `rethinkdb:"id"`
	Reason string `rethinkdb:"reason"`
	Date   int64  `rethinkdb:"date"`
}

func init() {
	var err error
	conn, err = rethinkdb.Connect(rethinkdb.ConnectOpts{
		Address: "localhost:28015",
	})
	if err != nil {
		fmt.Printf("Database Error: %v", err)
	}

}
