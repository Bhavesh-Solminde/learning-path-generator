import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

// Import Lordicon JSON files
import homeIcon from "./assets/Home.json";
import coursesIcon from "./assets/Courses.json";
import progressIcon from "./assets/Progress.json";
import profileIcon from "./assets/Profile.json";
import settingsIcon from "./assets/Settings.json";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        <div
          onMouseEnter={handleMouseEnter}
          className="flex items-center justify-center w-6 h-6"
        >
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
          isActive
            ? ""
            : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
        }`}
      >
        {item.icon}
      </span>
    );
  };

  return (
    <div className="bg-navbar h-screen w-64 fixed left-0 top-0 shadow-lg border-r border-navbar-light flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-navbar-light">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">PF</span>
          </div>
          <span className="text-xl font-bold text-white">PathForge</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-primary"
                : "text-gray-300 hover:bg-navbar-light hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconRenderer item={item} isActive={isActive(item.path)} />
              <span
                className={`font-medium ${
                  isActive(item.path) ? "font-semibold text-navbar" : ""
                }`}
              >
                {item.label}
              </span>
            </div>
            {item.badge && (
              <span className="bg-gold text-navbar text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
