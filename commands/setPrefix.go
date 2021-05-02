package commands

import (
	"strings"

	"github.com/barkloaf/HolidayBot/db"
)

func setPrefix(p Params) bool {
	dbPrefixes := p.DBResult.Prefix

	if len(p.Args[3]) < 1 {
		Errors(p.Client, p.Message, p.Guild, "SYN", SetPrefix)
		return false
	}

	switch strings.ToLower(p.Args[2]) {
	case "add":
		for i := range dbPrefixes {
			if dbPrefixes[i] == p.Args[3] {
				return true
			}
		}

		dbPrefixes = append(dbPrefixes, p.Args[3])
	case "remove":
		if len(dbPrefixes) < 2 {
			Errors(p.Client, p.Message, p.Guild, "SYN", SetPrefix)
			return false
		}
		var index int
		for i := range dbPrefixes {
			if dbPrefixes[i] == p.Args[3] {
				index = i
				break
			}
		}
		if dbPrefixes[index] != p.Args[3] {
			Errors(p.Client, p.Message, p.Guild, "SYN", SetPrefix)
			return false
		}

		dbPrefixes = append(dbPrefixes[:index], dbPrefixes[index+1:]...)
	default:
		Errors(p.Client, p.Message, p.Guild, "SYN", SetPrefix)
		return false
	}

	go db.UpdatePrefix(p.Guild.ID, dbPrefixes)

	return true
}
