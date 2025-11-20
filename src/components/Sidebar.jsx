import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { useLayout } from "../context/LayoutContext";
import { Player } from "@lordicon/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "../icons";

// Import Lordicon JSON files
import homeIcon from "./assets/Home.json";
import coursesIcon from "./assets/Courses.json";
import progressIcon from "./assets/Progress.json";
import profileIcon from "./assets/Profile.json";
import settingsIcon from "./assets/Settings.json";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { isSidebarOpen, closeSidebar, isSidebarCollapsed } = useLayout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isSidebarOpen) {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, closeSidebar]);

  const menuItems = [
    {
      path: "/dashboard",
      iconType: "animated",
      iconData: homeIcon,
      label: "Home",
    },
    {
      path: "/courses",
      iconType: "animated",
      iconData: coursesIcon,
      label: "Courses",
    },
    {
      path: "/analytics",
      iconType: "animated",
      iconData: progressIcon,
      label: "Progress",
    },
    {
      path: "/profile",
      iconType: "animated",
      iconData: profileIcon,
      label: "Profile",
    },
    {
      path: "/settings",
      iconType: "animated",
      iconData: settingsIcon,
      label: "Settings",
    },
  ];

  const isActive = (path) => location.pathname === path;

  // Icon Renderer Component
  const IconRenderer = ({ item, isActive }) => {
    const playerRef = useRef(null);

    useEffect(() => {
      if (item.iconType === "animated" && isActive) {
        playerRef.current?.playFromBeginning();
      }
    }, [isActive]);

    const handleMouseEnter = () => {
      // Only play animation on hover if not already active
      if (item.iconType === "animated" && !isActive) {
        playerRef.current?.playFromBeginning();
      }
    };

    if (item.iconType === "animated" && item.iconData) {
      return (
        <div onMouseEnter={handleMouseEnter} className="flex items-center justify-center w-6 h-6">
          <Player
            ref={playerRef}
            size={24}
            icon={item.iconData}
            colorize={isActive ? "#000000" : "#FFFFFF"}
          />
        </div>
      );
    }

    return (
      <span
        className={`text-xl ${
          isActive ? "" : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
        }`}
      >
        {item.icon}
      </span>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#010010]/95 text-white border-r border-white/10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.65)] transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarCollapsed ? "lg:w-24" : "lg:w-64"} lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div
          className={`pt-8 pb-4 border-b border-white/10 ${isSidebarCollapsed ? "px-4" : "px-6"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center text-sm font-semibold tracking-[0.3em]">
                PF
              </div>
              <div className={`${isSidebarCollapsed ? "hidden" : "flex flex-col"}`}>
                <span className="text-lg font-semibold tracking-tight">PathForge</span>
                <span className="text-[0.6rem] text-white/60 tracking-[0.4em] uppercase">
                  Premium
                </span>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/15 transition"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto ${isSidebarCollapsed ? "px-2" : "px-4"} py-8 space-y-2`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeSidebar();
                }
              }}
              className={`sidebar-link ${isActive(item.path) ? "sidebar-link-active" : ""} ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <div
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}
              >
                <IconRenderer item={item} isActive={isActive(item.path)} />
                {!isSidebarCollapsed && (
                  <span className="text-sm font-medium tracking-tight">{item.label}</span>
                )}
              </div>
              {item.badge && !isSidebarCollapsed && (
                <span className="pill bg-white/15 text-white/80">{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
