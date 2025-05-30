package misc

import (
	"os"
	"strings"
)

var Zones []string

func readZones(path string, dir string) {
	files, _ := os.ReadDir(dir + path)
	for _, f := range files {
		if f.Name() != strings.ToUpper(f.Name()[:1])+f.Name()[1:] {
			continue
		}
		if f.IsDir() {
			readZones(path+"/"+f.Name(), dir)
		} else {
			if strings.Contains(f.Name(), ".") {
				continue
			}

			Zones = append(Zones, (path + "/" + f.Name())[1:])
		}
	}
}

func init() {
	readZones("", Config.Zones)
}
