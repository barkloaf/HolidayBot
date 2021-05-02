package commands

import (
	"regexp"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

func stats(p Params) bool {
	var memory runtime.MemStats
	runtime.ReadMemStats(&memory)

	regex := regexp.MustCompilePOSIX("[hms]")
	uptimeString := time.Since(config.Config.StartTime).String()
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

	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color: config.Config.UseColor,
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
				Value:  strconv.FormatInt(int64(len(p.Client.State.Guilds)), 10),
				Inline: false,
			},
			{
				Name:   "Memory usage:",
				Value:  strconv.FormatFloat((float64(memory.HeapInuse)/1048576), 'f', 2, 64) + " MiB",
				Inline: false,
			},
			{
				Name:   "Uptime:",
				Value:  strings.Join(splitUptime, " "),
				Inline: false,
			},
		},
		Footer: &discordgo.MessageEmbedFooter{
			Text:    p.Message.Author.Username,
			IconURL: p.Message.Author.AvatarURL(""),
		},
	}

	p.Client.ChannelMessageSendEmbed(p.Message.ChannelID, embed)

	return true
}
