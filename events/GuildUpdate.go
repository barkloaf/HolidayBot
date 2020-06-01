package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//GuildUpdate event
func GuildUpdate(client *discordgo.Session, guild *discordgo.GuildUpdate) {
	dbResult, err := db.GuildFetch(guild.Guild.ID)
	if err != nil {
		return
	}
	if dbResult.Guildname == "" {
		misc.Log("", "info", "misconfig", nil, guild.Guild, "")
		dm, err := client.UserChannelCreate(guild.Guild.OwnerID)
		if err == nil {
			client.ChannelMessageSend(dm.ID, "There is an error in your server config! This most likely means I have/had no permissions in any text channel. I automagically left the server but can be re-added once you fix your config. Thank you!")
		}

		client.GuildLeave(guild.Guild.ID)
		return
	}

	if dbResult.Guildname != guild.Guild.Name {
		misc.Log(dbResult.Guildname, "info", "nameChange", nil, guild.Guild, "")

		db.UpdateGuildName(guild.Guild.ID, guild.Guild.Name)
	}
}
