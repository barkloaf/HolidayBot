package main

import (
	"time"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/robfig/cron/v3"

	"github.com/bwmarrin/discordgo"
)

func dailyPosting(client *discordgo.Session) {
	gocron := cron.New()

	for _, currTz := range misc.Zones {
		tz := currTz

		gocron.AddFunc("CRON_TZ="+tz+" 0 0 * * *", func() {
			time.Sleep(5 * time.Second)

			guilds, err := db.SelectGuildsTz(tz)
			if err != nil {
				return
			}

			if len(guilds) == 0 {
				return
			}

			var (
				nAdFieldErr error
				adFieldErr  error
			)

			nAdFields, err := misc.Feed(tz, false)
			if err != nil {
				time.Sleep(5 * time.Second)

				nAdFields2, err2 := misc.Feed(tz, false)
				if err2 != nil {
					nAdFieldErr = err2
				}

				nAdFields = nAdFields2
			}

			time.Sleep(500 * time.Millisecond)

			adFields, err := misc.Feed(tz, true)
			if err != nil {
				time.Sleep(5 * time.Second)

				adFields2, err2 := misc.Feed(tz, true)
				if err2 != nil {
					adFieldErr = err2
				}

				adFields = adFields2
			}

			for _, currGuild := range guilds {
				guild := currGuild

				_, err := client.Guild(guild.ID)
				if err != nil {
					continue
				}

				channel, err := client.Channel(guild.DailyChannel)
				if err != nil {
					continue
				}

				perms, err := client.State.UserChannelPermissions(client.State.User.ID, channel.ID)
				if err != nil {
					misc.Logger(misc.Log{
						Content: err.Error(),
						Group:   "err",
					})

					continue
				}
				if (perms&discordgo.PermissionViewChannel != discordgo.PermissionViewChannel) || (perms&discordgo.PermissionSendMessages != discordgo.PermissionSendMessages) || (perms&discordgo.PermissionEmbedLinks != discordgo.PermissionEmbedLinks) || (channel.Type != discordgo.ChannelTypeGuildText) {
					misc.Logger(misc.Log{
						Content:  "permission was revoked",
						Group:    "dp",
						Subgroup: "fail",
						Guild:    guild.ID,
						Tz:       tz,
					})

					continue
				}

				var (
					fieldErr error
					fields   []*discordgo.MessageEmbedField
				)

				if guild.Adult {
					fieldErr = adFieldErr
					fields = adFields
				} else {
					fieldErr = nAdFieldErr
					fields = nAdFields
				}

				var embed *discordgo.MessageEmbed
				if fieldErr != nil {
					embed = &discordgo.MessageEmbed{
						Author: &discordgo.MessageEmbedAuthor{
							Name:    client.State.User.Username,
							IconURL: client.State.User.AvatarURL(""),
						},
						Color:       misc.Config.FailColor,
						Title:       "Error!",
						Description: "There was an error getting the feed from [Checkiday](https://checkiday.com)",
						Footer: &discordgo.MessageEmbedFooter{
							Text:    client.State.User.Username + " Daily Posting",
							IconURL: client.State.User.AvatarURL(""),
						},
					}

					client.ChannelMessageSendEmbed(channel.ID, embed)

					misc.Logger(misc.Log{
						Content:  "there was a feed error",
						Group:    "dp",
						Subgroup: "fail",
						Guild:    guild.ID,
						Tz:       tz,
					})

					continue
				}

				embed = &discordgo.MessageEmbed{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color:  misc.Config.DpColor,
					Title:  "Today's Holidays (" + tz + "):",
					URL:    "https://checkiday.com",
					Fields: fields,
					Footer: &discordgo.MessageEmbedFooter{
						Text:    client.State.User.Username + " Daily Posting",
						IconURL: client.State.User.AvatarURL(""),
					},
				}

				client.ChannelMessageSendEmbed(channel.ID, embed)

				misc.Logger(misc.Log{
					Group:    "dp",
					Subgroup: "succ",
					Guild:    guild.ID,
					Tz:       tz,
				})
			}
		})
	}

	gocron.Start()
}
