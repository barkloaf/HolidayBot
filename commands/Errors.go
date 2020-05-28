package commands

import (
	"github.com/barkloaf/HolidayBot/config"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

//Errors func
func Errors(client *discordgo.Session, message *discordgo.Message, guild *discordgo.Guild, group string, info Info) {
	var embedContent string
	switch group {
	case "SYN":
		embedContent = "Syntax: `" + info.Syntax + "`"
	case "PERM":
		embedContent = "You don't have permission to run that!"
	case "BL":
		embedContent = "You have been blacklisted!\nIf you feel this is an error, please contact the bot owner"
	case "FEED":
		embedContent = "There was an error gathering the feed from [Checkiday](https://checkiday.com) (This is most likely their fault!)"
	}

	embed := &discordgo.MessageEmbed{
		Author: &discordgo.MessageEmbedAuthor{
			Name:    client.State.User.Username,
			IconURL: client.State.User.AvatarURL(""),
		},
		Color:       config.Config.FailColor,
		Title:       "Error!",
		Description: embedContent,
		Fields: []*discordgo.MessageEmbedField{
			&discordgo.MessageEmbedField{
				Name:   "`" + info.Name + "`",
				Value:  info.ShortDesc,
				Inline: false,
			},
		},
		Footer: &discordgo.MessageEmbedFooter{
			Text:    message.Author.Username,
			IconURL: message.Author.AvatarURL(""),
		},
	}

	client.ChannelMessageSendEmbed(message.ChannelID, embed)

	misc.Log(message.Content, "fail", group, message.Author, guild, "")
}
