package misc

import (
	"io/ioutil"
	"strings"
)

var dir = "./zoneinfo/"

var Zones []string

func readZones(path string) {
	files, _ := ioutil.ReadDir(dir + path)
	for _, f := range files {
		if f.Name() != strings.ToUpper(f.Name()[:1])+f.Name()[1:] {
			continue
		}
		if f.IsDir() {
			readZones(path + "/" + f.Name())
		} else {
			Zones = append(Zones, (path + "/" + f.Name())[1:])
		}
	}
}

func init() {
	readZones("")
}
