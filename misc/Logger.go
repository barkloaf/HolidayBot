package misc

import (
	"fmt"
	"time"

	"github.com/bwmarrin/discordgo"
)

var (
	reset  = "\033[0m"
	red    = "\033[31m"
	green  = "\033[32m"
	yellow = "\033[33m"
	blue   = "\033[34m"
	purple = "\033[35m"
	gray   = "\033[37m"
	//white = "\033[97m"
	//cyan  = "\033[36m"
)

type Log struct {
	Interaction *discordgo.Interaction
	Content     string
	Group       string
	Subgroup    string
	Guild       string
	Tz          string
	Adult       bool
}

func Logger(log Log) {
	var (
		tag string
		msg string
	)

	var user string
	if log.Interaction != nil {
		if log.Interaction.Member != nil {
			user = log.Interaction.Member.User.ID
		} else if log.Interaction.User != nil {
			user = log.Interaction.User.ID
		}

		if log.Interaction.Type == discordgo.InteractionApplicationCommand {
			if len(log.Interaction.ApplicationCommandData().Options) > 0 {
				log.Content += " " + log.Interaction.ApplicationCommandData().Options[0].Name
			}
		}
	}

	if log.Guild == "" {
		log.Guild = "DM"
	}

	switch log.Group {
	case "succ":
		tag = green + "SUCC"
		msg = fmt.Sprintf("\"%v\" ran \"%v\" in \"%v\"", user, log.Content, log.Guild)
	case "fail":
		tag = yellow + "FAIL"
		msg = fmt.Sprintf("[%v%v%v] \"%v\" ran \"%v\" in \"%v\"", yellow, log.Subgroup, reset, user, log.Content, log.Guild)
	case "dp":
		switch log.Subgroup {
		case "succ":
			tag = blue + "SUCC"
			msg = fmt.Sprintf("Daily posted in \"%v\" (tz: \"%v\", adult: %v)", log.Guild, log.Tz, log.Adult)
		case "fail":
			tag = yellow + "FAIL"
			msg = fmt.Sprintf("Failed to daily post in \"%v\" (tz: \"%v\", adult: %v) because %v", log.Guild, log.Tz, log.Adult, log.Content)
		}
	case "info":
		tag = purple + "INFO"
		switch log.Subgroup {
		case "join":
			msg = fmt.Sprintf("New guild: \"%v\"", log.Guild)
		case "leave":
			msg = fmt.Sprintf("Removed from guild: \"%v\"", log.Guild)
		case "channelDelete":
			msg = fmt.Sprintf("Guild \"%v\" deleted their daily channel, resetting to \"%v\"", log.Guild, log.Content)
		case "ready":
			msg = "Bot ready!"
		}
	case "err":
		tag = red + "ERR"
		msg = log.Content
	}

	fmt.Printf("%v%v%v [%v%v] %v\n", gray, time.Now().Format(time.RFC1123), reset, tag, reset, msg)
}
