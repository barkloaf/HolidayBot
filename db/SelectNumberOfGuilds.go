package db

import "context"

func SelectNumberOfGuilds() (int, error) {
	rows, err := conn.Query(
		context.Background(),
		"select reltuples::bigint as estimate from pg_class where oid = 'guilds'::regclass",
	)

	if err != nil {
		return 0, err
	}

	defer rows.Close()

	var estimate int

	for rows.Next() {
		err := rows.Scan(&estimate)
		if err != nil {
			return 0, err
		}
	}

	return estimate, nil
}
