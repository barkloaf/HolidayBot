package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/barkloaf/HolidayBot/config"
	"github.com/barkloaf/HolidayBot/events"
	"github.com/bwmarrin/discordgo"
)

func main() {
	client, err := discordgo.New("Bot " + config.Config.Token)
	if err != nil {
		fmt.Printf("Client creation Error: %v", err)
		return
	}

	dailyPosting(client)

	eventNames := []interface{}{events.ChannelDelete, events.GuildCreate, events.GuildDelete, events.GuildUpdate, events.MessageCreate, events.Ready}
	for _, event := range eventNames {
		client.AddHandler(event)
	}

	err = client.Open()
	if err != nil {
		fmt.Printf("Client open Error: %v", err)
		return
	}
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
	<-sc
	client.Close()
}
