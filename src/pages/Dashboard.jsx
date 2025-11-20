import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPenNib,
  faCode,
  faBook,
  faClock,
  faStar,
  faTrophy,
  faXmark,
  faBell,
  faFire,
  faSearch,
  faArrowsAlt,
} from "../icons";
import { Player } from "@lordicon/react";
import PageSurface from "../components/PageSurface";
import fireIcon from "../components/assets/Fire.json";
import targetIcon from "../components/assets/Target.json";
import medalIcon from "../components/assets/Medal.json";
import booksIcon from "../components/assets/Books.json";
import checkIcon from "../components/assets/Check.json";

const Dashboard = () => {
  const { currentUser: user } = useAuthContext();
  const { setHeaderActions, resetHeaderActions, toggleSidebarCollapsed, isSidebarCollapsed } =
    useLayout();
  const [continueLearning, setContinueLearning] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [userStats, setUserStats] = useState({
    daysStreak: 0,
    goalsInMonth: 0,
    position: 0,
    coursesInProgress: 0,
    coursesCompleted: 0,
  });
  const [weeklyStreak, setWeeklyStreak] = useState([]);
  const [weeklyWatchTime, setWeeklyWatchTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Refs for animated icons
  const fireRef = useRef(null);
  const targetRef = useRef(null);
  const medalRef = useRef(null);
  const booksRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleProfilePanelToggle = useCallback(() => {
    setIsRightSidebarOpen((value) => !value);
  }, []);

  useEffect(() => {
    setHeaderActions({
      showProfileButton: true,
      onProfileClick: handleProfilePanelToggle,
    });

    return () => resetHeaderActions();
  }, [handleProfilePanelToggle, resetHeaderActions, setHeaderActions]);

  const fetchDashboardData = async () => {
    // Mock data matching PathForge design
    setContinueLearning([
      {
        id: 1,
        title: "Advance UI/UX Design",
        category: "DESIGN",
        icon: <FontAwesomeIcon icon={faPenNib} />,
        lessonsTotal: 40,
        lessonsCompleted: 18,
        timeLeft: "2 hours left",
        progress: 45,
        color: "bg-orange-500",
      },
      {
        id: 2,
        title: "Basic Web Development",
        category: "DEVELOPMENT",
        icon: <FontAwesomeIcon icon={faCode} />,
        lessonsTotal: 40,
        lessonsCompleted: 18,
        timeLeft: "2 hours left",
        progress: 45,
        color: "bg-orange-500",
      },
    ]);

    setRecommendedCourses([
      {
        id: 1,
        title: "Webflow Tutorial: Build Your First Portfolio Website In a Minute",
        instructor: "Adam Smith",
        rating: 4.7,
        reviews: 32,
        price: 12.99,
        thumbnail:
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&h=300&fit=crop",
        duration: "9:32",
        isBestseller: true,
      },
      {
        id: 2,
        title: "Basic To Advance Design System With UX Strategies",
        instructor: "Scott Warden",
        rating: 4.7,
        reviews: 540,
        price: 49.99,
        thumbnail:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&h=300&fit=crop",
        duration: "9:32",
      },
      {
        id: 3,
        title: "Advanced React Patterns & Best Practices",
        instructor: "Sarah Johnson",
        rating: 4.9,
        reviews: 128,
        price: 34.99,
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
        duration: "12:45",
      },
      {
        id: 4,
        title: "Complete Guide to Modern JavaScript",
        instructor: "Mike Chen",
        rating: 4.8,
        reviews: 256,
        price: 29.99,
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
        duration: "15:20",
      },
    ]);

    setUserStats({
      daysStreak: 54,
      goalsInMonth: 6,
      position: 2,
      coursesInProgress: 3,
      coursesCompleted: 17,
    });

    // Weekly streak calendar
    const today = new Date();
    const weekDays = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      weekDays.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        hasActivity: i <= 3, // Last 4 days have activity
        isToday: i === 0,
      });
    }
    setWeeklyStreak(weekDays);

    // Weekly watch time
    setWeeklyWatchTime([
      { hours: 2, label: "2hrs" },
      { hours: 4, label: "4hrs" },
      { hours: 6, label: "6hrs" },
      { hours: 8, label: "8hrs" },
    ]);

    setLoading(false);
  };

  const totalWatchHours = weeklyWatchTime.reduce((sum, item) => sum + (item?.hours || 0), 0);
  const focusScore = Math.min(99, 68 + (userStats.daysStreak % 32));
  const premiumStats = [
    {
      label: "Weekly Velocity",
      value: `${totalWatchHours}h`,
      trend: "+14%",
      positive: true,
    },
    {
      label: "Focus Score",
      value: focusScore,
      trend: focusScore > 90 ? "+3%" : "-2%",
      positive: focusScore > 85,
    },
    {
      label: "Modules Cleared",
      value: userStats.coursesCompleted,
      trend: `Target: ${userStats.coursesCompleted + userStats.coursesInProgress}`,
      positive: true,
    },
  ];
  const heroCourse = continueLearning[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageSurface className="text-zinc-200">
      {isRightSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsRightSidebarOpen(false)}
        ></div>
      )}

      <div className="flex flex-col lg:flex-row">
        <div
          className={`flex-1 min-h-screen flex flex-col bg-gradient-to-b from-black/20 to-transparent ${
            isRightSidebarOpen ? "hidden lg:flex" : "flex"
          }`}
        >
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-black/30 backdrop-blur-xl sticky top-0 z-20">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-lg group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-300 transition-colors">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  placeholder="Search documentation, labs, or mentors..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/30"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] border border-white/10 text-white/60 rounded px-2 py-0.5">
                  ⌘K
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 transition"
                onClick={toggleSidebarCollapsed}
                aria-pressed={isSidebarCollapsed}
              >
                <FontAwesomeIcon icon={faArrowsAlt} />
                {isSidebarCollapsed ? "Expand Nav" : "Collapse Nav"}
              </button>
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 text-xs font-semibold tracking-wide">
                <FontAwesomeIcon icon={faStar} /> Daily Briefing
              </button>
              <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Operational
              </div>
              <button
                className="relative text-zinc-500 hover:text-white transition-colors"
                type="button"
              >
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-rose-500 rounded-full border border-black"></span>
              </button>
              <button
                className="lg:hidden px-3 py-1.5 rounded-full border border-white/10 text-xs"
                type="button"
                onClick={handleProfilePanelToggle}
              >
                Insights
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
            <div className="max-w-6xl mx-auto space-y-8">
              {heroCourse && (
                <div className="relative rounded-3xl overflow-hidden min-h-[320px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] group">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
                      alt="Hero"
                      className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full gap-6 max-w-3xl">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono tracking-[0.2em] text-white/80 uppercase backdrop-blur-md">
                          Active Simulation
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase backdrop-blur-md">
                          In Progress
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
                        {heroCourse.title}
                      </h1>
                      <p className="text-base text-white/70 max-w-xl">
                        Master the fundamentals of {heroCourse.category.toLowerCase()} with our
                        comprehensive simulation.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faClock} className="text-indigo-400" />{" "}
                          {heroCourse.timeLeft}
                        </span>
                        <span className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faBook} className="text-indigo-400" />
                          {heroCourse.lessonsCompleted}/{heroCourse.lessonsTotal} lessons
                        </span>
                      </div>

                      <div className="flex-1 w-full sm:w-auto sm:min-w-[200px]">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/80 font-medium">Progress</span>
                          <span className="text-white font-bold">{heroCourse.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            style={{ width: `${heroCourse.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <button className="btn-primary px-8 py-3 text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        Resume Learning
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {premiumStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-2xl shadow-lg hover:bg-white/10 transition-colors duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {stat.label}
                      </span>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${
                          stat.positive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {stat.positive ? "↑" : "↓"} {stat.trend}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform origin-left duration-300">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white tracking-tight">
                      Active Simulations
                    </h2>
                    <button className="text-xs text-white/50 hover:text-white" type="button">
                      View all
                    </button>
                  </div>
                  <div className="space-y-6">
                    {continueLearning.map((course) => (
                      <div
                        key={course.id}
                        className="group bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 backdrop-blur-2xl hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <div className="w-full md:w-24 h-24 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 flex items-center justify-center text-3xl text-white/80 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {course.icon}
                        </div>
                        <div className="flex-1 flex flex-col justify-center space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
                                  {course.category}
                                </p>
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                {course.title}
                              </h3>
                            </div>
                            <button className="btn-ghost text-xs border border-white/10 hover:border-white/30">
                              Resume
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-white/60">
                              <span>
                                {course.lessonsCompleted} / {course.lessonsTotal} Modules
                              </span>
                              <span>{course.progress}% Complete</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white tracking-tight">
                        Recommended Courses
                      </h2>
                      <span className="text-xs text-white/50">Tailored for you</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {recommendedCourses.map((course) => (
                        <div
                          key={course.id}
                          className="group bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <button className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <FontAwesomeIcon icon={faPlay} className="ml-1 text-lg" />
                              </button>
                            </div>
                            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full">
                              {course.isBestseller ? "Bestseller" : "New Arrival"}
                            </span>
                          </div>
                          <div className="p-5 space-y-4">
                            <div>
                              <h3 className="text-white font-bold leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
                                {course.title}
                              </h3>
                              <p className="text-xs text-white/50 mt-1">{course.instructor}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                                <FontAwesomeIcon icon={faStar} />
                                <span>{course.rating}</span>
                                <span className="text-white/30 ml-1">({course.reviews})</span>
                              </div>
                              <span className="text-lg font-bold text-white">${course.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-2xl">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 border border-white/10 overflow-hidden">
                      <img
                        src="https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=0D0D0D&color=fff&size=80"
                        alt="User"
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Brooklyn Simmons</h3>
                    <p className="text-xs text-white/60">UI/UX Designer & Developer</p>
                    <div className="flex items-center justify-center gap-2 mt-3 text-sm text-amber-300">
                      <FontAwesomeIcon icon={faTrophy} /> 876 Points
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6 text-left">
                      {[
                        {
                          label: "Days Streak",
                          value: userStats.daysStreak,
                          ref: fireRef,
                          icon: fireIcon,
                        },
                        {
                          label: "Goals",
                          value: userStats.goalsInMonth,
                          ref: targetRef,
                          icon: targetIcon,
                        },
                        {
                          label: "Rank",
                          value: userStats.position,
                          ref: medalRef,
                          icon: medalIcon,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-black/30 rounded-xl p-3 border border-white/5 text-center"
                        >
                          <div
                            className="w-6 h-6 mx-auto mb-1 cursor-pointer"
                            onMouseEnter={() => item.ref.current?.playFromBeginning()}
                          >
                            <Player ref={item.ref} icon={item.icon} size={24} />
                          </div>
                          <p className="text-xl font-bold text-white">{item.value}</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        Weekly Streak
                      </h3>
                      <span className="text-xs text-white/60">4/4 Weeks</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {weeklyStreak.map((day) => (
                        <div key={`${day.day}-${day.date}`} className="text-center">
                          <p className="text-[10px] text-white/50 mb-1">{day.day}</p>
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-medium ${
                              day.isToday
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                : day.hasActivity
                                  ? "bg-emerald-500/20 text-emerald-100"
                                  : "bg-white/5 text-white/40"
                            }`}
                          >
                            {day.date}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
                        <div
                          className="w-6 h-6 mx-auto mb-2 cursor-pointer"
                          onMouseEnter={() => booksRef.current?.playFromBeginning()}
                        >
                          <Player ref={booksRef} icon={booksIcon} size={24} />
                        </div>
                        <p className="text-2xl font-bold text-white">
                          {userStats.coursesInProgress}
                        </p>
                        <p className="text-[11px] text-white/60">Courses In Progress</p>
                      </div>
                      <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
                        <div
                          className="w-6 h-6 mx-auto mb-2 cursor-pointer"
                          onMouseEnter={() => checkRef.current?.playFromBeginning()}
                        >
                          <Player ref={checkRef} icon={checkIcon} size={24} />
                        </div>
                        <p className="text-2xl font-bold text-white">
                          {userStats.coursesCompleted}
                        </p>
                        <p className="text-[11px] text-white/60">Completed</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        Weekly Watch Time
                      </h3>
                      <span className="text-xs text-white/60">Target 8h</span>
                    </div>
                    <div className="space-y-3">
                      {weeklyWatchTime.map((item, index) => (
                        <div key={`${item.label}-${index}`} className="flex items-center gap-3">
                          <span className="text-[11px] text-white/50 w-10">{item.label}</span>
                          <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                              style={{ width: `${(item.hours / 8) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2 mt-2 rounded-xl border border-white/10 text-xs text-white/70 hover:text-white hover:border-white/40 transition">
                      Sync to Calendar
                    </button>
                  </div>

                  <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
                    <div className="bg-black/60 rounded-2xl p-5 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <FontAwesomeIcon icon={faFire} />
                      </div>
                      <h4 className="text-sm font-semibold text-white">Daily Coding Challenge</h4>
                      <p className="text-xs text-white/60">Solve "Inverting Binary Tree" in O(n)</p>
                      <button className="w-full py-2 bg-white text-black rounded-lg text-xs font-semibold">
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed lg:sticky top-0 right-0 h-screen w-full lg:w-80 2xl:w-96 bg-black/60 border-l border-white/10 p-4 lg:p-6 space-y-6 backdrop-blur-3xl overflow-y-auto z-40 transform transition-transform duration-300 ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:hidden"
          }`}
        >
          <button
            className="text-white/70 text-xs font-semibold flex items-center gap-2 hover:text-white lg:hidden"
            onClick={() => setIsRightSidebarOpen(false)}
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} /> Close Panel
          </button>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg">
                {user?.displayName?.[0] || "P"}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {user?.displayName || "PathForge Pro"}
                </p>
                <p className="text-xs text-white/60">Enterprise Plan</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">{userStats.coursesInProgress}</p>
                <p className="text-[11px] text-white/60">In Progress</p>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-white">{userStats.coursesCompleted}</p>
                <p className="text-[11px] text-white/60">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-white">This Week's Focus</h4>
            <ul className="space-y-3 text-xs text-white/70">
              {continueLearning.slice(0, 2).map((course) => (
                <li key={course.id} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-1 rounded-full bg-white/60"></span>
                  <div>
                    <p className="font-semibold text-white text-sm">{course.title}</p>
                    <p>{course.category}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="text-xs text-white/60 border border-white/10 rounded-full px-4 py-2 w-full">
              View Curriculum
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white">Announcements</h4>
            <p className="text-xs text-white/60">
              Architecture review feedback ready.{" "}
              <button className="underline text-white" type="button">
                Open brief
              </button>
            </p>
          </div>
        </div>
      </div>
    </PageSurface>
  );
};

export default Dashboard;
