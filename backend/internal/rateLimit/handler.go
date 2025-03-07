package funcs

import (
	"net/http"
	"time"

	pkg "funcs/pkg"
)

func TokenBucketWare(funcNext http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := pkg.GetIdBySession(w, r)
		if err != nil {
			pkg.SendResponseStatus(w, http.StatusInternalServerError, err)
			return
		}

		Mu.Lock()
		user, exists := Users[id]

		if exists {

			duration := time.Since(user.LastRequest)
			tokensToAdd := int(duration / Rate)

			if tokensToAdd > 0 {
				user.Tokens += tokensToAdd
				if user.Tokens > MaxTokens {
					user.Tokens = MaxTokens
				}
				user.LastRequest = time.Now()
			}

			if user.Tokens <= 0 {
				Mu.Unlock()
				w.WriteHeader(http.StatusTooManyRequests)
				return
			}

			user.Tokens--
		} else {
			user = TokenBucket{
				LastRequest: time.Now(),
				Tokens:      MaxTokens - 1,
			}
		}

		Users[id] = user
		Mu.Unlock()

		funcNext(w, r)
	}
}
