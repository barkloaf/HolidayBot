package main

import "github.com/bwmarrin/discordgo"

var commandInfo = []*discordgo.ApplicationCommand{
	{
		Name:        "about",
		Description: "Shows information about the bot (invite, voting, source, purpose, author, etc.).",
	},
	{
		Name:        "settings",
		Description: "Displays current server-specific settings.",
	},
	{
		Name:        "ping",
		Description: "Pong!",
	},
	{
		Name:        "stats",
		Description: "Shows bot statistics like uptime, lib versions, etc.",
	},
	{
		Name:        "h",
		Description: "Displays holidays in the specified timezone or server timezone on command (if enabled).",
		Options: []*discordgo.ApplicationCommandOption{
			{
				Name:         "timezone",
				Description:  "Specifies the tz/zoneinfo database timezone (eg. `America/Chicago`)",
				Type:         discordgo.ApplicationCommandOptionString,
				Autocomplete: true,
				Required:     false,
			},
		},
	},
	{
		Name:        "set",
		Description: "Sets server-specific settings (Manage Server permission required).",
		Options: []*discordgo.ApplicationCommandOption{
			{
				Name:        "timezone",
				Description: "Changes the timezone to any valid tz/zoneinfo database timezone (eg. `America/Chicago`).",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:         "timezone",
						Description:  "The desired tz/zoneinfo database timezone (eg. `America/Chicago`)",
						Type:         discordgo.ApplicationCommandOptionString,
						Autocomplete: true,
						Required:     true,
					},
				},
			},
			{
				Name:        "adult",
				Description: "Enables/disables content that may not be safe for viewing by children.",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:        "choice",
						Description: "True = Adult content enabled, False = Adult content disabled",
						Type:        discordgo.ApplicationCommandOptionBoolean,
						Required:    true,
					},
				},
			},
			{
				Name:        "daily",
				Description: "Enables/disables the bot posting new holidays every midnight in the set timezone.",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:        "choice",
						Description: "True = Daily posting enabled, False = Daily posting disabled",
						Type:        discordgo.ApplicationCommandOptionBoolean,
						Required:    true,
					},
				},
			},
			{
				Name:        "dailychannel",
				Description: "Sets the channel the daily holidays (if enabled) will be posted in.",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:        "channel",
						Description: "The desired channel for daily posting",
						Type:        discordgo.ApplicationCommandOptionChannel,
						Required:    true,
					},
				},
			},
			{
				Name:        "command",
				Description: "Enables/disables the ability for users to run /h to display holidays on command.",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:        "choice",
						Description: "True = /h command enabled, False = /h command disabled",
						Type:        discordgo.ApplicationCommandOptionBoolean,
						Required:    true,
					},
				},
			},
			{
				Name:        "reset",
				Description: "Resets this guild's settings to the default settings.",
				Type:        discordgo.ApplicationCommandOptionSubCommand,
				Options: []*discordgo.ApplicationCommandOption{
					{
						Name:        "confirm",
						Description: "Input \"YES\" (all caps) to reset your guild settings",
						Type:        discordgo.ApplicationCommandOptionString,
						Required:    true,
					},
				},
			},
		},
	},
}
