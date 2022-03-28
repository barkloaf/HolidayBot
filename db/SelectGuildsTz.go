package db

import "context"

func SelectGuildsTz(tz string) ([]Guild, error) {
	rows, err := conn.Query(
		context.Background(),
		"select id, timezone, dailychannel, adult, daily, command from guilds where timezone = $1 and daily = $2",
		tz,
		true,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var guilds []Guild

	for rows.Next() {
		var guild Guild
		err := rows.Scan(&guild.ID, &guild.Timezone, &guild.DailyChannel, &guild.Adult, &guild.Daily, &guild.Command)
		if err != nil {
			continue
		}

		guilds = append(guilds, guild)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return guilds, nil
}
