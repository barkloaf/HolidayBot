package commands

import (
	"github.com/barkloaf/HolidayBot/db"
	"github.com/bwmarrin/discordgo"
)

//Params struct
type Params struct {
	Client   *discordgo.Session
	Message  *discordgo.Message
	Guild    *discordgo.Guild
	Args     []string
	DBResult db.Guild
}

//CommandMap map
var CommandMap = make(map[string]func(Params) bool)

//SetCommandMap map
var SetCommandMap = make(map[string]func(Params) bool)

func commandMapper() {
	for _, value := range InfoList {
		CommandMap[value.Name] = value.Function
	}

	for _, value := range OwnerInfoList {
		CommandMap[value.Name] = value.Function
	}

	for _, value := range SetInfoList {
		SetCommandMap[value.Name] = value.Function
	}
}
