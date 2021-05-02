package commands

import "github.com/barkloaf/HolidayBot/db"

func setAdult(p Params) bool {
	var newAdult bool
	switch p.Args[2] {
	case "on", "true":
		newAdult = true
	case "off", "false":
		newAdult = false
	default:
		Errors(p.Client, p.Message, p.Guild, "SYN", SetAdult)
		return false
	}

	go db.UpdateAdult(p.Guild.ID, newAdult)

	return true
}
