package db

import "context"

func UpdateCommand(id string, newCmd bool) {
	conn.Exec(
		context.Background(),
		"update guilds set command = $1 where id = $2",
		newCmd,
		id,
	)
}
