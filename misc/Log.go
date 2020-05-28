package misc

import (
	"fmt"
	"strings"
	"time"

	"github.com/bwmarrin/discordgo"

	"github.com/logrusorgru/aurora"
)

//Log function
func Log(content string, group string, subGroup string, assocUser *discordgo.User, assocGuild *discordgo.Guild, assocTz string) {
	var tag aurora.Value
	var embedContent [2]string

	switch group {
	case "succ":
		tag = aurora.BrightGreen("SUCC")
		embedContent[0] = assocUser.Username + "#" + assocUser.Discriminator + " (ID: " + assocUser.ID + ")"
		embedContent[1] = "Ran `" + content + "` in `" + assocGuild.Name + "` (ID: " + assocUser.ID + ")"
	case "fail":
		tag = aurora.BrightRed("FAIL")
		embedContent[0] = assocUser.Username + "#" + assocUser.Discriminator + " (ID: " + assocUser.ID + ")"
		embedContent[1] = "[" + subGroup + "] Ran `" + content + "` in `" + assocGuild.Name + "` (ID: " + assocUser.ID + ")"
	case "dp":
		switch subGroup {
		case "succ":
			tag = aurora.BrightBlue("SUCC")
			embedContent[0] = "Daily Posted in `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = "tz: `" + assocTz + "`"
		case "fail":
			tag = aurora.BrightRed("FAIL")
			embedContent[0] = "Failure to daily post in `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") tz: `" + assocTz + "`"
			embedContent[1] = content
		}
	case "info":
		tag = aurora.BrightMagenta("INFO")
		switch subGroup {
		case "join":
			embedContent[0] = "New guild: `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = ""
		case "leave":
			embedContent[0] = "Removed from guild: `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = ""
		case "nameChange":
			embedContent[0] = "Guild `" + content + "` (ID: " + assocGuild.ID + ") has changed their name to `" + assocGuild.Name + "`"
			embedContent[1] = ""
		case "channelDelete":
			embedContent[0] = "Guild `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") has deleted their daily channel"
			embedContent[1] = "Resetting to `" + content + "`"
		case "start":
			embedContent[0] = "Bot Started!"
			embedContent[1] = ""
		case "misconfig":
			embedContent[0] = "Guild `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") has an invalid server config"
			embedContent[1] = "Leaving..."
		}
	}

	fmt.Println(aurora.BrightBlack(time.Now().Format(time.RFC1123)), "- [", tag, "]  "+strings.Join(embedContent[:], " "))
}
