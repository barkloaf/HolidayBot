package commands

import "github.com/barkloaf/HolidayBot/db"

func setDaily(p Params) bool {
	var newDaily bool
	switch p.Args[2] {
	case "on", "true":
		newDaily = true
	case "off", "false":
		newDaily = false
	default:
		Errors(p.Client, p.Message, p.Guild, "SYN", SetDaily)
		return false
	}

	go db.UpdateDaily(p.Guild.ID, newDaily)

	return true
}
