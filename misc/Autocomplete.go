package misc

import (
	"github.com/bwmarrin/discordgo"
	"github.com/lithammer/fuzzysearch/fuzzy"
)

func Autocomplete(arr []string, arg string) []*discordgo.ApplicationCommandOptionChoice {
	ranks := fuzzy.RankFindFold(arg, arr)

	var results []string
	for _, rank := range ranks {
		results = append(results, rank.Target)
	}

	if len(results) == 0 {
		results = arr
	}

	if len(results) > 25 {
		results = results[:25]
	}

	var choices []*discordgo.ApplicationCommandOptionChoice
	for _, opt := range results {
		if len(opt) > 100 {
			opt = opt[:100]
		}

		choices = append(choices, &discordgo.ApplicationCommandOptionChoice{
			Name:  opt,
			Value: opt,
		})
	}

	return choices
}
