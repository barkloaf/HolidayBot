package commands

import (
	"errors"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func setReset(client *discordgo.Session, interaction *discordgo.Interaction) error {
	conf := interaction.ApplicationCommandData().Options[0].Options[0].StringValue()

	if conf != "YES" {
		return errors.New("DENY")
	}

	guild, err := client.Guild(interaction.GuildID)
	if err != nil {
		return errors.New("PERM")
	}

	channel, err := misc.GetDefaultChannel(client, guild)
	if err != nil {
		if err.Error() != "no channels" {
			misc.Logger(misc.Log{
				Content: err.Error(),
				Group:   "err",
			})
		}

		return errors.New("PERM")
	}

	go func() {
		db.UpdateAdult(guild.ID, false)
		db.UpdateCommand(guild.ID, true)
		db.UpdateDaily(guild.ID, true)
		db.UpdateDailyChannel(guild.ID, channel.ID)
		db.UpdateTimezone(guild.ID, misc.GetDefaultTimezone(guild))
	}()

	return nil
}
