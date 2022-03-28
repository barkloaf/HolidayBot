package db

import "context"

func UpdateTimezone(id string, newTz string) {
	conn.Exec(
		context.Background(),
		"update guilds set timezone = $1 where id = $2",
		newTz,
		id,
	)
}
