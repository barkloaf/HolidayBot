package events

import (
	"fmt"
	"runtime/debug"
)

func eventRecover() {
	rec := recover()

	if rec != nil {
		fmt.Printf("\n------\n%v\n------\n", debug.Stack())
	}
}
