"use client"

import React, { use } from "react"
import "../profile.css"
import { useState, useEffect } from "react";
import { ChatApplication } from "@/utilis/component/ChatApplication";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { Navbar } from "@/utilis/component/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { fetchUserInfo } from "@/utilis/fetching_data";

import { Post } from "@/utilis/component/display_post";
import { useRouter } from "next/navigation";



export default function Profile({ params }) {

  const [userdata, setUserdata] = useState(null);
  const [postdata, setPostdata] = useState(null);
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  const router = useRouter();
  

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [userResponse, postResponse] = await Promise.all([
          fetchUserInfo(`api/users/profile?profileId=${userId}`),
          fetchUserInfo(`api/post/getuserpost?targetId=${userId}`)
        ]);
        if (userResponse.status === 303) {
          router.push("/profile");
        }
        if (userResponse.status === 404) {
          router.push("/notfound");
        }
        if (postResponse.status === 404) {
          router.push("/notfound");
        }
        setUserdata(userResponse || []);
        setPostdata(postResponse || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userId]);
  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/request?profileId=${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        alert("User followed successfully");
      }

    } catch {
      console.error("Error following user");
    }
  }
  return (
    <div className="profile-hero">
      <Navbar/>
      <Leftsidebar />
      <ChatApplication/>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="user_profile-info">
            <div className="user_profile-avatar">
              <img src={userdata?.avatar ? `http://localhost:8080/images?path=${userdata.avatar}` : "/default-img.jpg"} alt="Profile" />
            </div>
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-name">{userdata?.firstName + " " + userdata?.lastName || "loading..."}</h1>
                <span className="profile-badge">{userdata?.nickName || ""}</span>
              </div>
              <p className="profile-bio">{userdata?.aboutme || ""}</p>
            </div>
            <div className="profile-actions">
              <button className="edit-profile" onClick={handleFollow}>
                <FontAwesomeIcon icon={faUserPlus} size="sm" /> Follow
              </button>

            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <span className="stat-value">{userdata?.nbrPosts}</span>
            <span className="stat-label">posts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{userdata?.followers}</span>
            <span className="stat-label">followers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {userdata?.datebirth ? formatDate(userdata.datebirth) : "loading..."}
            </span>

            <span className="stat-label">birth date</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{userdata?.type === true ? "Private" : "Public"}</span>
            <span className="stat-label">account</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="content-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="created-Posts">
              {postdata && postdata.length > 0 ? (
                postdata.map((post) => <Post key={post.id} post={post} />)
              ) : (
                <p>No posts available</p> // Ou un spinner de chargement
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}