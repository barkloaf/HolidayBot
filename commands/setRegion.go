package commands

import (
	"time"

	"github.com/barkloaf/HolidayBot/db"
)

func setRegion(p Params) bool {
	if len(p.Args) < 3 {
		p.Args = append(p.Args, "")
	}

	_, err := time.LoadLocation(p.Args[2])
	if err != nil || p.Args[2] == "Local" || p.Args[2] == "" {
		Errors(p.Client, p.Message, p.Guild, "SYN", SetRegion)
		return false
	}

	db.UpdateRegion(p.Guild.ID, p.Args[2])

	return true
}
