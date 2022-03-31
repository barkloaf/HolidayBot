package db

import (
	"context"

	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func InsertGuild(client *discordgo.Session, guild *discordgo.Guild) {
	defaultChannel, err := misc.GetDefaultChannel(client, guild)
	if err != nil {
		if err.Error() != "no channels" {
			misc.Logger(misc.Log{
				Content: err.Error(),
				Group:   "err",
			})
		}

		defaultChannel = &discordgo.Channel{
			ID: "",
		}
	}

	conn.Exec(
		context.Background(),
		"insert into guilds (id, timezone, dailychannel, adult, daily, command) values ($1, $2, $3, $4, $5, $6)",
		guild.ID,
		misc.GetDefaultTimezone(guild),
		defaultChannel.ID,
		false,
		true,
		true,
	)
}
