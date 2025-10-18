package main

import (
	"encoding/json"
	"math"
	"net/http"
	"time"

	"github.com/barkloaf/HolidayBot/misc"
	"github.com/bwmarrin/discordgo"
)

type health struct {
	Healthy  bool    `json:"healthy"`
	Latency  float64 `json:"latency"`
	ErrorMsg string  `json:"error"`
}

func healthcheck(c *discordgo.Session) {
	http.HandleFunc("GET /healthcheck", func(client *discordgo.Session) func(http.ResponseWriter, *http.Request) {
		return func(writer http.ResponseWriter, request *http.Request) {
			var hcheck *health

			check := make(chan error, 1)
			go func() {
				check <- func() error {
					_, err := client.Request("GET", discordgo.EndpointAPI+"applications/@me", nil)
					return err
				}()
			}()

			select {
			case result := <-check:
				hcheck = &health{
					Healthy: result == nil,
					Latency: math.Round(.0001*float64(client.HeartbeatLatency())) / 100,
				}

				if result != nil {
					hcheck.ErrorMsg = result.Error()
				}

			case <-time.After(6 * time.Second):
				hcheck = &health{
					Healthy:  false,
					Latency:  math.Inf(1),
					ErrorMsg: "Request timed out",
				}
			}

			jsonData, err := json.Marshal(hcheck)
			if err != nil {
				misc.Logger(misc.Log{
					Group:   "err",
					Content: err.Error(),
				})

				return
			}

			writer.WriteHeader(http.StatusOK)
			writer.Header().Set("Content-Type", "application/json")
			writer.Write(jsonData)
		}
	}(c))

	go http.ListenAndServe(":8080", nil)
}
