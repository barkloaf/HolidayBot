package misc

import (
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

func getEnv(name string) string {
	value, exists := os.LookupEnv(name)
	if !exists {
		err := godotenv.Load()
		if err != nil {
			panic(name + " not set")
		}

		value = os.Getenv(name)
	}

	if value == "" {
		panic(name + " not set")
	}

	return value
}

type configuration struct {
	Token      string // TOKEN
	DBUrl      string // DB_URL
	OwnerId    string // OWNER_ID
	Zones      string // ZONES
	UseColor   int    // USE_COLOR
	FailColor  int    // FAIL_COLOR
	DpColor    int    // DP_COLOR
	Sharding   bool   // SHARDING
	ShardCount int    // SHARD_COUNT
	ShardId    int    // SHARD_ID
	StartTime  time.Time
}

var Config configuration

func init() {
	Config.Token = getEnv("TOKEN")
	Config.DBUrl = getEnv("DB_URL")
	Config.OwnerId = getEnv("OWNER_ID")
	Config.Zones = getEnv("ZONES")

	uc, err := strconv.Atoi(getEnv("USE_COLOR"))
	if err != nil {
		panic("Invalid USE_COLOR")
	}
	Config.UseColor = uc

	fc, err := strconv.Atoi(getEnv("FAIL_COLOR"))
	if err != nil {
		panic("Invalid FAIL_COLOR")
	}
	Config.FailColor = fc

	dpc, err := strconv.Atoi(getEnv("DP_COLOR"))
	if err != nil {
		panic("Invalid DP_COLOR")
	}
	Config.DpColor = dpc

	sding, err := strconv.ParseBool(getEnv("SHARDING"))
	if err != nil {
		panic("Invalid SHARDING")
	}
	Config.Sharding = sding

	if Config.Sharding {
		sc, err := strconv.Atoi(getEnv("SHARD_COUNT"))
		if err != nil {
			panic("Invalid SHARD_COUNT")
		}
		Config.ShardCount = sc

		sid, err := strconv.Atoi(getEnv("SHARD_ID"))
		if err != nil {
			panic("Invalid SHARD_ID")
		}
		Config.ShardId = sid
	}

	Config.StartTime = time.Now()
}
