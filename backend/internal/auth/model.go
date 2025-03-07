package funcs

import "time"

type User struct {
    ID          int       `json:"id"`
    Email       string    `json:"email"`
    Password    string    `json:"password"`
    FirstName   string    `json:"firstName"`
    LastName    string    `json:"lastName"`
    DateOfBirth string    `json:"dateOfBirth"`  // ✅ Renamed for consistency
    Avatar      *string   `json:"avatar,omitempty"`
    Nickname    *string   `json:"nickname,omitempty"`
    AboutMe     *string   `json:"aboutMe,omitempty"`
    ProfileType  bool     `json:"profileType"`
    CreatedAt   time.Time `json:"createdAt"`
}


