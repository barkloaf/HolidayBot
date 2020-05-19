package commands

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
)

func setReset(p Params) bool {
	channel, err := misc.GetDefaultChannel(p.Client, p.Guild)
	if err != nil {
		return false
	}

	db.UpdateAdult(p.Guild.ID, false)
	db.UpdateCommand(p.Guild.ID, true)
	db.UpdateDaily(p.Guild.ID, true)
	db.UpdateDailyChannel(p.Guild.ID, channel.ID)
	db.UpdatePrefix(p.Guild.ID, []string{"h]"})
	db.UpdateRegion(p.Guild.ID, misc.GetDefaultRegion(p.Guild))

	return true
}
