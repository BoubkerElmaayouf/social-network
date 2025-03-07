package funcs

import (
	"errors"
	"fmt"

	ws "funcs/internal/chat"
)

func ReadAll(notifType, id int) error {
	switch notifType {
	case 2:
		// userRequest
		return ReadUserRequest(id)
	case 3:
		// grouprequest
		return ReadJoinRequest(id)
	case 4:
		// invitation
		return ReadInvitation(id)
	}
	return errors.New("cccccccccc")
}

func SendRealTimeNotification(userId []int, notif NOTIF) {
	conns, mu := ws.GetConns()

	fmt.Println("+++++++++++",conns)

	mu.Lock()
	for _, user := range userId {
		for _, conn := range conns[user] {
			conn.WriteJSON(notif)
		}
	}
	mu.Unlock()
}
