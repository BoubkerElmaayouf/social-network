'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers, faArrowRight,   faUserGroup,
    faTimes, 
    faCalendarPlus, 
    faPencilAlt,
    faImage} from '@fortawesome/free-solid-svg-icons';
import "./group.css"
import { ChatApplication } from "@/utilis/component/ChatApplication";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { Navbar } from "@/utilis/component/navbar";
import { useState } from 'react';


export default function Group() {
    return (
        <div> 
            <Navbar />
            <Leftsidebar />
            <ChatApplication/>
            <div className='message_not_found'> this is not a specified group page!!</div>
        </div>
    )
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
    const removeImage = () => {
        setSelectedImage(null);
        // Reset the file input
        const fileInput = document.getElementById('postImage');
        if (fileInput) fileInput.value = '';
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