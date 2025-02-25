import { Navbar } from "./navbar";
import { useState, useEffect, useRef } from "react";
import "./css/ChatApplication.css"

// ***************** this func is for rendering the right side-bar **************//
export function Rightsidebar({ isMobileOpen, onFriendClick, onGroupClick }) {
    const friends = [
      {
        id: 1,
        name: "the dude 777",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "online",
      },
      {
        id: 2,
        name: "kamal dada",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "offline",
      },
      {
        id: 3,
        name: "take controle",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "offline",
      },
      {
        id: 4,
        name: "hohouz mohamed",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "online",
      },
      {
        id: 5,
        name: "ahmed",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "online",
      },
      {
        id: 6,
        name: "banan",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "online",
      },
      {
        id: 7,
        name: "l7mar",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        status: "offline",
      },
    ];
  
    const groups = [
      {
        id: 1,
        name: "zone01 anounce",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        memberCount: 8,
      },
      {
        id: 2,
        name: "tach tach",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        memberCount: 5,
      },
      {
        id: 3,
        name: "tach tachh666",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        memberCount: 12,
      },
      {
        id: 4,
        name: "tatatatat",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        memberCount: 6,
      },
      {
        id: 5,
        name: "takakakaka",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        memberCount: 9,
      },
    ];
  
    return (
      <aside className={`right-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="right-sidebar-content">
          <div className="right-sidebar-section">
            <h3 className="section-title">Friends</h3>
            <div className="friends-container scrollable-container">
              {friends.map((friend) => (
                <div 
                  key={friend.id} 
                  className="sidebar-item" 
                  onClick={() => onFriendClick(friend.name)}
                >
                  <div className="avatar-container">
                    <img
                      src={friend.avatar}
                      alt={`${friend.name}'s avatar`}
                      className="avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/avatars/default.jpg";
                      }}
                    />
                    <span className={`status-indicator ${friend.status}`}></span>
                  </div>
                  <span className="item-name">{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="right-sidebar-section">
            <h3 className="section-title">Groups</h3>
            <div className="groups-container scrollable-container">
              {groups.map((group) => (
                <div 
                  key={group.id} 
                  className="sidebar-item"
                  onClick={() => onGroupClick(group.name)}
                >
                  <div className="avatar-container">
                    <img
                      src={group.avatar}
                      alt={`${group.name} group avatar`}
                      className="avatar group-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/groups/default.jpg";
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <span className="item-name">{group.name}</span>
                    <span className="item-meta">{group.memberCount} members</span>
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
  
  export function Chatbox({ activeChatName, isVisible, setIsVisible }) {
    const [messages, setMessages] = useState([
      {
        id: 1,
        text: "Hey, how's it going?",
        sender: "other",
        timestamp: "09:41",
      },
      {
        id: 2,
        text: "Pretty good! Working on some new features.",
        sender: "self",
        timestamp: "09:42",
      },
      {
        id: 3,
        text: "That sounds interesting! Can you tell me more about it?",
        sender: "other",
        timestamp: "09:43",
      },
    ]);
    const [newMessage, setNewMessage] = useState("");
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
          sender: "self",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        };
        setMessages([...messages, newMsg]);
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
            <span className="user-name">{activeChatName}</span>
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender === "self" ? "message-self" : "message-other"}`}
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
  // **** this is the main function for both the right side-bar and the chatbox ****//
  export function ChatApplication() {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [activeChatName, setActiveChatName] = useState("");
    const [isMobileRightSidebarOpen, setIsMobileRightSidebarOpen] = useState(false);
  
    const handleFriendClick = (friendName) => {
      setActiveChatName(friendName);
      setIsChatVisible(true);
      // Close mobile sidebar after selection on mobile devices
      setIsMobileRightSidebarOpen(false);
    };
  
    const handleGroupClick = (groupName) => {
      setActiveChatName(groupName);
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
          activeChatName={activeChatName}
          isVisible={isChatVisible}
          setIsVisible={setIsChatVisible}
        />
      </div>
    );
  }