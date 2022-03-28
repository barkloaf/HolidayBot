package commands

import (
	"errors"
	"time"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func setTimezone(client *discordgo.Session, interaction *discordgo.Interaction) error {
	opt := interaction.ApplicationCommandData().Options[0].Options[0].StringValue()

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionApplicationCommandAutocompleteResult,
		Data: &discordgo.InteractionResponseData{
			Choices: misc.Autocomplete(misc.Zones, opt),
		},
	})

	if interaction.Type != discordgo.InteractionApplicationCommand {
		return errors.New("")
	}

	_, err := time.LoadLocation(opt)
	if err != nil || opt == "Local" || opt == "" {
		return errors.New("TZ")
	}

	go db.UpdateTimezone(interaction.GuildID, opt)

	return nil
}
