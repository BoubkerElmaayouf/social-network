"use client";

import { ChatApplication } from "@/utilis/component/ChatApplication";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { useState } from "react";
import Link from "next/link";
import "./search.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/utilis/component/navbar";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utilis/ auth";

// ***** search for groups or people ******//
export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const type = searchParams.get("type");
  const [loading, setLoading] = useState(true);
  console.log("type :", type);

  useEffect(() => {
    if (!searchParams) return;

    const queryParams = new URLSearchParams(searchParams);
    const url = `http://localhost:8080/api/search?${queryParams}`;

    fetch(url 
      , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(setData);
  }, [searchParams]);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to the index page if authenticated
      } else {
        setLoading(false); // Update the loading state
      }
    };
    verifyAuth();
  }, [router]);
  console.log(data);

  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] =
    useState(false);


  if (loading) {
    return <></>
  }

  return (
    <div>
      <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
      <Leftsidebar />
      <ChatApplication />
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
                        src={`http://localhost:8080/images?path=${group.Path}`}
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
