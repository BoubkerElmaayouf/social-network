import { Navbar } from "./navbar";
import { useState, useEffect, useRef } from "react";
import "./css/ChatApplication.css";
import { fetchUserInfo } from "../fetching_data";
import { useWebSocket } from "../websocket.js";
import { Send, X, Smile } from 'lucide-react';

const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

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
  const messagesContainerRef = useRef(null);
  const socket = useWebSocket();
  const [offset, setOffset] = useState(0)
  let lastOffest = 0
  const handleChat = (totas, id) => {
    const newMessages = totas.map(data => {
      if (id === data.SenderID) {
        return {
          Content: data.Content,
          sender: "other",
          senderName: activeChatuser.name,
          //timestamp: new Date().toLocaleTimeString(),
        };
      } else {
        return {
          Content: data.Content,
          sender: "self",
          senderName: "You",
          //timestamp: new Date().toLocaleTimeString(),
        };
      }
    });
    console.log(newMessages);

    setMessages((prevMessages) => [ ...newMessages, ...prevMessages]);
  }

  const fetchChatHistory = async () => {
    try {
      console.log("fetch",offset)
      const response = await fetch(`http://localhost:8080/api/chathistory?recivierID=${activeChatuser.id}&offset=${offset}`, {
        credentials: "include",
      });

      const data = await response.json();
      if (data) {
        console.log(data)
        data.reverse();
        handleChat(data, activeChatuser.id);
      }
      //setMessages(data);
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();

  }, []);

  useEffect(() => {
    if (messages.length <= 10) {
      scrollToBottom()
    }
  }, [messages])
  // useEffect(() => {
  //   if (activeChatuser.id) {
  //     fetchChatHistory();
  //   }
  // }, [Offset]);

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
  }, []);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    lastOffest = messagesEndRef.current.scrollTop
  };

  // useEffect(() => {
  //   console.log("ACTIVE USER ------------------------",activeChatuser);
  //   if (messages.length <= 10) {

  //     scrollToBottom();
  //   }
  // }, [messages]);
  useEffect(() =>  {
    console.log("new offset", offset)
    if (offset != 0) {
      fetchChatHistory()
    }
  }, [offset])

  const handleScroll = throttle((e) => {
    console.log(messagesContainerRef.current.scrollTop)
    if (messagesContainerRef.current.scrollTop <= 3) {
      console.log("here")
      setOffset((v) => v + 10);
      const currentHeight = messagesEndRef.current.scrollHeight;
      console.log("last",lastOffest,"current", currentHeight)
      // messagesEndRef.current?.scrollIntoView({top: xxx, behavior: "smooth" });
      console.log(offset)
    }
  }, 300);


  useEffect(() => {
    console.log("event start")
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        console.log("event remove");
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [messagesContainerRef]);

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

      <div className="messages-container" ref={messagesContainerRef}>
        {messages && messages?.map((message, index) => (
          <div
            key={index}
            className={`message-wrapper ${message.sender === "self" ? "message-self" : "message-other"
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
      {isChatVisible ? <Chatbox
        activeChatuser={activeChatuser}
        isVisible={isChatVisible}
        setIsVisible={setIsChatVisible}
      /> : null}
      
    </div>
  );
}
