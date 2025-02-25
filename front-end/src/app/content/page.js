"use client";
import "./content.css";
import {PostContainer, PostList} from "@/utilis/component/display_post.js";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { ChatApplication } from "@/utilis/component/ChatApplication";
import React, { use } from "react";
import { Footer } from "../page.js";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Prevents FOUC
config.autoAddCss = false; // Disable automatic CSS injection
import { useState } from "react";
import { Navbar } from "@/utilis/component/navbar";


export default function Content() {
  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] =
    useState(false);
  return (
    <div className="hero">
      <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
      <Leftsidebar />
      <ChatApplication/>
      <PostContainer />
      <div className="main-content">
        <PostList />
      </div>
    </div>
  );
}







