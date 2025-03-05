import { Navbar } from "./navbar";
import { useState, useEffect, useRef } from "react";
import "./css/ChatApplication.css";
import { fetchUserInfo } from "../fetching_data";
import { useWebSocket } from "../websocket.js";

// ***************** this func is for rendering the right side-bar **************//
export function Rightsidebar({ isMobileOpen, onFriendClick, onGroupClick }) {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendsResponse, groupsResponse] = await Promise.all([
          fetchUserInfo(`api/users/userfollowers?profileId=0`),
          fetchUserInfo(`api/groups/getall`),
        ]);

        setFriends(friendsResponse);
        setGroups(groupsResponse);

        console.log("Friends:", friendsResponse);
        console.log("Groups:", groupsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className={`right-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
      <div className="right-sidebar-content">
        <div className="right-sidebar-section">
          <h3 className="section-title">Friends</h3>
          <div className="friends-container scrollable-container">
            {friends &&
              friends.map((friend) => (
                <div
                  key={friend.Id}
                  className="sidebar-item"
                  onClick={() => onFriendClick(friend.Id, friend.FirstName)}
                >
                  <div className="avatar-container">
                    <img
                      src={
                        friend?.Avatar
                          ? `http://localhost:8080/images?path=${friend.Avatar}`
                          : "/default-avatar.svg"
                      }
                      alt={`${friend.FirstName}'s avatar`}
                      className="avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-img.jpg";
                      }}
                    />
                    {/* <span className={`status-indicator ${friend.status}`}></span> */}
                  </div>
                  <span className="item-name">
                    {friend.FirstName + " " + friend.LastName}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="right-sidebar-section">
          <h3 className="section-title">Groups</h3>
          <div className="groups-container scrollable-container">
            {groups &&
              groups.map((group) => (
                <div
                  key={group.Id}
                  className="sidebar-item"
                  onClick={() => onGroupClick(group.Title, group.Id)}
                >
                  <div className="avatar-container">
                    <img
                      src={
                        group?.Path
                          ? `http://localhost:8080/images?path=${group.Path}`
                          : "/default-avatar.svg"
                      }
                      alt={`${group.Title} group avatar`}
                      className="avatar group-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/groups/default.jpg";
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{group.Title}</span>
                    <span className="item-meta">
                      {group.MemberCount} members
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

//******************** rendering the chatbox here it takes three params *************************//

export function Chatbox({ activeChatuser, isVisible, setIsVisible }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);
          console.log(activeChatuser)


  
          if (data.type === "Private") {
            const message = data.data;
            const newMsg = {
              Content: message.Content,
              sender: "other",
            };
            setMessages((prevMessages) => [...prevMessages, newMsg]);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
  
      socket.addEventListener("message", handleMessage);
  
      return () => {
        socket.removeEventListener("message", handleMessage); // Cleanup the listener
      };
    }
  }, [socket]);
  

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
        type: "Private",
        data: {
          ReceiverID: activeChatuser.id,
          Content: newMessage,
        },
      };

      // Add the message to local state
      const displayMsg = {
        Content: newMsg.data.Content,
        sender: "self",
      };
      setMessages([...messages, displayMsg]);

      // Send via WebSocket following backend structure
      socket.send(JSON.stringify(newMsg));

      setNewMessage("");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="chatbox">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="user-avatar">
            <span className="user-status"></span>
          </div>
          <span className="user-name">{activeChatuser.name}</span>
          <button
            className="closet-button"
            onClick={() => setIsVisible(false)}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`message-wrapper ${
              message.sender === "self" ? "message-self" : "message-other"
            }`}
          >
            <div className="message">
              <p className="message-text">{message.Content}</p>
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
// **** this is the main function for both the right side-bar and the chatbox ****//
export function ChatApplication() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [activeChatuser, setActiveChatuser] = useState({ id: 0, name: "" });
  const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] =
    useState(false);

  const handleFriendClick = (ID, Name) => {
    setActiveChatuser({ id: ID, name: Name });
    setIsChatVisible(true);
    // Close mobile sidebar after selection on mobile devices
    setIsMobileRightSidebarOpen(false);
  };

  const handleGroupClick = (groupName) => {
    setActiveChatuser(groupName);
    setIsChatVisible(true);
    // Close mobile sidebar after selection on mobile devices
    setIsMobileRightSidebarOpen(false);
  };

  return (
    <div className="chat-application">
      <Navbar setIsMobileRightSidebarOpen={setIsMobileRightSidebarOpen} />

      <Rightsidebar
        isMobileOpen={isMobileRightSidebarOpen}
        onFriendClick={handleFriendClick}
        onGroupClick={handleGroupClick}
      />

      <Chatbox
        activeChatuser={activeChatuser}
        isVisible={isChatVisible}
        setIsVisible={setIsChatVisible}
      />
    </div>
  );
}
