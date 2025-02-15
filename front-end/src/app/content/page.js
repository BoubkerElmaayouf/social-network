'use client';
import "./content.css";
import React from 'react';
// import './content.css';
import { Footer } from '../page.js';
import Link from 'next/link.js';
import Image from 'next/image.js';


import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

export default function Content() {
    return (
        <div className='hero'>
            <Navbar/>
            <Leftsidebar/>
            <div className='main-content'>
            </div>
            <Footer/>
        </div>
    );
}

export function Leftsidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { icon: '👽', label: 'Home', href: '/' },
        { icon: '👽', label: 'Chat', href: '/chat' },
        { icon: '👽', label: 'Notification', href: '/notification' },
        { icon: '👽', label: 'Connect', href: '/connect' }
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
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                            <div className="nav-glow"></div>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
// export function Rightsidebar() {
//     return (
//         <div className='sidebar'>
//         </div>
//     );
// }

export function chatbox() {
    return (
        <div className='chatbox'>
        </div>
    );
}

// Navbar.js


export function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
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
                </div>
                
                <div className="profile-section" ref={dropdownRef}>
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
                                onClick={() => {
                                    // nms7o lcoookie mn browser
                                    setIsDropdownOpen(false);
                                }}
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