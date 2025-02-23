"use client";

import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
import { useState } from "react";
import Link from "next/link";
import "./search.css";

export default function Search() {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] =
        useState(false);

        const searchResults = {
            users: [
                { id: 1, username: "JohnDoe", avatar: "/api/placeholder/40/40" },
                { id: 2, username: "JaneSmith", avatar: "/api/placeholder/40/40" }
            ],
            groups: [
                { id: 1, name: "Gaming Squad", avatar: "/api/placeholder/40/40" },
                { id: 2, name: "Book Club", avatar: "/api/placeholder/40/40" }
            ]
        };
    return (   
        <div>
              <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
              <Leftsidebar />
              <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />
              <div className="search-container">
                <h1>Search</h1>
                <div className="search-results">
                    <section className="result-section">
                        <h2>Users</h2>
                        <div className="results-grid">
                            {searchResults.users.map(user => (
                                <Link href={`/profile/${user.id}`} key={user.id} className="result-item">
                                    <div className="result-content">
                                        <img 
                                            src={user?.avatar} 
                                            alt={`${user.username}'s avatar`}
                                            className="avatar"
                                        />
                                        <span className="usernames">{user.username}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="result-section">
                        <h2>Groups</h2>
                        <div className="results-grid">
                            {searchResults.groups.map(group => (
                                <Link href={`/group/${group.id}`} key={group.id} className="result-item">
                                    <div className="result-content">
                                        <img 
                                            src={group.avatar} 
                                            alt={`${group.name} group avatar`}
                                            className="avatar"
                                        />
                                        <span className="group-name">{group.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
              </div>

    );
}