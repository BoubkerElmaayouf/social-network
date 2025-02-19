"use client"

import React from "react"
import "./profile.css"
import { useState, useEffect } from "react";
import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCog, 
    faUserPlus, 
} from '@fortawesome/free-solid-svg-icons';

import { Post } from "../content/page";

export default function Profile() {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettingsPopup = () => setIsSettingsOpen(!isSettingsOpen);
    
    return (
        <div className="profile-hero">
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <Leftsidebar/>
            <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-cover"></div>
                    <div className="user_profile-info">
                        <div className="user_profile-avatar">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop" alt="Profile" />
                        </div>
                        <div className="profile-details">
                            <div className="profile-name-section">
                                <h1 className="profile-name">belmmayo</h1>
                                {/* <span className="profile-badge">Pro Member</span> */}
                            </div>
                            <p className="profile-bio">Full-stack developer passionate about creating innovative solutions and pushing the boundaries of technology.</p>
                        </div>
                        <div className="profile-actions">
                            <button className="edit-profile">
                            <FontAwesomeIcon icon={faUserPlus} size="sm" /> Follow
                            </button>
                            <button className="settings-button" onClick={toggleSettingsPopup}>
                                <FontAwesomeIcon icon={faCog} size="sm" />
                            </button>
                            
                            <SettingsPopup 
                                isOpen={isSettingsOpen} 
                                onClose={() => setIsSettingsOpen(false)} 
                            />
                        </div>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat-card">
                        <span className="stat-value">128</span>
                        <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">15.2k</span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">2.1k</span>
                        <span className="stat-label">Following</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">892</span>
                        <span className="stat-label">Comments</span>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="content-section">
                        <h2 className="section-title">Recent Activity</h2>
                        <div className="created-Posts">
                            <Post/>
                            <Post/>
                            <Post/>
                            <Post/>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    );
}


const SettingsPopup = ({ isOpen, onClose }) => {
    const [privacySetting, setPrivacySetting] = useState('private');
  
    if (!isOpen) return null;
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically make an API call to save the settings
      console.log('Submitting privacy setting:', privacySetting);
      onClose();
    };
  
    const handlePrivacyChange = (e) => {
      setPrivacySetting(e.target.value);
    };
  
    return (
      <div className="setting-popup-overlay" onClick={handleOverlayClick}>
        <div className="settings-popup">
          <div className="settings-content">
            <h2>Privacy Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className="setting-radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="privacy" 
                    value="private" 
                    checked={privacySetting === 'private'}
                    onChange={handlePrivacyChange}
                  />
                  Private
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="privacy" 
                    value="public" 
                    checked={privacySetting === 'public'}
                    onChange={handlePrivacyChange}
                  />
                  Public
                </label>
              </div>
              <button type="submit" className="submit-settings">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };