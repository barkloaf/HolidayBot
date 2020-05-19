package misc

import (
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/mmcdole/gofeed"
)

//Feed func
func Feed(tz string, adult bool) ([]*discordgo.MessageEmbedField, error) {
	var adultString string
	if adult {
		adultString = "&adult=true"
	}

	parser := gofeed.NewParser()
	feed, err := parser.ParseURL("https://www.checkiday.com/rss.php?tz=" + tz + adultString)
	if err != nil {
		return nil, err
	}

	var itemString string
	for _, value := range feed.Items {
		itemString = itemString + "• **" + value.Title + "**\n\n"
	}

	pubDate := feed.Published
	trimmedDate := pubDate[:strings.Index(pubDate, "00:")]

	field := []*discordgo.MessageEmbedField{
		&discordgo.MessageEmbedField{
			Name:   trimmedDate,
			Value:  itemString,
			Inline: false,
		},
	}

	return field, nil
}
