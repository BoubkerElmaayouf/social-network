import { useState, useEffect, useRef } from 'react';
import Link from "next/link.js";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Prevents FOUC
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faComments,
  faBell,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import "./css/leftsidebar.css"


//****** leftsidebar that containes the navigation and it 
//* displays in both sides leftside for large devices and in the bottom for small devices  *******/



export function Leftsidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [notificationActive, setNotificationActive] = useState(false);
  const [activeTab, setActiveTab] = useState('group-invitation');
  const notificationRef = useRef(null);
  const notificationBtnRef = useRef(null);

  const menuItems = [
    { icon: faHouse, id: "home-btn", label: "Home", href: "/content" },
    { icon: faComments, id: "chat-btn", label: "Chat", href: "/chat" },
    { icon: faBell, id: "notification-btn", label: "Notification", href: "#" },
    { icon: faUserFriends, id: "group-btn", label: "Groups", href: "/groups" },
  ];

  // Handle click outside to close notification
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target) &&
        notificationBtnRef.current && 
        !notificationBtnRef.current.contains(event.target)
      ) {
        setNotificationActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    setNotificationActive(!notificationActive);
  };

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <button
            className="collapse-button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`collapse-icon ${isCollapsed ? "rotated" : ""}`}
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
              item.id === "notification-btn" ? (
                <a 
                  key={index} 
                  href="#" 
                  className="nav-item"
                  onClick={handleNotificationClick}
                  ref={notificationBtnRef}
                >
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                  <span id={item.id} className="nav-label">{item.label}</span>
                  <div className="nav-glow"></div>
                </a>
              ) : (
                <Link key={index} href={item.href} className="nav-item">
                  <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                  <span id={item.id} className="nav-label">{item.label}</span>
                  <div className="nav-glow"></div>
                </Link>
              )
            ))}
          </nav>
        </div>
      </aside>

      {/* Notification Container */}
      <div ref={notificationRef} className={`notification-container ${notificationActive ? 'active' : ''}`}>
        <div className="notification-tabs">
          <button 
            className={`notification-tab ${activeTab === 'group-invitation' ? 'active' : ''}`} 
            onClick={() => handleTabClick('group-invitation')}
          >
            Group Invitation
          </button>
          <button 
            className={`notification-tab ${activeTab === 'follow-requests' ? 'active' : ''}`} 
            onClick={() => handleTabClick('follow-requests')}
          >
            Follow Requests
          </button>
          <button 
            className={`notification-tab ${activeTab === 'group-events' ? 'active' : ''}`} 
            onClick={() => handleTabClick('group-events')}
          >
            Group Events
          </button>
        </div>
        <div className="notification-content">
          <div className={`tab-panel ${activeTab === 'group-invitation' ? 'active' : ''}`} id="group-invitation">
            <div className='notification-divider'>
            <div className="group-invitation">
              <p className="group-invitation-message">The group is inviting you! Please check it out.</p>
              <a href="#" className="group-invitation-link">View Invitation</a>
            </div>

            <div className="group-invitation">
              <p className="group-invitation-message">The group is inviting you! Please check it out.</p>
              <a href="#" className="group-invitation-link">View Invitation</a>
            </div>
            </div>
 
          </div>
          <div className={`tab-panel ${activeTab === 'follow-requests' ? 'active' : ''}`} id="follow-requests">
            <div className="follow-request">
              <div className="follow-avatar">
                <div className="follow-avatar-placeholder">
                  <img className='follow-avatar' 
                  src="/default-img.jpg" 
                  alt="User Avatar" />
                </div>
              </div>
              <div className="follow-info">
                <div className="follow-name">User Name</div>
                <div className="follow-username">@username</div>
              </div>
              <Link href="/profile" className="visit-account">
              Visit
              </Link>
            </div>
            <div className="follow-request">
              <div className="follow-avatar">
                <div className="follow-avatar-placeholder">
                <img className='follow-avatar' 
                  src="/default-img.jpg" 
                  alt="User Avatar" />
                </div>
              </div>
              <div className="follow-info">
                <div className="follow-name">Jane Smith</div>
                <div className="follow-username">@janesmith</div>
              </div>
              <Link href="/profile" className="visit-account">
              Visit
              </Link>
            </div>
          </div>
          <div className={`tab-panel ${activeTab === 'group-events' ? 'active' : ''}`} id="group-events">
            <div className="notification-group-event">
              <div className="notification-group-image">
                {/* Placeholder for group image */}
              </div>
              <div className="notification-group-info">
                <div className="notification-group-name">Gaming Group</div>
                <div className="notification-group-event-type">Weekend Tournament</div>
                <div className="notification-group-actions">
                  <button className="group-action-btn attend-btn">Attend</button>
                  <button className="group-action-btn ignore-btn">Ignore</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export function Leftsidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const menuItems = [
//     { icon: faHouse, id: "home-btn", label: "Home", href: "/content" },
//     { icon: faComments, id: "chat-btn", label: "Chat", href: "/chat" },
//     { icon: faBell,  id: "notification-btn",label: "Notification", href: "/notification" },
//     { icon: faUserFriends ,id: "group-btn" , label: "Groups", href: "/groups" },
//   ];

//   return (
//     <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-content">
//         <button
//           className="collapse-button"
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 20 20"
//             fill="none"
//             className={`collapse-icon ${isCollapsed ? "rotated" : ""}`}
//           >
//             <path
//               d="M15 7L10 12L5 7"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>

//         <nav className="sidebar-nav">
//           {menuItems.map((item, index) => (
//             <Link key={index} href={item.href} className="nav-item">
//               <FontAwesomeIcon icon={item.icon} className="nav-icon" />
//               <span id={item.id} className="nav-label">{item.label}</span>
//               <div className="nav-glow"></div>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// }