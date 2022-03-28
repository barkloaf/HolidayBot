package db

import "context"

func SelectGuild(id string) (Guild, error) {
	row := conn.QueryRow(
		context.Background(),
		"select id, timezone, dailychannel, adult, daily, command from guilds where id = $1",
		id,
	)

	var guild Guild
	err := row.Scan(&guild.ID, &guild.Timezone, &guild.DailyChannel, &guild.Adult, &guild.Daily, &guild.Command)

	return guild, err
}
