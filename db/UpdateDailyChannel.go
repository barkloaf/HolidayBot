package db

import "context"

func UpdateDailyChannel(id string, newDC string) {
	conn.Exec(
		context.Background(),
		"update guilds set dailychannel = $1 where id = $2",
		newDC,
		id,
	)
}
