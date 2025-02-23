"use client";

import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
import { useState } from "react";
import Link from "next/link";
import "./search.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const type = searchParams.get("type");
  console.log("type :", type);

  useEffect(() => {
    if (!searchParams) return;

    const queryParams = new URLSearchParams(searchParams);
    const url = `http://localhost:8080/api/search?${queryParams}`;
    console.log("ulr :", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(setData);
  }, [searchParams]);
  console.log(data);

  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] =
    useState(false);

  return (
    <div>
      <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
      <Leftsidebar />
      <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />
      <div className="search-container">
        <h1>Search</h1>
        <div className="search-results">
          <section className="result-section">
            <div className="results-grid">
              {type === "people" &&
                data &&
                data.map((user) => (
                  <Link
                    href={`/profile/${user.Id}`}
                    key={user.Id}
                    className="result-item"
                  >
                    <div className="result-content">
                      <img
                        src={`http://localhost:8080/images?path=${user.Path}`}
                        alt={`${user.FirstName}'s avatar`}
                        className="avatar"
                      />
                      <span className="usernames">
                        {user.FirstName + " " + user.LastName}
                      </span>
                    </div>
                  </Link>
                ))}

              {type === "groups" &&
                data &&
                data.map((group) => (
                  <Link
                    href={`/group/${group.Id}`}
                    key={group.Id}
                    className="result-item"
                  >
                    <div className="result-content">
                      <img
                        src={group.Path}
                        alt={`${group.Title} group avatar`}
                        className="avatar"
                      />
                      <span className="group-name">{group.Title}</span>
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
