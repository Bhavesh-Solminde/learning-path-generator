import { useRef } from "react";
import { Player } from "@lordicon/react";
import { useLayout } from "../context/LayoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import searchIcon from "./assets/Search.json";
import messageIcon from "./assets/Message.json";
import notificationIcon from "./assets/Notification.json";

const PageHeader = ({ title, onProfileClick, showProfileButton = true }) => {
  const { toggleSidebar } = useLayout();
  // Refs for animated icons
  const searchIconRef = useRef(null);
  const messageIconRef = useRef(null);
  const notificationIconRef = useRef(null);

  return (
    <div className="bg-navbar border-b border-navbar-light px-4 md:px-8 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu - Only visible on mobile/tablet */}
        <button
          className="lg:hidden p-2 hover:bg-navbar-light rounded-lg transition-all duration-300"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-white text-xl" />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-white">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search Bar - Hidden on mobile */}
        <div className="relative hidden md:flex items-center">
          <div className="absolute left-3 pointer-events-none">
            <Player
              ref={searchIconRef}
              icon={searchIcon}
              size={20}
              colorize="rgb(0, 153, 255)"
            />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            aria-label="Search"
            className="pl-10 pr-4 py-2 bg-navbar-light/50 border border-navbar-light rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>

        {/* Message Icon */}
        <button
          className="p-2 hover:bg-navbar-light rounded-xl transition-all duration-300 ease-in-out icon-hover"
          onMouseEnter={() => messageIconRef.current?.playFromBeginning()}
          aria-label="Messages"
        >
          <Player
            ref={messageIconRef}
            icon={messageIcon}
            size={24}
            colorize="rgb(0, 153, 255)"
          />
        </button>

        {/* Notification Icon */}
        <button
          className="p-2 hover:bg-navbar-light rounded-xl transition-all duration-300 ease-in-out icon-hover"
          onMouseEnter={() => notificationIconRef.current?.playFromBeginning()}
          aria-label="Notifications"
        >
          <Player
            ref={notificationIconRef}
            icon={notificationIcon}
            size={24}
            colorize="rgb(0, 153, 255)"
          />
        </button>

        {/* Profile Button */}
        {showProfileButton && (
          <button
            className="p-2 hover:bg-navbar-light rounded-xl transition-all duration-300 ease-in-out"
            onClick={onProfileClick}
            aria-label="Open profile details"
            title="Profile"
          >
            <img
              src="https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=FF6600&color=fff&size=80"
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-gold hover:ring-4 transition-all duration-300"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
