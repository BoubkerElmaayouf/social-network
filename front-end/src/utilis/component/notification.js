"use client";

import Link from "next/link.js";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export function Notification({ notificationRef, notificationActive }) {
    const [activeTab, setActiveTab] = useState("group-invitation");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <>
            <div
                ref={notificationRef}
                className={`notification-container ${notificationActive ? "active" : ""
                    }`}
            >
                <div className="notification-tabs">
                    <button
                        className={`notification-tab ${activeTab === "group-invitation" ? "active" : ""
                            }`}
                        onClick={() => handleTabClick("group-invitation")}
                    >
                        Groups Notifications
                    </button>

                    <button
                        className={`notification-tab ${activeTab === "follow-requests" ? "active" : ""
                            }`}
                        onClick={() => handleTabClick("follow-requests")}
                    >
                        Follow Requests
                    </button>

                    <button
                        className={`notification-tab ${activeTab === "group-events" ? "active" : ""
                            }`}
                        onClick={() => handleTabClick("group-events")}
                    >
                        Group Events
                    </button>
                </div>
                <div className="notification-content">
                    <GroupsNotif activeTab={activeTab} />
                    <FollowRequest activeTab={activeTab} />
                    <GroupsEvent activeTab={activeTab} />
                </div>
            </div>
        </>
    );
}



export function GroupsNotif({ activeTab }) {
    const [elements, setElements] = useState([]);

    const addElement = (data) => {
        if (!Array.isArray(data)) return;

        setElements((prevElements) => {
            const existingKeys = new Set(prevElements.map((el) => el.key));
            const newElements = data
                .filter((d) => d?.Sender?.Id && d?.Group?.Id) // Ensure valid structure
                .map((d) => {
                    const key = `${d.Sender.Id}-${d.Type}`;
                    if (existingKeys.has(key)) return null; // Prevent duplicates

                    if (d.Type === "groupInvitation") {
                        let grouplink = "/group/" + d.Group.Id;
                        return (
                            <div key={key} className="group-invitation">
                                <p className="group-invitation-message">
                                    {d.Group.Title} is inviting you! Please check it out.
                                </p>
                                <Link href={grouplink} className="group-invitation-link">
                                    View Invitation
                                </Link>
                            </div>
                        );
                    } else {
                        console.log(d);

                        let name = `${d.Sender.FirstName} ${d.Sender.LastName}`;

                        let status;

                        if (d.Accepted === true) {
                            status = <p className="accepted-message">✅ Request Accepted</p>
                        } else {
                            status = <div className="notification-group-actions">
                                <button className="group-action-btn attend-btn"
                                    onClick={() => AcceptRejectRequest(1, d.Group.Id, d.Sender.Id)}>Accept</button>
                                <button className="group-action-btn ignore-btn"
                                    onClick={() => AcceptRejectRequest(2, d.Group.Id, d.Sender.Id)}>Ignore</button>
                            </div>
                        }
                        return (
                            <div key={key} className="group-invitation">
                                <p className="group-invitation-message">
                                    {name} wants to join your group {d.Group.Title}.
                                </p>
                                {status}
                            </div>
                        );


                    }
                })
                .filter(Boolean); // Remove null values

            return [...prevElements, ...newElements];
        });
    };

    useEffect(() => {
        if (activeTab === "group-invitation") {
            async function FetchData() {
                try {
                    const result = (await FetchNotif("invitations")) || [];
                    const result1 = (await FetchNotif("requestgroup")) || [];
                    const combinedResults = [...result, ...result1];

                    console.log("Concatenated results:", combinedResults);
                    addElement(combinedResults);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }

            FetchData();
        } else {
            setElements([]); // Clear notifications when switching tabs
        }
    }, [activeTab]);

    return (
        <div className={`tab-panel ${activeTab === "group-invitation" ? "active" : ""}`} id="group-invitation">
            <div className="notification-divider">{elements}</div>
        </div>
    );
}

async function AcceptRejectRequest(type, groupId, target) {
    let url = ""
    if (type == 1) {
        url = `http://localhost:8080/api/groups/acceptrequest?groupId=${groupId}&target=${target}`;
    } else {
        url = `http://localhost:8080/api/groups/rejectrequest?groupId=${groupId}&target=${target}`;
    }


    console.log(url);

    try {
        let response = await fetch(url, { credentials: "include" });

        console.log(response.status);


        if (response.status === 401) {
            // useNavigate("/register"); // Uncomment if using React Router
            return;
        }

        if (response.status !== 200) {
            console.warn("Request failed with status:", response.status);
            return;
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}


export function FollowRequest({ activeTab }) {
    const [elements, setElements] = useState([]);

    const addElement = (data) => {
        if (!Array.isArray(data)) return;

        const elementsArray = data.map((d) => {
            d.Path = "/" + d.Path;
            let profile = "/profile/" + d.Sender.Id;
            let name = d.Sender.FirstName + " " + d.Sender.LastName;

            return (
                <div key={d.Sender.Id} className="follow-request">
                    <div className="follow-avatar">
                        <div className="follow-avatar-placeholder">
                            <img
                                className="follow-avatar"
                                src={d.Sender.Path}
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                    <div className="follow-info">
                        <div className="follow-name">{name}</div>
                        <div className="follow-username">{d.Sender.Nickname}</div>
                    </div>
                    <Link href={profile} className="visit-account">
                        Visit
                    </Link>
                </div>
            );
        });
        setElements(elementsArray); // Set the array of JSX elements to the state
    };

    useEffect(() => {
        if (activeTab === "follow-requests") {
            async function FetchData() {
                try {
                    const result = await FetchNotif("follow-requests");
                    addElement(result);
                } catch (error) {
                    console.error("Error fetching follow requests:", error);
                }
            }
            FetchData();
        } else {
            setElements([]); // Reset the elements array when the tab changes
        }
    }, [activeTab]);

    return (
        <div
            className={`tab-panel ${activeTab === "follow-requests" ? "active" : ""}`}
        >
            {elements}{" "}
        </div>
    );
}

export default function GroupsEvent({ activeTab }) {
    const [elements, setElements] = useState([]);

    const addElement = (data) => {
        if (!Array.isArray(data)) return;

        const elementsArray = data.map((d) => {
            let name = d.Sender.FirstName + " " + d.Sender.LastName;
            let grouplink = "/group/" + d.Group.Id;
            return (
                <div key={d.Sender.Id} className="notification-group-event">
                    <div className="notification-group-image">
                        {/* Placeholder for group image */}
                    </div>
                    <div className="notification-group-info">
                        <div className="notification-group-name">{d.Group.Title}</div>
                        <div className="notification-group-event-type">{name}</div>
                        <div className="notification-group-actions">
                            <Link href={grouplink} className="group-invitation-link">
                                View Invitation
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
        setElements(elementsArray); // Set the array of JSX elements to the state
    };

    useEffect(() => {
        // if (activeTab === "follow-requests") {
        //     // async function FetchData() {
        //     //     try {
        //     //         //const result = await FetchNotif("follow-requests");
        //     //         addElement(result);

        //     //     } catch (error) {
        //     //         console.error("Error fetching follow requests:", error);
        //     //     }
        //     // }
        //     // FetchData();
        // } else {
        //     setElements([]); // Reset the elements array when the tab changes
        // }
    }, [activeTab]);

    return (
        <div
            className={`tab-panel ${activeTab === "group-events" ? "active" : ""}`}
            id="group-events"
        >
            {elements}{" "}
        </div>
    );
}

async function FetchNotif(type) {
    let url = "http://localhost:8080/api/notif/" + type;


    try {
        let response = await fetch(url, {
            credentials: "include",
        });
        console.log("--------->", response.status);

        if (response.status === 401) {
            //   useNavigate("/register");
            return undefined;
        }
        console.log("res", response);
        if (response.status !== 200) {
            return undefined;
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return undefined;
    }
}