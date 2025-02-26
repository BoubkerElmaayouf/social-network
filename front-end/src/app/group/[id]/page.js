'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers, faArrowRight,   faUserGroup,
    faTimes, 
    faCalendarPlus, 
    faPencilAlt,
    faImage} from '@fortawesome/free-solid-svg-icons';
import {CreateGroupPost} from "../page.js"
import { ChatApplication } from "@/utilis/component/ChatApplication";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { Navbar } from "@/utilis/component/navbar";
import { useState } from 'react';
import {use} from "react";
import { useEffect } from "react";
import { fetchUserInfo } from "@/utilis/fetching_data";
import { Post } from "@/utilis/component/display_post";
import { useRouter } from "next/navigation";
// import Head from "next/head";


// export const  metadata = {
//     title: "Group",
//     description: "this is Group that you can join or visit",
//   };

export default function Group({params}) {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    const [groupdata, setGroupdata] = useState([]);
    const router = useRouter();

    const resolvedParams = use(params);
    const groupId = resolvedParams.id;

    if (groupId == 0) {
        router.push("/notfound");
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetchUserInfo(`api/groups/get?groupId=${groupId}`);
            if (response.status === 400) {
              router.push("/notfound");
            }
            setGroupdata(response || []);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [groupId]);
    

    return (
        <div className="group-hero">
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <Leftsidebar/>
            <ChatApplication/>
            <div className="group-container">
                <div className="group-header">
                    <div className="group-cover"></div>
                    <div className="group-info">
                        <div className="group-avatar">
                            {/* <FontAwesomeIcon icon={faUserGroup} size="2x" /> */}
                            <img 
                            className='group-image'
                                        src={groupdata?.image ? `http://localhost:8080/images?path=${groupdata?.image}` : "/default-img.jpg"} 
                                        alt='group-img'
                                        
                            />
                        </div>
                        <div className="group-details">
                            <div className="group-name-section">
                                <h1 className="group-name">{groupdata?.title}</h1>
                                <span className="group-badge">
                                    <FontAwesomeIcon icon={faUsers} size="sm" />
                                    <span>{groupdata?.nbr} members</span>
                                </span>
                            </div>
                            <p className="group-description">
                                {groupdata?.Descreption}
                            </p>
                            <div className="group-actions">
                                <button className="join-group">
                                    Join Group
                                    <FontAwesomeIcon icon={faArrowRight} size="sm" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="group-stats">
                    <div className="stat-card">
                        <span className="stat-value">128</span>
                        <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">2.4k</span>
                        <span className="stat-label">Members</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">45</span>
                        <span className="stat-label">Active Now</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">892</span>
                        <span className="stat-label">Discussions</span>
                    </div>
                </div> */}
            <CreateGroupPost/>
            </div>
        </div>

    );
}