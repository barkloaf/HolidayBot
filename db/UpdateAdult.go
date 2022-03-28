package db

import "context"

func UpdateAdult(id string, newAdult bool) {
	conn.Exec(
		context.Background(),
		"update guilds set adult = $1 where id = $2",
		newAdult,
		id,
	)
}
