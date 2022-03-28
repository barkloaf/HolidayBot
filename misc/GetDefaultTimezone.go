package misc

import (
	"github.com/bwmarrin/discordgo"
)

func GetDefaultTimezone(guild *discordgo.Guild) string {
	var defaultTimezone string

	switch guild.Region {
	case "brazil":
		defaultTimezone = "America/Sao_Paulo"
	case "us-west":
		defaultTimezone = "America/Los_Angeles"
	case "japan":
		defaultTimezone = "Asia/Tokyo"
	case "singapore":
		defaultTimezone = "Asia/Singapore"
	case "eu-central", "frankfurt":
		defaultTimezone = "Europe/Berlin"
	case "hongkong":
		defaultTimezone = "Asia/Hong_Kong"
	case "us-south", "us-central":
		defaultTimezone = "America/Chicago"
	case "southafrica":
		defaultTimezone = "Africa/Johannesburg"
	case "london":
		defaultTimezone = "Europe/London"
	case "us-east":
		defaultTimezone = "America/Toronto"
	case "sydney":
		defaultTimezone = "Australia/Sydney"
	case "eu-west":
		defaultTimezone = "Europe/Paris"
	case "amsterdam", "rotterdam":
		defaultTimezone = "Europe/Amsterdam"
	case "russia":
		defaultTimezone = "Europe/Moscow"
	case "india":
		defaultTimezone = "Asia/Kolkata"
	case "dubai":
		defaultTimezone = "Asia/Dubai"
	default:
		defaultTimezone = "UTC"
	}

	return defaultTimezone
}
