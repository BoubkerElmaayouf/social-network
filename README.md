# Social Network Project

## Project Overview

This document details the INTRA OUJDA Social Network project, a comprehensive full-stack development undertaking designed to simulate a Facebook-like social networking platform.  The project utilizes a JavaScript frontend, a Go backend, and a SQLite database, all containerized using Docker.  The goal is to provide a hands-on learning experience encompassing various aspects of web development, including database management, authentication, real-time communication, and deployment.

## moke up:
![Mockup](https://github.com/BoubkerElmaayouf/social-network/blob/master/mokeup.png?raw=true)

## Project Purpose

The primary purpose of this project is to solidify students' understanding of full-stack development principles by building a complex, feature-rich application.  Students will gain practical experience in:

- **Frontend Development:** Utilizing HTML, CSS, and a chosen JavaScript framework (Next.js, Vue.js, Svelte, or Mithril are suggested) to create a responsive and performant user interface.
- **Backend Development:** Designing and implementing server-side logic in Go, including handling HTTP requests, database interactions, and implementing middleware for authentication and image handling.
- **Database Management:** Utilizing SQLite for data persistence, designing an Entity-Relationship Diagram (ERD) for optimal database structure, and implementing migrations for database schema management using `golang-migrate` or a similar package.
- **Containerization:** Building and deploying Docker images for both the frontend and backend components, ensuring efficient and consistent deployment across different environments.
- **Real-time Communication:** Implementing WebSockets using the `Gorilla websocket` package to enable real-time chat functionality.
- **Authentication and Security:** Implementing secure user authentication using sessions, cookies, and password hashing (e.g., bcrypt).


## Key Insights and Features

This project incorporates several key features and concepts:

- **User Authentication:**  Users register with email, password, name, date of birth, and optional profile information (avatar, nickname, about me).  Sessions and cookies maintain login state.  Password hashing ensures secure storage of sensitive data.

- **User Profiles:**  Profiles display user information (excluding passwords), activity (posts), followers, and following.  Profiles can be set to public or private, controlling visibility of information to followers only or all users.

- **Posts and Comments:** Users can create posts and comments, including images (JPEG, PNG, GIF).  Posts can have different privacy levels: public, almost private (visible to followers), and private (visible to selected followers).

- **Groups:** Users can create, join, and manage groups.  Group features include:
    - Group-specific posts and comments.
    - Event creation with RSVP options (Going/Not Going).
    - Group chat functionality.
    - User invitation/request system.

- **Following System:** Users can send follow requests, which are accepted or declined by the recipient.  Public profiles bypass the request system.

- **Real-time Chat:**  Private chats between users (at least one must be following the other) and group chats are implemented using WebSockets for instant message delivery.  Emoji support is included.

- **Notifications:**  Users receive notifications for:
    - Follow requests (private profiles).
    - Group invitations.
    - Group join requests (for group creators).
    - New group events.

- **Image Handling:** The backend handles image uploads (JPEG, PNG, GIF), storing them in the file system and referencing them in the database.

- **Migrations:**  A robust migration system ensures database schema updates are managed effectively, using a structured folder system (e.g., `backend/pkg/db/migrations/sqlite`).

- **Docker Containerization:**  The project is containerized using Docker, creating separate images for the frontend and backend, simplifying deployment and ensuring consistent environments.


## Technology Stack

- **Frontend:** HTML, CSS, JavaScript (with a chosen framework),
- **Backend:** Go
- **Database:** SQLite
- **WebSockets:** Gorilla websocket
- **Migrations:** golang-migrate (or similar)
- **Security:** bcrypt (for password hashing)
- **Containerization:** Docker


## Author Details

The project was developed by the following team members:

- **Mohammed Fadil:** `mfadil`
- **Boubker Elmaayouf:** `belmaayo`
- **Yassine Ouzddou:** `yaouzddou`
- **Amine Habchi:** `ahabchi`


## Contributing

Contributions are welcome! Please submit issues or pull requests to improve the project.
