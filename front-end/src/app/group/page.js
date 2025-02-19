'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers, faArrowRight,   faUserGroup,
    faTimes, 
    faCalendarPlus, 
    faPencilAlt,
    faImage} from '@fortawesome/free-solid-svg-icons';
import "./group.css"
import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
import { useState } from 'react';
// import Head from "next/head";


// export const  metadata = {
//     title: "Group",
//     description: "this is Group that you can join or visit",
//   };

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
            <CreateGroupPost/>
            </div>
        </div>

    );
}

export function CreateGroupPost() {
    const [showOptionsPopup, setShowOptionsPopup] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [showPostForm, setShowPostForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const closeAllPopups = () => {
        setShowOptionsPopup(false);
        setShowEventForm(false);
        setShowPostForm(false);
    };

    return (
        <div className='create-group-post'>
            <div className='post-input-container'>
                <div className='group-avatar01'>
                <img 
                            className='group-image'
                                        src='https://i.pinimg.com/736x/16/11/ce/1611ce69030dd0b3a27aa56a224fb76f.jpg' 
                                        alt='group-img'
                                        
                                    />
                </div>
                <input 
                    type="text"
                    placeholder="Start a discussion..."
                    onClick={() => setShowOptionsPopup(true)}
                    readOnly
                />
            </div>

            {/* Options Popup */}
            {showOptionsPopup && (
                <div className='popup-overlay' onClick={closeAllPopups}>
                    <div className='popup-content options-popup' onClick={e => e.stopPropagation()}>
                        <button className='close-button' onClick={closeAllPopups}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className='options-container'>
                            <button 
                                className='option-button'
                                onClick={() => {
                                    setShowOptionsPopup(false);
                                    setShowEventForm(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faCalendarPlus} />
                                Create a Group Event
                            </button>
                            <button 
                                className='option-button'
                                onClick={() => {
                                    setShowOptionsPopup(false);
                                    setShowPostForm(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                                Create a Group Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Form Popup */}
            {showEventForm && (
                <div className='popup-overlay' onClick={closeAllPopups}>
                    <div className='popup-content form-popup' onClick={e => e.stopPropagation()}>
                        <button className='close-button' onClick={closeAllPopups}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2>Create Event</h2>
                        <form className='event-form'>
                            <div className='form-group'>
                                <label htmlFor="eventTitle">Event Title</label>
                                <input type="text" id="eventTitle" placeholder="Enter event title" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="eventDescription">Event Description</label>
                                <textarea 
                                    id="eventDescription" 
                                    placeholder="Describe your event..."
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="eventDate">Event Date</label>
                                <input type="datetime-local" id="eventDate" />
                            </div>
                            <button type="submit" className='submit-button'>
                                Create Event
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Post Form Popup */}
            {showPostForm && (
                <div className='popup-overlay' onClick={closeAllPopups}>
                    <div className='popup-content form-popup' onClick={e => e.stopPropagation()}>
                        <button className='close-button' onClick={closeAllPopups}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2>Create Post</h2>
                        <form className='post-form'>
                            <div className='form-group'>
                                <label htmlFor="postTitle">Post Title</label>
                                <input type="text" id="postTitle" placeholder="Enter post title" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="postImage">Image Upload</label>
                                <div className='image-upload-container'>
                                    <input 
                                        type="file" 
                                        id="postImage" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="postImage" className='image-upload-label'>
                                        <FontAwesomeIcon icon={faImage} />
                                        <span>Choose Image</span>
                                    </label>
                                    {selectedImage && (
                                        <div className='image-preview'>
                                            <img src={selectedImage} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="postContent">Post Content</label>
                                <textarea 
                                    id="postContent" 
                                    placeholder="Write your post..."
                                    rows="4"
                                ></textarea>
                            </div>
                            <button type="submit" className='submit-button'>
                                Create Post
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}