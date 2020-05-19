package commands

import (
	"github.com/barkloaf/HolidayBot/config"
	"github.com/bwmarrin/discordgo"
)

func about(p Params) bool {
	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    p.Client.State.User.Username,
			IconURL: p.Client.State.User.AvatarURL(""),
		},
		Color:       config.Config.UseColor,
		Title:       "Hello, my name is HolidayBot!",
		Description: "I am a bot created with DiscordGo that spits out real holidays that you may have never heard of before. All holidays are grabbed from [checkiday.com](https://checkiday.com).\nCreated by barkloaf :3",
		Thumbnail: &discordgo.MessageEmbedThumbnail{
			URL: p.Client.State.User.AvatarURL(""),
		},
		Fields: []*discordgo.MessageEmbedField{
			&discordgo.MessageEmbedField{
				Name:   "Check out the source and invite link!",
				Value:  "[GitHub](https://github.com/barkloaf/HolidayBot)",
				Inline: false,
			},
			&discordgo.MessageEmbedField{
				Name:   "Vote for HolidayBot!",
				Value:  "[Discord Bot List](https://discordbots.org/bot/504508062929911869/vote)",
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
