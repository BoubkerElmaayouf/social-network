# README: INTRA OUJDA Social Network Project

## Project Overview

This document details the development of a Facebook-like social network application as part of the INTRA OUJDA module.  The project encompasses both frontend and backend development, utilizing Docker for containerization and SQLite for database management.  The goal is to build a functional social network with features such as user profiles, posts, groups, messaging, and notifications.

## Project Purpose

The primary purpose of this project is to provide a comprehensive learning experience in full-stack web development. Students will gain practical skills in:

- **Frontend Development:** Utilizing JavaScript frameworks (Next.js, Vue.js, Svelte, or Mithril are suggested), HTML, CSS, and responsive design principles to create a user-friendly interface.
- **Backend Development:** Designing and implementing server-side logic using Go, including authentication (sessions and cookies), image handling, and WebSocket integration for real-time communication.
- **Database Management:** Utilizing SQLite, designing an Entity-Relationship Diagram (ERD), and implementing database migrations using `golang-migrate` or a similar package for efficient database management and version control.
- **Docker Containerization:** Building and deploying Docker images for both the frontend and backend components, ensuring efficient deployment and scalability.
- **Software Engineering Principles:** Applying best practices in software development, including modular design, version control (using Git and Gitea in this instance), and testing.


## Key Insights and Features

This project involves the implementation of several key features:

- **User Authentication:**  Secure user registration and login functionality using email, password, and optional profile information (first name, last name, date of birth, avatar, nickname, about me).  Sessions and cookies are used to maintain user login state.  The `bcrypt` package is recommended for password hashing.

- **User Profiles:**  Each user has a profile displaying their information (excluding password), activity (posts), followers, and following. Profiles can be set to public or private, controlling visibility of information to followers only or to all users.

- **Posts and Comments:** Users can create posts and comments, including images (JPEG, PNG, GIF).  Posts can be set to public, almost private (visible to followers), or private (visible to selected followers).

- **Groups:** Users can create, join, and manage groups.  Group features include:
    - Group creation with title and description.
    - User invitations and requests to join.
    - Group-specific posts and comments.
    - Event creation within groups, allowing users to RSVP.

- **Private Chat:** Real-time private messaging between users who are following each other (or where one user has a public profile) is enabled using WebSockets (Gorilla WebSocket package is recommended).  Emoji support is required.  Groups also have a shared chat room.

- **Notifications:**  A notification system alerts users of:
    - Following requests (for private profiles).
    - Group invitations.
    - Group join requests (for group creators).
    - New events in groups they are members of.

- **Image Handling:** The backend must handle image uploads (JPEG, PNG, GIF) and store them appropriately (e.g., storing file paths in the database and saving images to the file system).

- **Database Migrations:**  A robust migration system is crucial for managing database schema changes.  The project requires a structured folder organization for migration files (up and down scripts) and a Go file (`sqlite.go`) to manage database connections and migration application.  The `golang-migrate` package is suggested.

- **Backend Architecture:** The backend is structured with a server (e.g., Caddy or a custom server in Go), an application handling requests and database interactions, and an SQLite database.  Middleware for authentication and image handling is essential.

- **Docker Containerization:**  The project requires separate Docker images for the frontend and backend, ensuring independent deployment and management.  Proper port exposure is crucial for communication between containers.


## Project Repository

The project repository is located at: [https://github.com/BoubkerElmaayouf/social-network](https://github.com/BoubkerElmaayouf/social-network)


## Allowed Packages

The following packages are permitted for use in this project:

- Standard Go packages
- Gorilla WebSocket
- golang-migrate (or similar migration package)
- sql-migration (or similar migration package)
- migration (or similar migration package)
- sqlite3
- bcrypt
- UUID


## Author Details

This project was developed by the following team members:

- Mohammed Fadil (mfadil)
- Boubker Elmaayouf (belmaayo)
- Yassine Ouzddou (yaouzddou)
- Amine Habchi (ahabchi)

