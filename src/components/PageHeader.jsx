import { useRef } from "react";
import { Player } from "@lordicon/react";
import { useLayout } from "../context/LayoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowsAlt } from "../icons";
import searchIcon from "./assets/Search.json";
import messageIcon from "./assets/Message.json";
import notificationIcon from "./assets/Notification.json";

const PageHeader = ({ title, showActions = true }) => {
  const { toggleSidebar, headerActions, toggleSidebarCollapsed, isSidebarCollapsed } = useLayout();
  const { onProfileClick, showProfileButton } = headerActions;
  // Refs for animated icons
  const searchIconRef = useRef(null);
  const messageIconRef = useRef(null);
  const notificationIconRef = useRef(null);

  return (
    <div className="glass-nav px-4 md:px-8 py-4 flex items-center justify-between shadow-glass">
      <div className="flex items-center space-x-3">
        {/* Hamburger Menu - Only visible on mobile/tablet */}
        <button
          className="lg:hidden h-11 w-11 rounded-2xl border border-white/10 bg-white/10 text-white/80 hover:bg-white/20 transition"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} className="text-lg" />
        </button>
        <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-white">{title}</h1>
      </div>
      {showActions && (
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            type="button"
            className="hidden lg:flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
            onClick={toggleSidebarCollapsed}
            aria-pressed={isSidebarCollapsed}
          >
            <FontAwesomeIcon icon={faArrowsAlt} className="text-sm" />
            {isSidebarCollapsed ? "Expand" : "Collapse"}
          </button>
          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden md:flex items-center">
            <div className="absolute left-3 pointer-events-none">
              <Player ref={searchIconRef} icon={searchIcon} size={20} colorize="#ffffff" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              aria-label="Search"
              className="input-field pl-11 pr-4 py-2.5 rounded-full"
            />
          </div>
          {[
            { ref: messageIconRef, icon: messageIcon, label: "Messages" },
            { ref: notificationIconRef, icon: notificationIcon, label: "Notifications" },
          ].map((cta) => (
            <button
              key={cta.label}
              className="h-11 w-11 rounded-xl border border-white/10 bg-white/10 text-white/80 shadow-outline backdrop-blur hover:bg-white/20 transition hover:-translate-y-0.5"
              onMouseEnter={() => cta.ref.current?.playFromBeginning()}
              aria-label={cta.label}
            >
              <Player ref={cta.ref} icon={cta.icon} size={24} colorize="#ffffff" />
            </button>
          ))}

          {/* Profile Button */}
          {showProfileButton && (
            <button
              className="p-1.5 border border-white/10 bg-white/10 rounded-2xl hover:bg-white/20 transition"
              onClick={onProfileClick}
              aria-label="Open profile details"
              title="Profile"
            >
              <img
                src="https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=FF6600&color=fff&size=80"
                alt="User"
                className="w-9 h-9 rounded-full ring-2 ring-white/30"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
