import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faCode, faBook } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
        title:
          "Webflow Tutorial: Build Your First Portfolio Website In a Minute",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <PageHeader
        title="Home"
        onProfileClick={() => setIsRightSidebarOpen((v) => !v)}
        showProfileButton={true}
      />

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Continue Learning Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {continueLearning.map((course) => (
                <div key={course.id} className="card p-6 card-hover-glow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-text-primary mb-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-text-secondary uppercase tracking-wide">
                            {course.category}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 ease-in-out"
                          style={{
                            width: `${course.progress}%`,
                            background:
                              "linear-gradient(90deg, rgb(0, 102, 204) 0%, rgb(0, 153, 255) 100%)",
                            boxShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
                          }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">
                          <FontAwesomeIcon icon={faBook} />
                        </span>
                        <span className="text-text-secondary">
                          ⏱️ {course.timeLeft}
                        </span>
                      </div>

                      <button className="mt-4 btn-primary text-sm flex items-center gap-2">
                        Resume Course
                        <span className="ml-1">↻</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses Section */}
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Recommended Courses For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="card overflow-hidden card-hover-glow"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                        <span className="text-2xl text-white">▶</span>
                      </button>
                    </div>
                    <span className="absolute top-3 left-3 bg-gold text-navbar text-xs px-3 py-1 rounded font-semibold shadow-md">
                      {course.isBestseller ? "Best Seller" : "New"}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {course.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {course.instructor}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-text-primary">
                          {course.rating}
                        </span>
                        <span className="text-text-secondary text-sm">
                          ({course.reviews})
                        </span>
                      </div>
                      <span className="font-bold text-text-primary">
                        ${course.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        {isRightSidebarOpen && (
          <div className="w-80 bg-white border-l border-card-border/40 p-6 space-y-6 shadow-lg">
            {/* Close Details Button */}
            <button
              className="text-primary text-sm font-semibold flex items-center mb-4 hover:text-primary-600 transition-colors"
              onClick={() => setIsRightSidebarOpen(false)}
            >
              <span className="mr-2">⊗</span> Close Details
            </button>

            {/* User Profile Card */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-navbar rounded-full mx-auto mb-3 flex items-center justify-center ring-4 ring-gold shadow-lg">
                <img
                  src="https://ui-avatars.com/api/?name=Brooklyn+Simmons&background=FF6600&color=fff&size=80"
                  alt="User"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <h3 className="font-bold text-profile-name">Brooklyn Simmons</h3>
              <p className="text-sm text-profile-subtitle">
                UI/UX Designer & Developer
              </p>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <span className="text-2xl">🏆</span>
                <span className="text-sm font-semibold text-gold">
                  876 Points
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xl">🔥</span>
                    <span className="text-2xl font-bold text-text-primary">
                      {userStats.daysStreak}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Days Streak</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xl">🎯</span>
                    <span className="text-2xl font-bold text-text-primary">
                      {userStats.goalsInMonth}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">Goals in Month</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-xl">🏅</span>
                    <span className="text-2xl font-bold text-text-primary">
                      {userStats.position}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">2nd Place</p>
                </div>
              </div>
            </div>

            {/* Weekly Streak */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary flex items-center">
                  Weekly Streak <span className="ml-2 text-gray-400">ℹ️</span>
                </h3>
                <select className="text-sm text-text-secondary border-none focus:outline-none">
                  <option>May 2024</option>
                </select>
              </div>
              <p className="text-sm text-text-secondary mb-4">4/4 Weeks</p>

              {/* Calendar */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weeklyStreak.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{day.day}</p>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        day.isToday
                          ? "bg-gold text-navbar shadow-md ring-2 ring-gold/50"
                          : day.hasActivity
                          ? "bg-accent text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-primary/10 border border-primary/30 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-2xl mb-1 block">📚</span>
                  <p className="text-2xl font-bold text-text-primary">
                    {userStats.coursesInProgress}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Courses In Progress
                  </p>
                </div>
                <div className="bg-gold/20 border border-gold/40 p-3 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-2xl mb-1 block">✅</span>
                  <p className="text-2xl font-bold text-text-primary">
                    {userStats.coursesCompleted}
                  </p>
                  <p className="text-xs text-text-secondary">Completed</p>
                </div>
              </div>
            </div>

            {/* Weekly Watch Time */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary flex items-center">
                  Weekly Watch Time{" "}
                  <span className="ml-2 text-gray-400">ℹ️</span>
                </h3>
                <select className="text-sm text-text-secondary border-none focus:outline-none">
                  <option>May 2024</option>
                </select>
              </div>
              <p className="text-sm text-text-secondary mb-4">4/4 Weeks</p>

              {/* Bar Chart */}
              <div className="space-y-2">
                {weeklyWatchTime.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xs text-text-secondary w-8">
                      {item.label}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="h-full rounded-full relative transition-all duration-500"
                        style={{
                          width: `${(item.hours / 8) * 100}%`,
                          background:
                            "linear-gradient(90deg, rgb(0, 102, 204) 0%, rgb(0, 153, 255) 100%)",
                          boxShadow: "0 0 8px rgba(255, 215, 0, 0.5)",
                        }}
                      >
                        {index === 2 && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-semibold">
                            4:22m
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
