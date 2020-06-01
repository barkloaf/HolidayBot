package commands

import "github.com/barkloaf/HolidayBot/db"

func setCommand(p Params) bool {
	if len(p.Args) < 3 {
		p.Args = append(p.Args, "")
	}

	var newCommand bool
	switch p.Args[2] {
	case "on", "true":
		newCommand = true
	case "off", "false":
		newCommand = false
	default:
		Errors(p.Client, p.Message, p.Guild, "SYN", SetCommand)
		return false
	}

	go db.UpdateDaily(p.Guild.ID, newCommand)

	return true
}
