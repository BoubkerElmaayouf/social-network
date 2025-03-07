package funcs

import (
	"encoding/json"
	"time"
)

type WebsocketData struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

type Private_Message struct {
	Id         int
	SenderID   int
	ReceiverID int
	Content    string
	Created_at time.Time
}

type Group_Mesaage struct {
	Id         int
	SenderID   int
	Sender     SUser
	SenderName string
	Group      int
	Content    string
	Created_at time.Time
}

type SUser struct {
	Id        int    `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Nickname  string `json:"nickname"`
	Path      string `json:"path"`
}
