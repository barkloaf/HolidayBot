package main

import (
	"context"
	"log"
	"os"
	"os/signal"

	"github.com/barkloaf/HolidayBot/db"
	"github.com/barkloaf/HolidayBot/events"
	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
	"github.com/jackc/pgx/v4/pgxpool"
)

func main() {
	connection, err := pgxpool.Connect(context.Background(), misc.Config.DBUrl)
	if err != nil {
		log.Fatalf("Database erorr: %v", err)
	}
	db.Init(connection)

	client, err := discordgo.New("Bot " + misc.Config.Token)
	if err != nil {
		log.Fatalf("Client creation Error: %v", err)
	}

	for _, handler := range []any{
		events.ChannelDelete,
		events.GuildCreate,
		events.GuildDelete,
		events.InteractionCreate,
		events.MessageCreate,
		events.Ready,
	} {
		client.AddHandler(handler)
	}

	if misc.Config.Sharding {
		client.Identify.Shard = &[2]int{misc.Config.ShardId, misc.Config.ShardCount}
	}

	err = client.Open()
	if err != nil {
		log.Fatalf("Cannot open the session: %v", err)
	}

	defer client.Close()
	defer connection.Close()

	for _, cmd := range commandInfo {
		_, err := client.ApplicationCommandCreate(client.State.User.ID, "", cmd)
		if err != nil {
			log.Panicf("Cannot create '%v' command: %v", cmd.Name, err)
		}
	}

	go dailyPosting(client)
	go healthcheck(client)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop
	log.Println("Shutting down...")
}
