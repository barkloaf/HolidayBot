package db

import "context"

func UpdateDaily(id string, newDaily bool) {
	conn.Exec(
		context.Background(),
		"update guilds set daily = $1 where id = $2",
		newDaily,
		id,
	)
}
