package commands

import (
	"regexp"

	"github.com/barkloaf/HolidayBot/db"
)

func unblacklist(p Params) bool {
	if len(p.Args) < 2 {
		p.Args = append(p.Args, "")
	}

	idRegex := regexp.MustCompilePOSIX("([^>]*)")

	user, err := p.Client.User(idRegex.FindStringSubmatch(p.Args[1])[1])
	if err != nil {
		idRegex = regexp.MustCompilePOSIX("<@!([^>]*)>")

		user, err = p.Client.User(idRegex.FindStringSubmatch(p.Args[1])[1])
		if err != nil {
			Errors(p.Client, p.Message, p.Guild, "SYN", Unblacklist)
			return false
		}
	}

	db.DeleteBlacklistee(user.ID)

	return true
}
