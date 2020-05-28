package commands

import (
	"regexp"
	"strings"

	"github.com/barkloaf/HolidayBot/db"
)

func blacklist(p Params) bool {
	if len(p.Args) < 2 {
		p.Args = append(p.Args, "")
	}

	idRegex := regexp.MustCompilePOSIX("([^>]*)")

	user, err := p.Client.User(idRegex.FindStringSubmatch(p.Args[1])[1])
	if err != nil {
		idRegex = regexp.MustCompilePOSIX("<@!([^>]*)>")

		user, err = p.Client.User(idRegex.FindStringSubmatch(p.Args[1])[1])
		if err != nil {
			Errors(p.Client, p.Message, p.Guild, "SYN", Blacklist)
			return false
		}
	}

	reason := strings.Join(p.Args[2:], " ")

	db.CreateBlacklistee(user.ID, reason)
	return true
}