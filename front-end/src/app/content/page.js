'use client';
import "./content.css";
import React from 'react';
// import './content.css';
import { Footer } from '../page.js';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Prevents FOUC
config.autoAddCss = false; // Disable automatic CSS injection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faComments, faBell, faUserFriends, faUser, faGear, faCog, faBars,faSearch,  faThumbsUp, 
    faThumbsDown, 
    faComment, 
    faClock,
    faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Content() {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    const samplePost = {
        title: "Sample Post Title",
        content: "This is an example of a post content.",
        user: {
            name: "Tomy",
            avatar: "/default-avatar.svg"
        },
        timestamp: "2 hours ago",
        likes: 123,
        dislikes: 12,
        comments: []
    };

    return (
        <div className='hero'>
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>
            <Leftsidebar/>
            <Rightsidebar isMobileOpen={isMobileRightSidebarOpen} />
            <PostContainer/>
                {/* just some shade shapes */}
              
   

            <div className='main-content'>
                {/* <Chatbox /> */}
                <Post Post={samplePost}/>
            </div>
        </div>
    );
}

// export function groupmessage() {
//     return (
//         <div className="groupmessage">
//         </div>
//     )
// }

//***************** the created post ***************/


export function Post({ post }) {
    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            content: newComment,
            author: 'Current User',
            timestamp: new Date().toISOString(),
            likes: 0,
            dislikes: 0
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <article className="post">
            <div className="post-header">
                <div className="post-user-info">
                    <div className="user-avatar">
                        <Image 
                            src="/default-avatar.svg"
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="avatar-image"
                        />
                    </div>
                    <div className="user-details">
                        <h3 className="user-name">belmaayo</h3>
                        <span className="post-timestamp">
                            <FontAwesomeIcon icon={faClock} />
                            <time>2 hours ago</time>
                        </span>
                    </div>
                </div>
            </div>

            <div className="post-content">
                <h2 className="post-title">welcome to union </h2>
                <p className="post-text">lets gooooooooooooooooooooo!!</p>
                <div className="post-image">
                    <Image 
                        src="/public/bugs.jpg"
                        alt="Post image"
                        width={500}
                        height={300}
                        className="post-image"
                    />
                </div>
            </div>

            <div className="post-actions">
                <button className="action-button">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>123</span>
                </button>
                <button className="action-button">
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span>12</span>
                </button>
                <button 
                    className="action-button"
                    onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
                >
                    <FontAwesomeIcon icon={faComment} />
                    <span>{comments.length}</span>
                </button>
            </div>

            {isCommentSectionOpen && (
                <div className="comments-section">
                    <form className="comment-form" onSubmit={handleSubmitComment}>
                        <div className="user-avatar">
                            <Image 
                                src="/default-avatar.svg"
                                alt="Your avatar"
                                width={32}
                                height={32}
                                className="avatar-image"
                            />
                        </div>
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="comment-submit"
                            disabled={!newComment.trim()}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>

                    <div className="comments-list">
                        {comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <div className="user-avatar">
                                        <Image 
                                            src="/default-avatar.svg"
                                            alt="Commenter avatar"
                                            width={32}
                                            height={32}
                                            className="avatar-image"
                                        />
                                    </div>
                                    <div className="comment-details">
                                        <span className="comment-author">{comment.author}</span>
                                        <span className="comment-timestamp">
                                            <FontAwesomeIcon icon={faClock} />
                                            <time>Just now</time>
                                        </span>
                                    </div>
                                </div>
                                <p className="comment-content">{comment.content}</p>
                                <div className="comment-actions">
                                    <button className="action-button">
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button className="action-button">
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                        <span>{comment.dislikes}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}

export  function PostContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        privacy: 'public'
    });
    const [imagePreview, setImagePreview] = useState(null);
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

    // Add these state variables at the top of your PostContainer component
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const friendsModalRef = useRef(null);

    // Add this mock data (replace with your actual friends data)
    const friends = [
        { id: 1, name: 'simo fadil', avatar: '/default-avatar.png' },
        { id: 2, name: 'belmaayo the king', avatar: '/default-avatar.png' },
        { id: 3, name: 'oriaxnxx', avatar: '/default-avatar.png' },
    ];

    // Add this function to handle friend selection
    const handleFriendSelection = (friendId) => {
        setSelectedFriends(prev => {
            if (prev.includes(friendId)) {
                return prev.filter(id => id !== friendId);
            }
            return [...prev, friendId];
        });
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post submission logic here
        console.log('Post data:', { ...formData, image: imagePreview });
        setIsModalOpen(false);
        setFormData({
            title: '',
            content: '',
            privacy: 'public'
        });
        setImagePreview(null);
    };

    return (
        <div className="content-container">
            <div className="create-post-trigger" onClick={() => setIsModalOpen(true)}>
                <div className="user-avatar">
                    <img 
                        src="/default-avatar.png" 
                        alt="Your avatar" 
                        className="avatar-image"
                    />
                </div>
                <div className="trigger-input">
                    What's on your mind?
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="create-post-modal" ref={modalRef}>
                        <div className="modal-header">
                            <h2>Create Post</h2>
                            <button 
                                className="close-button"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="post-form">
                            <div className="form-group">
                                <div className="image-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="file-input"
                                        ref={fileInputRef}
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="upload-label">
                                        <svg 
                                            width="24" 
                                            height="24" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2"
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                                            <path d="M16 5V3" />
                                            <path d="M8 14a3 3 0 0 1 3-3h4" />
                                            <line x1="17" y1="8" x2="17" y2="14" />
                                            <line x1="14" y1="11" x2="20" y2="11" />
                                        </svg>
                                        Upload Image
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="image-preview-container">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="image-preview"
                                        />
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

                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Post title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        title: e.target.value
                                    })}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    placeholder="Write your post..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        content: e.target.value
                                    })}
                                    className="form-textarea"
                                    required
                                />
                            </div>

                            <div className="privacy-options">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="privacy"
                                        value="public"
                                        checked={formData.privacy === 'public'}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            privacy: e.target.value
                                        })}
                                    />
                                    <span className="radio-custom"></span>
                                    Public
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="privacy"
                                        value="private"
                                        checked={formData.privacy === 'private'}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            privacy: e.target.value
                                        })}
                                    />
                                    <span className="radio-custom"></span>
                                    Private
                                </label>
                            </div>
                            <div className="target-friends-section">
                                <button 
                                    type="button"
                                    className="target-friends-button"
                                    onClick={() => setShowFriendsModal(true)}
                                >
                                    Target Friends
                                </button>
                            </div>
                            {showFriendsModal && (
                                <div className="friends-modal-overlay">
                                    <div className="friends-modal" ref={friendsModalRef}>
                                        <div className="friends-modal-header">
                                            <h3>Select Friends</h3>
                                            <button 
                                                className="close-button"
                                                onClick={() => setShowFriendsModal(false)}
                                                aria-label="Close modal"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        
                                        <div className="friends-list">
                                            {friends.map(friend => (
                                                <label key={friend.id} className="friend-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFriends.includes(friend.id)}
                                                        onChange={() => handleFriendSelection(friend.id)}
                                                    />
                                                    <div className="friend-avatar">
                                                        <img src={friend.avatar} alt={friend.name} />
                                                    </div>
                                                    <span className="friend-name">{friend.name}</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="friends-modal-footer">
                                            <button 
                                                className="confirm-selection"
                                                onClick={() => {
                                                    console.log('Selected friends:', selectedFriends);
                                                    setShowFriendsModal(false);
                                                }}
                                            >
                                                Confirm Selection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}           
                            <button type="submit" className="submit-button">
                                Create Post
                                <div className="button-glow"></div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export function Leftsidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const menuItems = [
        { icon: faHouse, label: 'Home', href: '/' },
        { icon: faComments, label: 'Chat', href: '/chat' },
        { icon: faBell, label: 'Notification', href: '/notification' },
        { icon: faUserFriends, label: 'Connect', href: '/connect' }
    ];

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-content">
                <button 
                    className="collapse-button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        className={`collapse-icon ${isCollapsed ? 'rotated' : ''}`}
                    >
                        <path 
                            d="M15 7L10 12L5 7" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <nav className="sidebar-nav">
                    {menuItems.map((item, index) => (
                        <Link 
                            key={index}
                            href={item.href}
                            className="nav-item"
                        >
                            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                            <div className="nav-glow"></div>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}



export function Rightsidebar({ isMobileOpen }) {
    const rightMenuItems = [
        { icon: faUser, label: 'Profile', href: '/profile' },
        { icon: faGear, label: 'Settings', href: '/settings' },
        { icon: faCog, label: 'Preferences', href: '/preferences' }
    ];

    return (
        <aside className={`right-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
            <div className="right-sidebar-content">
                <nav className="right-sidebar-nav">
                    {rightMenuItems.map((item, index) => (
                        <Link 
                            key={index}
                            href={item.href}
                            className="right-nav-item"
                        >
                            <FontAwesomeIcon icon={item.icon} className="right-nav-icon" />
                            <span className="right-nav-label">{item.label}</span>
                            <div className="right-nav-glow"></div>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}


export function Chatbox() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey, how's it going?", sender: 'other', timestamp: '09:41' },
        { id: 2, text: "Pretty good! Working on some new features.", sender: 'self', timestamp: '09:42' },
        { id: 3, text: "That sounds interesting! Can you tell me more about it?", sender: 'other', timestamp: '09:43' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'self',
                timestamp: new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                })
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <div className="chatbox">
            <div className="chat-header">
                <div className="chat-user-info">
                    <div className="user-avatar">
                        <span className="user-status"></span>
                    </div>
                    <span className="user-name">John Doe</span>
                </div>
            </div>

            <div className="messages-container">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message-wrapper ${message.sender === 'self' ? 'message-self' : 'message-other'}`}
                    >
                        <div className="message">
                            <p className="message-text">{message.text}</p>
                            <span className="message-timestamp">{message.timestamp}</span>
                            <div className="message-glow"></div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button 
                    type="submit" 
                    className="send-button"
                    disabled={!newMessage.trim()}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}
//  ********* navbar 


export function Navbar({ setIsMobileRightSidebarOpen }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const handleReport = () => {
        router.push('/report')
        setIsDropdownOpen(false)
    }
    const handleProfile = () => {
        router.push('/profile')
        setIsDropdownOpen(false)
    }

    const handleLogout = () => {
        router.push('/login')
        setIsDropdownOpen(false)
    }
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-section">
                    <Link href="/" className="logo-link">
                        <Image 
                            src="/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="logo-image"
                        />
                    </Link>
                <div className="search-section">
                        <div className="search-input">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input type="text" placeholder="Search..." className="search-bar" />
                            <div className="search-glow"></div>
                        </div>
                        
                        <div className="radio-group">
                            <label className="search-radio-label">
                                <input 
                                    type="radio" 
                                    name="search-type" 
                                    value="people" 
                                    className="search-radio-input"
                                    defaultChecked 
                                />
                                People
                            </label>
                            <label className="search-radio-label">
                                <input 
                                    type="radio" 
                                    name="search-type" 
                                    value="groups" 
                                    className="search-radio-input"
                                />
                                Groups
                            </label>
                        </div>
                     </div>
                </div>
                
                <div className="profile-section" ref={dropdownRef}>
                    <button 
                        className="mobile-sidebar-toggle"
                        onClick={() => setIsMobileRightSidebarOpen(prev => !prev)}
                        aria-label="Toggle right sidebar"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <button 
                        className="profile-button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="profile-avatar">
                            <Image 
                                src="../public/global_avatar.svg"
                                alt="Profile"
                                width={32}
                                height={32}
                                className="avatar-image"
                            />
                        </div>
                        <span className="username">Belmaayo</span>
                        <svg 
                            className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                            width="12" 
                            height="8" 
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M1 1L6 6L11 1" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button 
                                className="dropdown-item"
                                onClick={handleProfile}
                            >
                                Profile
                            </button>
                            <button 
                                className="dropdown-item"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <button 
                                className="dropdown-item"
                                onClick={handleReport}
                            >
                                Report
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}