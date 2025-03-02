'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers, faArrowRight, faUserGroup,
    faTimes,
    faUserPlus,
    faSearch,
    faCalendar,
    faCalendarPlus,
    faPencilAlt,
    faImage
} from '@fortawesome/free-solid-svg-icons';
import { CreateGroupPost } from "../page.js"
import { ChatApplication } from "@/utilis/component/ChatApplication";
import { Leftsidebar } from "@/utilis/component/leftsidebar";
import { Navbar } from "@/utilis/component/navbar";
import { useState } from 'react';
import { use } from "react";
import { useEffect } from "react";
import { fetchUserInfo } from "@/utilis/fetching_data";
import { Post } from "@/utilis/component/display_post";
import { useRouter } from "next/navigation";
// import Head from "next/head";


// export const  metadata = {
//     title: "Group",
//     description: "this is Group that you can join or visit",
//   };

export default function Group({ params }) {
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
    const [groupdata, setGroupdata] = useState([]);
    const router = useRouter();
    const [userdata, setUserdata] = useState(null);
    const [showInvitePopup, setShowInvitePopup] = useState(false);

    const resolvedParams = use(params);
    const groupId = resolvedParams.id;

    if (groupId == 0) {
        router.push("/notfound");
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserInfo(`api/groups/get?groupId=${groupId}`);
                if (response.status === 400 || response.status === 404) {
                    router.push("/notfound");
                }

                setGroupdata(response || []);

                console.log(groupdata)


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [groupId]);

    useEffect(() => {
        async function getUserData() {
            const userdata = await fetchUserInfo("api/users/info");
            setUserdata(userdata); // Store the user data in state
        }
        getUserData();
    }, []);

   


    return (
        <div className="group-hero">
            <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />
            <Leftsidebar />
            <ChatApplication />
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

                                <Memberstatus status={groupdata?.memberstatus?.status} pop={() => setShowInvitePopup(true)} group={groupId} />

                            </div>
                        </div>
                    </div>
                </div>
                <CreateGroupPost userdata={userdata} status={groupdata?.memberstatus?.status} />
                <InvitePopup
                    groupId={groupId}
                    isOpen={showInvitePopup}
                    onClose={() => setShowInvitePopup(false)}
                />
            </div>
        </div>

    );
}

function Memberstatus({ status, pop, group }) {    
    const handleJoinGrp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/groups/request?groupId=${group}`, {
                method: 'POST', 
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }
    
            alert('Bienvenue');
        } catch {
            console.error("Error Join Group");
        }
    }

    switch (true) {
        case status === "you are not a member":
            return <>
                <button className="join-group" onClick={handleJoinGrp}>
                    Join Group
                    <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </button>
            </>
        case status === "creator" || status === "member":
            return <button onClick={pop} className='invite-members join-group'>invite members</button>


        default:
            return  <button className="join-group" onClick={handleJoinGrp}>
                Join Group
                <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </button>
    }

}

export function InvitePopup({ groupId, isOpen, onClose }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [inviteStatus, setInviteStatus] = useState({ show: false, message: '', isError: false });

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUserInfo("/api/users/followers"); // Use fetchUserInfo for consistency
            console.log(data)
            if (data && data.status !== 401) {
                console.log("00000000000", data)
                // Map API response to match expected format
                const formattedUsers = data.map(user => ({
                    id: user.Id,
                    avatar: user.Avatar,
                    name: `${user.FirstName} ${user.LastName}`, // Prefer nickName, fallback to full name
                }));
                setUsers(formattedUsers);
            } else {
                console.error("Unauthorized or invalid response");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>

        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInvite = async () => {
        if (selectedUsers.length === 0) {
            setInviteStatus({
                show: true,
                message: 'Please select at least one user to invite',
                isError: true
            });
            return;
        }

        try {
            // Replace with your actual API endpoint
            const response = await fetch(`http://localhost:8080/api/groups/${groupId}/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ users: selectedUsers })
            });

            if (response.ok) {
                setInviteStatus({
                    show: true,
                    message: 'Invitations sent successfully!',
                    isError: false
                });

                // Reset selections
                setSelectedUsers([]);

                // Auto close after success (optional)
                setTimeout(() => {
                    onClose();
                    setInviteStatus({ show: false, message: '', isError: false });
                }, 2000);
            } else {
                throw new Error('Failed to send invitations');
            }
        } catch (error) {
            console.error('Error sending invitations:', error);
            setInviteStatus({
                show: true,
                message: 'Failed to send invitations. Please try again.',
                isError: true
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="invite-popup-overlay">
            <div className="invite-popup-content">
                <button className="invite-close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <h2 className="invite-popup-title">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Invite Members
                </h2>

                <div className="invite-search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="invite-search-input"
                    />
                </div>

                {inviteStatus.show && (
                    <div className={`invite-status-message ${inviteStatus.isError ? 'error' : 'success'}`}>
                        {inviteStatus.message}
                    </div>
                )}

                <div className="invite-users-container">
                    {loading ? (
                        <div className="invite-loading">Loading users...</div>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <label key={user.id} className="invite-user-item">
                                <div className="invite-user-checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleUserSelect(user.id)}
                                        className="invite-user-checkbox"
                                    />
                                    <span className="custom-checkbox"></span>
                                </div>

                                <div className="invite-user-avatar">
                                    <img
                                        src={user.avatar ? `http://localhost:8080/images?path=${user.avatar}` : "/default-user.jpg"}
                                        alt={user.name || user.username}
                                    />
                                </div>

                                <div className="invite-user-info">
                                    <span className="invite-user-name">{user.name || user.username}</span>
                                    {user.email && <span className="invite-user-email">{user.email}</span>}
                                </div>
                            </label>
                        ))
                    ) : (
                        <div className="invite-no-results">No users found matching "{searchQuery}"</div>
                    )}
                </div>

                <div className="invite-actions">
                    <span className="invite-selected-count">
                        {selectedUsers.length} {selectedUsers.length === 1 ? 'user' : 'users'} selected
                    </span>
                    <button
                        className="invite-submit-button"
                        onClick={handleInvite}
                        disabled={selectedUsers.length === 0}
                    >
                        Send Invitations
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    );
}

