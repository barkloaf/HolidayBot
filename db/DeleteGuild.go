package db

import "context"

func DeleteGuild(id string) {
	conn.Exec(
		context.Background(),
		"delete from guilds where id = $1",
		id,
	)
}
