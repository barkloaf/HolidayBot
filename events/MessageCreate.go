package events

import (
	"fmt"
	"strings"

	"github.com/barkloaf/HolidayBot/config"

	"github.com/barkloaf/HolidayBot/db"

	"github.com/barkloaf/HolidayBot/commands"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//MessageCreate event
func MessageCreate(client *discordgo.Session, m *discordgo.MessageCreate) {
	message := m.Message

	if message.Author.Bot {
		return
	}

	guild, err := client.Guild(message.GuildID)
	if err != nil || guild.ID == "" {
		return
	}

	dbResult, err := db.GuildFetch(message.GuildID)
	if err != nil {
		return
	}

	if dbResult.Guildname == "" {
		db.CreateGuild(client, guild)

		dbResult, err = db.GuildFetch(message.GuildID)
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
	}

	var prefix string
	var dbPrefixes []string
	dbPrefixes = append(dbResult.Prefix, "<@!"+client.State.User.ID+"> ", "<@!"+client.State.User.ID+">")
	for _, value := range dbPrefixes {
		if strings.HasPrefix(message.Content, value) {
			prefix = value
			break
		}
	}
	if prefix == "" {
		return
	}

	cmd := strings.TrimPrefix(message.Content, prefix)
	args := strings.Split(cmd, " ")

	perms, err := client.State.UserChannelPermissions(client.State.User.ID, message.ChannelID)
	if err != nil {
		fmt.Printf("Perms check Error: %v", err)
		return
	}
	if (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) {
		if perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages {
			dm, err := client.UserChannelCreate(message.Author.ID)
			if err != nil {
				dm, err := client.UserChannelCreate(guild.OwnerID)
				if err != nil {
					return
				}
				client.ChannelMessageSend(dm.ID, "I need permission to send messages and embed links!")
			}
			client.ChannelMessageSend(dm.ID, "I need permission to send messages and embed links!")
		} else {
			client.ChannelMessageSend(message.ChannelID, "I need permission to embed links here!")
		}
		return
	}

	blResult, _ := db.BlFetch(message.Author.ID)
	if blResult.ID != "" {
		commands.Errors(client, message, guild, "BL", commands.Info{
			Name:      "Reason:",
			ShortDesc: blResult.Reason,
		})
		return
	}

	if commands.CommandMap[strings.ToLower(args[0])] == nil {
		return
	}

	for _, value := range commands.OwnerInfoList {
		if value.Name == args[0] {
			if message.Author.ID != config.Config.OwnerID {
				return
			}
			break
		}
	}

	succ := commands.CommandMap[strings.ToLower(args[0])](commands.Params{
		Client:   client,
		Message:  message,
		Guild:    guild,
		Args:     args,
		DBResult: dbResult,
	})

	perms, err = client.State.UserChannelPermissions(client.State.User.ID, dbResult.DailyChannel)
	if err != nil {
		fmt.Printf("Perms check Error: %v", err)
		return
	}
	if (perms&discordgo.PermissionReadMessages != discordgo.PermissionReadMessages) || (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) {
		if dbResult.Daily == true {
			client.ChannelMessageSend(message.ChannelID, "**WARNING:** Daily posting is enabled, however permissions for me to read messages, send messages, and/or embed links in <#"+dbResult.DailyChannel+"> has been revoked, and daily posting will not work until rectified.")
		}
	}

	if succ {
		misc.Log(message.Content, "succ", "", message.Author, guild, "")
	}
}
