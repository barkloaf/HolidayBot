package main

import (
	"io/ioutil"
	"strings"
	"time"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"

	"github.com/robfig/cron/v3"

	"github.com/bwmarrin/discordgo"
)

var dir = "./zoneinfo/"

var zones []string

func readFile(path string) {
	files, _ := ioutil.ReadDir(dir + path)
	for _, f := range files {
		if f.Name() != strings.ToUpper(f.Name()[:1])+f.Name()[1:] {
			continue
		}
		if f.IsDir() {
			readFile(path + "/" + f.Name())
		} else {
			zones = append(zones, (path + "/" + f.Name())[1:])
		}
	}
}

func dailyPosting(client *discordgo.Session) {
	readFile("")

	gocron := cron.New()

	for _, currentTz := range zones {
		tz := currentTz

		gocron.AddFunc("CRON_TZ="+tz+" 0 0 * * *", func() {
			time.Sleep(5 * time.Second)

			for _, currentGuild := range client.State.Guilds {
				guild := currentGuild

				dbResult, err := db.GuildFetch(guild.ID)
				if err != nil {
					continue
				}

				if !dbResult.Daily {
					continue
				}

				if dbResult.Region != tz {
					continue
				}

				channel, err := client.Channel(dbResult.DailyChannel)
				if err != nil {
					continue
				}

				perms, err := client.State.UserChannelPermissions(client.State.User.ID, channel.ID)
				if err != nil {
					continue
				}
				if (perms&discordgo.PermissionReadMessages != discordgo.PermissionReadMessages) || (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) {
					misc.Log("permission was revoked", "dp", "fail", nil, guild, "")

					continue
				}

				var embed *discordgo.MessageEmbed
				field, err := misc.Feed(tz, dbResult.Adult)
				if err != nil {
					embed = &discordgo.MessageEmbed{
						Author: &discordgo.MessageEmbedAuthor{
							Name:    client.State.User.Username,
							IconURL: client.State.User.AvatarURL(""),
						},
						Color:       config.Config.FailColor,
						Title:       "Error!",
						Description: "There was an error gathering the feed from [Checkiday](https://checkiday.com) (This is most likely their fault!)",
						Footer: &discordgo.MessageEmbedFooter{
							Text:    client.State.User.Username + " Daily Posting",
							IconURL: client.State.User.AvatarURL(""),
						},
					}

					client.ChannelMessageSendEmbed(channel.ID, embed)

					misc.Log("there was a feed error", "dp", "fail", nil, guild, "")

					continue
				}

				embed = &discordgo.MessageEmbed{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color:  config.Config.DpColor,
					Title:  "Today's Holidays (" + tz + "):",
					URL:    "https://checkiday.com",
					Fields: field,
					Footer: &discordgo.MessageEmbedFooter{
						Text:    client.State.User.Username + " Daily Posting",
						IconURL: client.State.User.AvatarURL(""),
					},
				}

				client.ChannelMessageSendEmbed(channel.ID, embed)

				misc.Log("", "dp", "succ", nil, guild, tz)
			}
		})
	}
	gocron.Start()
}
