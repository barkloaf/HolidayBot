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

	itemString2 := ""
	if len(itemString) > 1024 {
		itemString = ""

		for i := 0; i < len(feed.Items)/2; i++ {
			itemString = itemString + "• **" + feed.Items[i].Title + "**\n\n"
		}
		for i := len(feed.Items) / 2; i < len(feed.Items); i++ {
			itemString2 = itemString2 + "• **" + feed.Items[i].Title + "**\n\n"
		}
	}

	pubDate := feed.Published
	trimmedDate := pubDate[:strings.Index(pubDate, "00:")]

	field := []*discordgo.MessageEmbedField{
		{
			Name:   trimmedDate,
			Value:  itemString,
			Inline: true,
		},
	}

	if itemString2 != "" {
		second := &discordgo.MessageEmbedField{
			Name:   "\u200e",
			Value:  itemString2,
			Inline: true,
		}

		field = append(field, second)
	}

	return field, nil
}
