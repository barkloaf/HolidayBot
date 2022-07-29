package events

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func ChannelDelete(client *discordgo.Session, c *discordgo.ChannelDelete) {
	channel := c.Channel

	guild, err := client.Guild(channel.GuildID)
	if err != nil || guild.ID == "" {
		return
	}

	dbResult, err := db.SelectGuild(guild.ID)
	if err != nil {
		return
	}

	if channel.ID == dbResult.DailyChannel || dbResult.DailyChannel == "" {
		newDC, err := misc.GetDefaultChannel(client, guild)
		if err != nil {
			if err.Error() != "no channels" {
				misc.Logger(misc.Log{
					Content: err.Error(),
					Group:   "err",
				})
			}

			newDC = &discordgo.Channel{
				ID: "",
			}
		}

		go db.UpdateDailyChannel(guild.ID, newDC.ID)

		misc.Logger(misc.Log{
			Content:  newDC.ID,
			Group:    "info",
			Subgroup: "channelDelete",
			Guild:    guild.ID,
		})
	}
}
