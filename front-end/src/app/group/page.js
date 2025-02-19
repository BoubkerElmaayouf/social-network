'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./group.css"
import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
import { useState } from 'react';


export default function Group() {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    return (
        <div className="group-hero">
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <Leftsidebar/>
            <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />
            <div className="group-container">
                <div className="group-header">
                    <div className="group-cover"></div>
                    <div className="group-info">
                        <div className="group-avatar">
                            {/* <FontAwesomeIcon icon={faUserGroup} size="2x" /> */}
                            <img 
                            className='group-image'
                                        src='https://i.pinimg.com/736x/16/11/ce/1611ce69030dd0b3a27aa56a224fb76f.jpg' 
                                        alt='group-img'
                                        
                                    />
                        </div>
                        <div className="group-details">
                            <div className="group-name-section">
                                <h1 className="group-name">chakchabani</h1>
                                <span className="group-badge">
                                    <FontAwesomeIcon icon={faUsers} size="sm" />
                                    <span>2.4k members</span>
                                </span>
                            </div>
                            <p className="group-description">
                                jazirat chakchabaniiiiy
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

                <div className="group-stats">
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
                </div>
            </div>
        </div>
    );
}