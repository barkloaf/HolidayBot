package events

import (
	"github.com/barkloaf/HolidayBot/commands"
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

var commandMap = map[string]func(client *discordgo.Session, interaction *discordgo.Interaction) error{
	"about":    commands.About,
	"h":        commands.H,
	"ping":     commands.Ping,
	"set":      commands.Set,
	"settings": commands.Settings,
	"stats":    commands.Stats,
}

func InteractionCreate(client *discordgo.Session, i *discordgo.InteractionCreate) {
	interaction := i.Interaction

	name := interaction.ApplicationCommandData().Name

	fn, exists := commandMap[name]
	if !exists {
		return
	}

	if (interaction.Type != discordgo.InteractionApplicationCommand && (name != "set" && name != "h")) || (interaction.Type != discordgo.InteractionApplicationCommandAutocomplete && interaction.Type != discordgo.InteractionApplicationCommand) {
		return
	}

	guild, err := client.Guild(interaction.GuildID)
	if err == nil && guild.ID != "" {
		dbResult, err := db.SelectGuild(guild.ID)
		if err != nil {
			db.InsertGuild(client, guild)
			return

		} else if dbResult.DailyChannel == "" {
			newDC, err := misc.GetDefaultChannel(client, guild)
			if err != nil {
				if err.Error() != "no channels" {
					misc.Logger(misc.Log{
						Content: err.Error(),
						Group:   "err",
					})
				}

				newDC.ID = ""
			}

			db.UpdateDailyChannel(guild.ID, newDC.ID)
		}
	}

	err = fn(client, interaction)

	if err != nil {
		if err.Error() != "" {
			misc.Logger(misc.Log{
				Interaction: interaction,
				Content:     name,
				Group:       "fail",
				Subgroup:    err.Error(),
				Guild:       interaction.GuildID,
			})
		}

		return
	}

	misc.Logger(misc.Log{
		Interaction: interaction,
		Content:     name,
		Group:       "succ",
		Guild:       interaction.GuildID,
	})
}
