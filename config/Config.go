package config

import (
	"encoding/json"
	"os"
	"time"
)

//Configuration struct
type Configuration struct {
	Token     string `json:"token"`
	OwnerID   string `json:"ownerID"`
	UseColor  int    `json:"useColor"`
	SuccColor int    `json:"succColor"`
	FailColor int    `json:"failColor"`
	DpColor   int    `json:"dpColor"`
	StartTime time.Time
}

//Config configuration
var Config Configuration

func init() {
	file, err := os.Open("./config/config.json")
	if err != nil {
		panic(err)
	}

	defer file.Close()

	parser := json.NewDecoder(file)
	parser.Decode(&Config)

	Config.StartTime = time.Now()
}
