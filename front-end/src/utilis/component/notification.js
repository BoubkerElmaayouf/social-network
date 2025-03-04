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
        className={`notification-container ${
          notificationActive ? "active" : ""
        }`}
      >
        <div className="notification-tabs">
          <button
            className={`notification-tab ${
              activeTab === "group-invitation" ? "active" : ""
            }`}
            onClick={() => handleTabClick("group-invitation")}
          >
            Groups Notifications
          </button>

          <button
            className={`notification-tab ${
              activeTab === "follow-requests" ? "active" : ""
            }`}
            onClick={() => handleTabClick("follow-requests")}
          >
            Follow Requests
          </button>

          <button
            className={`notification-tab ${
              activeTab === "group-events" ? "active" : ""
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

    const elementsArray = data.map((d) => {
      if (d.Type == "") {
        let grouplink = "/group/" + d.Group.Id;
        return (
          <div key={d.Sender.Id} className="group-invitation">
            <p className="group-invitation-message">
              {d.Group.Title} is inviting you! Please check it out.
            </p>
            <Link href={grouplink} className="group-invitation-link">
              View Invitation
            </Link>
          </div>
        );
      } else {
        let name = d.Sender.FirstName + " " + d.Sender.LastName;
        return (
          <div key={d.Sender.Id} className="group-invitation">
            <p className="group-invitation-message">
              {name} want to join your group
            </p>
            <div className="notification-group-actions">
              <button className="group-action-btn attend-btn">Attend</button>
              <button className="group-action-btn ignore-btn">Ignore</button>
            </div>
          </div>
        );
      }
    });

    setElements(elementsArray); // Set the array of JSX elements to the state
  };

  useEffect(() => {
    if (activeTab === "group-invitation") {
      async function FetchData() {
        const result = await FetchNotif("group-invitation");
        console.log(result);

        addElement(result);
      }
      FetchData();
    }
  }, [activeTab]);

  return (
    <div
      className={`tab-panel ${
        activeTab === "group-invitation" ? "active" : ""
      }`}
      id="group-invitation"
    >
      <div className="notification-divider">{elements} </div>
    </div>
  );
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
    if (activeTab === "follow-requests") {
      async function FetchData() {
        try {
          const result = await FetchNotif("follow-requests");
          addElement(result);
          console.log(result);
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
      className={`tab-panel ${activeTab === "group-events" ? "active" : ""}`}
      id="group-events"
    >
      {elements}{" "}
    </div>
  );
}

async function FetchNotif(type) {
  let url = "http://localhost:8080/api/notif/";

  switch (type) {
    case "group-invitation":
      url += "invitations";
      break;
    case "follow-requests":
      url += "requestuser";
      break;
    case "group-events":
      url += "event";
      break;
    default:
      return undefined;
  }

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