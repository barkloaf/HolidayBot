package commands

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/bwmarrin/discordgo"
)

func setDaily(client *discordgo.Session, interaction *discordgo.Interaction) error {
	go db.UpdateDaily(
		interaction.GuildID,
		interaction.ApplicationCommandData().Options[0].Options[0].BoolValue(),
	)

	return nil
}
