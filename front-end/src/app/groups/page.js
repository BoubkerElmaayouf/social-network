"use client"
import React from "react"
import "./groups.css"
import { useState, useEffect } from "react";
import { Navbar, Chatbox, Rightsidebar, Leftsidebar } from "../content/page";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//     faCog, 
//     faUserPlus, 
// } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserGroup, 
    faTimes, 
    faImage,
    faArrowRight,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function Groups() {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    
    // Sample group data - replace with your actual data
    const groups = [
        { 
            id: 1, 
            name: 'Cybernetic Collective', 
            avatar: 'https://i.pinimg.com/736x/5a/9d/a7/5a9da74b344b07bc2a28ad1c065e9fd1.jpg', 
            memberCount: 145, 
            description: 'A community for discussing cybernetic enhancements and neural interfaces',
            isJoined: true
        },
        { 
            id: 2, 
            name: 'Neo-Tokyo Hackers', 
            avatar:'https://i.pinimg.com/736x/09/38/e7/0938e77ecdb2a1436a3ebe03a1b7f776.jpg', 
            memberCount: 89, 
            description: 'Exploring the digital underbelly of Neo-Tokyo',
            isJoined: false
        },
        { 
            id: 3, 
            name: 'Quantum Coders', 
            avatar:'https://i.pinimg.com/736x/09/38/e7/0938e77ecdb2a1436a3ebe03a1b7f776.jpg', 
            memberCount: 67, 
            description: 'Pushing the boundaries of quantum computing theory and applications',
            isJoined: false
        },
        { 
            id: 4, 
            name: 'Synthetic Dreams', 
            avatar:'https://i.pinimg.com/736x/09/38/e7/0938e77ecdb2a1436a3ebe03a1b7f776.jpg', 
            memberCount: 204, 
            description: 'For those exploring the boundaries between reality and digital consciousness',
            isJoined: true
        },
        { 
            id: 5, 
            name: 'Neon Nights', 
            avatar:'https://i.pinimg.com/736x/09/38/e7/0938e77ecdb2a1436a3ebe03a1b7f776.jpg', 
            memberCount: 132, 
            description: 'Celebrating the aesthetic of cyberpunk nightlife across global megacities',
            isJoined: false
        },
    ];

    // const handleJoinGroup = (groupId) => {
       
    //     console.log(`Joining group with ID: ${groupId}`);
    // }

    // const handleVisitGroup = (groupId) => {

    //     console.log(`Visiting group with ID: ${groupId}`);
    // }
    
    return (
        <div className="groups-hero">
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <Leftsidebar/>
            <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />

            <main className="groups-main">
                <div className="groups-header">
                    <h1 className="groups-title">Discover Groups</h1>
                    <p className="groups-subtitle">Join communities that match your interests</p>
                    <div className="create-group">
                     <CreateGroupForm/>
                    </div>
                </div>

                <div className="groups-grid">
                    {groups.map((group) => (
                        <div key={group.id} className="group-card">
                            <div className="group-card-content">
                                <div className="group-avatar-container">
                                    <img 
                                        src={group.avatar} 
                                        alt={`${group.name} avatar`}
                                        className="group-avatar"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://i.pinimg.com/736x/09/38/e7/0938e77ecdb2a1436a3ebe03a1b7f776.jpg';
                                        }}
                                    />
                                </div>
                                
                                <div className="group-info">
                                    <h3 className="group-name">{group.name}</h3>
                                    <p className="group-member-count">{group.memberCount} members</p>
                                    <p className="group-description">{group.description}</p>
                                </div>
                                
                                <div className="group-action">
                                    <button 
                                        className={`group-button ${group.isJoined ? 'visit-button' : 'join-button'}`}
                                        onClick={() => group.isJoined 
                                            ? handleVisitGroup(group.id) 
                                            : handleJoinGroup(group.id)
                                        }
                                    >
                                        {group.isJoined ? 'Visit' : 'Join'}
                                    </button>
                                </div>
                            </div>
                            <div className="group-card-glow"></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export function CreateGroupForm() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        const fileInput = document.getElementById('groupImage');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="create-group">
            <div className="create-group-input">
                <div className="user-avatar">
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <button 
                    className="create-button"
                    onClick={() => setShowCreateForm(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Create Your Group
                </button>
            </div>

            {showCreateForm && (
                <div className="popup-overlay" onClick={() => setShowCreateForm(false)}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="close-button"
                            onClick={() => setShowCreateForm(false)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        
                        <h2>Create New Group</h2>
                        <form className="create-group-form">
                            <div className="form-group">
                                {/* <label htmlFor="groupTitle">Group Title</label> */}
                                <input 
                                    type="text" 
                                    id="groupTitle" 
                                    placeholder="Enter group title"
                                />
                            </div>

                            <div className="form-group">
                                {/* <label htmlFor="groupDescription">Group Description</label> */}
                                <textarea 
                                    id="groupDescription" 
                                    placeholder="Describe your group..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                {/* <label htmlFor="groupImage">Group Image</label> */}
                                <div className="image-upload-container">
                                    <input 
                                        type="file" 
                                        id="groupImage" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="groupImage" className="image-upload-label">
                                        <FontAwesomeIcon icon={faImage} />
                                        <span>Choose Group Image</span>
                                    </label>
                                    {selectedImage && (
                                        <div className="image-preview">
                                            <img src={selectedImage} alt="Preview" />
                                            <button 
                                                type="button"
                                                className="remove-image"
                                                onClick={removeImage}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                Create Group
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
