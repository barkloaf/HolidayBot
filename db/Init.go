package db

import (
	"context"
	"log"

	"github.com/jackc/pgx/v4/pgxpool"
)

var conn *pgxpool.Pool

type Guild struct {
	ID           string
	Timezone     string
	DailyChannel string
	Adult        bool
	Daily        bool
	Command      bool
}

func Init(connection *pgxpool.Pool) {
	var err error

	_, err = connection.Exec(
		context.Background(),
		"create table if not exists guilds (id varchar(20) primary key, timezone varchar(50) not null, dailychannel varchar(20) not null, adult boolean not null, daily boolean not null, command boolean not null)",
	)
	if err != nil {
		log.Panicf("Database erorr: %v", err)
	}

	conn = connection
}
