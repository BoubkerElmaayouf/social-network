CREATE TABLE
    posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        group_id INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        pathimg TEXT DEFAULT '',
        types TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE FOREIGN KEY (group_id) REFERENCES groups (id) ON DELETE CASCADE
    );