package commands

import (
	"math"
	"regexp"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

func Stats(client *discordgo.Session, interaction *discordgo.Interaction) error {
	var memory runtime.MemStats
	runtime.ReadMemStats(&memory)
	usage := float64(memory.HeapInuse+memory.StackInuse+memory.MSpanInuse+memory.MCacheInuse) / math.Pow(2, 20)

	var shardStr string
	if misc.Config.Sharding {
		shardStr = " (shard " + strconv.Itoa(misc.Config.ShardId) + ")"
	}

	var totalGuilds string
	num, err := db.SelectNumberOfGuilds()
	if err != nil {
		totalGuilds = "NaN"
	} else {
		totalGuilds = strconv.Itoa(num)
	}

	regex := regexp.MustCompilePOSIX("[hms]")
	uptimeString := time.Since(misc.Config.StartTime).String()
	trimmedString := uptimeString[:strings.Index(uptimeString, ".")] + "s"
	var splitUptime []string
	var (
		r []string
		z int
	)
	is := regex.FindAllStringIndex(trimmedString, -1)
	if is == nil {
		splitUptime = append(r, trimmedString)
	} else {
		for _, i := range is {
			r = append(r, trimmedString[z:i[1]])
			z = i[1]
		}
		splitUptime = append(r, trimmedString[z:])
	}

	client.InteractionRespond(interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				{
					Author: &discordgo.MessageEmbedAuthor{
						Name:    client.State.User.Username,
						IconURL: client.State.User.AvatarURL(""),
					},
					Color: misc.Config.UseColor,
					Title: "HolidayBot Stats",
					Fields: []*discordgo.MessageEmbedField{
						{
							Name:   "Go version:",
							Value:  runtime.Version(),
							Inline: true,
						},
						{
							Name:   "DiscordGo version:",
							Value:  discordgo.VERSION,
							Inline: true,
						},
						{
							Name:   "# of guilds:",
							Value:  totalGuilds,
							Inline: false,
						},
						{
							Name:   "Memory usage" + shardStr + ":",
							Value:  strconv.FormatFloat(usage, 'f', 2, 64) + " MiB",
							Inline: false,
						},
						{
							Name:   "Uptime:",
							Value:  strings.Join(splitUptime, " "),
							Inline: false,
						},
					},
				},
			},
		},
	})

	return nil
}
