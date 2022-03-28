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
	Token     string // TOKEN
	DBUrl     string // DB_URL
	OwnerID   string // OWNER_ID
	UseColor  int    // USE_COLOR
	FailColor int    // FAIL_COLOR
	DpColor   int    // DP_COLOR
	StartTime time.Time
}

var Config configuration

func init() {
	Config.Token = getEnv("TOKEN")
	Config.DBUrl = getEnv("DB_URL")
	Config.OwnerID = getEnv("OWNER_ID")

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

	Config.StartTime = time.Now()
}
