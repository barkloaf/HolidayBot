package commands

import (
	"time"

	"github.com/barkloaf/HolidayBot/db"
)

func setRegion(p Params) bool {
	_, err := time.LoadLocation(p.Args[2])
	if err != nil || p.Args[2] == "Local" || p.Args[2] == "" {
		Errors(p.Client, p.Message, p.Guild, "SYN", SetRegion)
		return false
	}

	go db.UpdateRegion(p.Guild.ID, p.Args[2])

	return true
}
