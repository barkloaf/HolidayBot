package misc

import (
	"time"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

//Log function
func Log(client *discordgo.Session, content string, group string, subGroup string, assocUser *discordgo.User, assocGuild *discordgo.Guild, assocTz string) {
	var color int
	var embedContent [2]string
	var data *discordgo.WebhookParams
	switch group {
	case "succ":
		color = config.Config.SuccColor
		embedContent[0] = assocUser.Username + "#" + assocUser.Discriminator + " (ID: " + assocUser.ID + ")"
		embedContent[1] = "Ran `" + content + "` in __" + assocGuild.Name + "__ (ID: " + assocUser.ID + ")"
	case "fail":
		color = config.Config.FailColor
		embedContent[0] = assocUser.Username + "#" + assocUser.Discriminator + " (ID: " + assocUser.ID + ")"
		embedContent[1] = "[**" + subGroup + "**] Ran `" + content + "` in __" + assocGuild.Name + "__ (ID: " + assocUser.ID + ")"
	case "dp":
		switch subGroup {
		case "succ":
			color = config.Config.DpColor
			embedContent[0] = "Daily Posted in `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = "tz: __" + assocTz + "__"
		case "fail":
			color = config.Config.FailColor
			embedContent[0] = "Failure to daily post in `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") tz: __" + assocTz + "__"
			embedContent[1] = content
		}
	case "info":
		color = config.Config.UseColor
		switch subGroup {
		case "join":
			embedContent[0] = "New guild: `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = ""
		case "leave":
			embedContent[0] = "Removed from guild: `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ")"
			embedContent[1] = ""
		case "nameChange":
			embedContent[0] = "Guild `" + content + "` (ID: " + assocGuild.ID + ") has changed their name to __" + assocGuild.Name + "__"
			embedContent[1] = ""
		case "channelDelete":
			embedContent[0] = "Guild `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") has deleted their daily channel"
			embedContent[1] = "Resetting to __" + content + "__"
		case "start":
			embedContent[0] = "Bot Started!"
			embedContent[1] = ""
		case "misconfig":
			embedContent[0] = "Guild `" + assocGuild.Name + "` (ID: " + assocGuild.ID + ") has an invalid server config"
			embedContent[1] = "__Leaving...__"
		}
	}
	embed := []*discordgo.MessageEmbed{&discordgo.MessageEmbed{
		Color:       color,
		Title:       embedContent[0],
		Description: embedContent[1],
		Timestamp:   time.Now().Format(time.RFC3339),
	}}
	data = &discordgo.WebhookParams{
		Embeds: embed,
	}

	client.WebhookExecute(config.Config.WhID, config.Config.WhToken, true, data)
}
