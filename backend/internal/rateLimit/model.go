package funcs

import (
	"sync"
	"time"
)

type TokenBucket struct {
	Tokens      int
	LastRequest time.Time
}

var (
	Users     = make(map[int]TokenBucket)
	Mu        sync.Mutex
	MaxTokens = 10
	Rate      = time.Second
)
