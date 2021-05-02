package config

import (
	"encoding/json"
	"os"
	"time"
)

//Configuration struct
type Configuration struct {
	Token     string
	OwnerID   string
	UseColor  int
	SuccColor int
	FailColor int
	DpColor   int
	StartTime time.Time
}

//Config configuration
var Config Configuration

func init() {
	file, err := os.Open("./config/config.json")
	defer file.Close()
	if err != nil {
		panic(err)
	}

	parser := json.NewDecoder(file)
	parser.Decode(&Config)

	Config.StartTime = time.Now()
}
