 
import { useState } from "react";

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

  const menuItems = [
    { icon: faHouse, label: "Home", href: "/content" },
    { icon: faComments, label: "Chat", href: "/chat" },
    { icon: faBell, label: "Notification", href: "/notification" },
    { icon: faUserFriends, label: "Groups", href: "/groups" },
  ];

  return (
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
            <Link key={index} href={item.href} className="nav-item">
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