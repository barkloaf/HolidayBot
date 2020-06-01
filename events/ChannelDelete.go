package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//ChannelDelete event
func ChannelDelete(client *discordgo.Session, channel *discordgo.ChannelDelete) {
	guild, err := client.Guild(channel.GuildID)
	if err != nil || guild.ID == "" {
		return
	}

	dbResult, err := db.GuildFetch(channel.GuildID)
	if err != nil {
		return
	}
	if dbResult.Guildname == "" {
		misc.Log("", "info", "misconfig", nil, guild, "")
		dm, err := client.UserChannelCreate(guild.OwnerID)
		if err == nil {
			client.ChannelMessageSend(dm.ID, "There is an error in your server config! This most likely means I have/had no permissions in any text channel. I automagically left the server but can be re-added once you fix your config. Thank you!")
		}

		client.GuildLeave(guild.ID)
		return
	}

	if channel.Channel.ID == dbResult.DailyChannel {
		newDC, err := misc.GetDefaultChannel(client, guild)
		if err != nil {
			misc.Log("", "info", "misconfig", nil, guild, "")
			dm, err := client.UserChannelCreate(guild.OwnerID)
			if err == nil {
				client.ChannelMessageSend(dm.ID, "There is an error in your server config! This most likely means I have/had no permissions in any text channel. I automagically left the server but can be re-added once you fix your config. Thank you!")
			}

			client.GuildLeave(guild.ID)
			return
		}

		db.UpdateDailyChannel(guild.ID, newDC.ID)
		misc.Log(newDC.ID, "info", "channelDelete", nil, guild, "")
	}
}
