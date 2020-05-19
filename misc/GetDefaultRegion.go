package misc

import (
	"github.com/bwmarrin/discordgo"
)

//GetDefaultRegion function
func GetDefaultRegion(guild *discordgo.Guild) string {
	var defaultRegion string

	switch guild.Region {
	case "brazil":
		defaultRegion = "America/Sao_Paulo"
	case "us-west":
		defaultRegion = "America/Los_Angeles"
	case "japan":
		defaultRegion = "Asia/Tokyo"
	case "singapore":
		defaultRegion = "Asia/Singapore"
	case "eu-central", "frankfurt":
		defaultRegion = "Europe/Berlin"
	case "hongkong":
		defaultRegion = "Asia/Hong_Kong"
	case "us-south", "us-central":
		defaultRegion = "America/Chicago"
	case "southafrica":
		defaultRegion = "Africa/Johannesburg"
	case "london":
		defaultRegion = "Europe/London"
	case "us-east":
		defaultRegion = "America/Toronto"
	case "sydney":
		defaultRegion = "Australia/Sydney"
	case "eu-west":
		defaultRegion = "Europe/Paris"
	case "amsterdam":
		defaultRegion = "Europe/Amsterdam"
	case "russia":
		defaultRegion = "Europe/Moscow"
	case "india":
		defaultRegion = "Asia/Kolkata"
	case "dubai":
		defaultRegion = "Asia/Dubai"
	default:
		defaultRegion = "UTC"
	}

	return defaultRegion
}
