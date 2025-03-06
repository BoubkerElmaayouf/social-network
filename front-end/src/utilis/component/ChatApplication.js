import { Navbar } from "./navbar";
import { useState, useEffect, useRef } from "react";
import "./css/ChatApplication.css";
import { fetchUserInfo } from "../fetching_data";
import { useWebSocket } from "../websocket.js";
import { Send, X, Smile } from 'lucide-react';

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
                          : "/default-img.jpg"
                      }
                      alt={`${group.Title} group avatar`}
                      className="avatar group-avatar"
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

//********************** rendering the chatbox here it takes three params *************************** //
const EMOJIS = ["😊", "😂", "🥰", "🤓", "😎", "🤔", "👍", "❤️", "✨", "🎮", "🚀", "💻", "🌟", "🔥", "💪", "🎯"];

export function Chatbox({ activeChatuser, isVisible, setIsVisible }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useWebSocket();
  let offset = 0
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
          const response = await fetch(`http://localhost:8080/api/chathistory?recivierID=${activeChatuser.id}&offset=${offset}`);
          const data = await response.json();
          console.log(data);
          
          setMessages(data); // Mettre à jour avec les messages récupérés
      } catch (error) {
          console.error("Erreur lors du chargement des messages :", error);
      }
    }
    if (activeChatuser.id) {
      fetchChatHistory();
    }
    setMessages([]);
  }, [activeChatuser.id]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "Private") {
            const message = data.data;

            if (activeChatuser.id === message.SenderID) {
              const newMsg = {
                Content: message.Content,
                sender: "other",
                senderName: activeChatuser.name,
                timestamp: new Date().toLocaleTimeString(),
              };
              setMessages((prevMessages) => [...prevMessages, newMsg]);
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [activeChatuser.id]);

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

      const displayMsg = {
        Content: newMsg.data.Content,
        sender: "self",
        senderName: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, displayMsg]);

      socket.send(JSON.stringify(newMsg));
      setNewMessage("");
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!isVisible) return null;

  return (
    <div className="chatbox">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="user-avatar">
          </div>
          <span className="user-name">{activeChatuser.name}</span>
          <button
            className="close-button"
            onClick={() => setIsVisible(false)}
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`message-wrapper ${
              message.sender === "self" ? "message-self" : "message-other"
            }`}
          >
            <div className="message">
              <span className="sender-name">{message.senderName}</span>
              <p className="message-text">{message.Content}</p>
              <span className="message-timestamp">{message.timestamp}</span>
              <div className="message-glow"></div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="emoji-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="Open emoji picker"
        >
          <Smile size={20} />
        </button>
        
        {showEmojiPicker && (
          <div className="emoji-picker">
            {EMOJIS.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className="emoji-item"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
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
          <Send size={20} />
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
