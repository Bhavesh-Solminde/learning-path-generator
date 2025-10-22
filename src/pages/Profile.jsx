import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    interests: user?.interests || "Web Development, AI, Data Science",
    bio: user?.bio || "Passionate learner exploring new technologies",
    learningGoal: user?.learningGoal || "Become a Full Stack Developer",
  });

  const badges = [
    { id: 1, name: "Fast Learner", icon: "🚀", earned: true },
    { id: 2, name: "Consistent", icon: "📅", earned: true },
    { id: 3, name: "Problem Solver", icon: "🧩", earned: true },
    { id: 4, name: "Team Player", icon: "🤝", earned: false },
    { id: 5, name: "Expert", icon: "🏆", earned: false },
    { id: 6, name: "Mentor", icon: "👨‍🏫", earned: false },
  ];

  const learningPreferences = {
    preferredDifficulty:
      user?.preferences?.preferredDifficulty || "Intermediate",
    learningStyle: user?.preferences?.learningStyle || "Visual & Practical",
    dailyGoal: user?.preferences?.dailyTimeCommitment || "2 hours",
    preferredCategories: user?.preferences?.selectedCategories || [
      "Web Development",
      "AI/ML",
      "DevOps",
    ],
    learningGoal: user?.preferences?.learningGoal || "career-change",
    completedCourses: user?.preferences?.completedCourses || 0,
    currentlyLearning: user?.preferences?.currentlyLearning || [],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      interests: user?.interests || "Web Development, AI, Data Science",
      bio: user?.bio || "Passionate learner exploring new technologies",
      learningGoal: user?.learningGoal || "Become a Full Stack Developer",
    });
    setIsEditing(false);
  };

  return (
    <div className="fade-in">
      <PageHeader title="My Profile 👤" showProfileButton={false} />

      <div className="p-8">
        <div className="mb-8">
          <p className="text-text-secondary">
            Manage your account and learning preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="card p-6 card-hover-glow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn-primary">
                      Save Changes
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-muted/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-muted/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    className="input-field disabled:bg-muted/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Interests
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-muted/20 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Learning Goal
                  </label>
                  <input
                    type="text"
                    name="learningGoal"
                    value={formData.learningGoal}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="input-field disabled:bg-muted/20 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Learning Preferences Card */}
            <div className="card p-6 card-hover-glow">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Learning Preferences
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/10 rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">
                    Preferred Difficulty
                  </p>
                  <p className="text-lg font-semibold text-text-primary">
                    {learningPreferences.preferredDifficulty}
                  </p>
                </div>

                <div className="p-4 bg-muted/10 rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">
                    Learning Style
                  </p>
                  <p className="text-lg font-semibold text-text-primary">
                    {learningPreferences.learningStyle}
                  </p>
                </div>

                <div className="p-4 bg-muted/10 rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">Daily Goal</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {learningPreferences.dailyGoal}
                  </p>
                </div>

                <div className="p-4 bg-muted/10 rounded-lg">
                  <p className="text-sm text-text-secondary mb-1">Categories</p>
                  <p className="text-sm font-semibold text-text-primary">
                    {learningPreferences.preferredCategories.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Badges and Stats */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="card p-6 text-center card-hover-glow">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4 ring-4 ring-gold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <h3 className="text-xl font-bold text-profile-name mb-1">
                {user?.name || "User"}
              </h3>
              <p className="text-profile-subtitle text-sm mb-4">
                {user?.email || "user@example.com"}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <div>
                  <p className="font-bold text-primary text-xl">12</p>
                  <p className="text-text-secondary">Completed</p>
                </div>
                <div className="border-l border-card-border/30"></div>
                <div>
                  <p className="font-bold text-primary text-xl">5</p>
                  <p className="text-text-secondary">In Progress</p>
                </div>
              </div>
            </div>

            {/* Badges Card */}
            <div className="card p-6 card-hover-glow">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Achievements 🏆
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                      badge.earned
                        ? "bg-primary-100 border-2 border-primary"
                        : "bg-muted/20 opacity-50"
                    }`}
                  >
                    <span className="text-3xl mb-2">{badge.icon}</span>
                    <p
                      className={`text-xs text-center font-medium ${
                        badge.earned ? "text-primary-700" : "text-muted"
                      }`}
                    >
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="card p-6 card-hover-glow">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Account Settings
              </h2>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 text-left text-text-primary hover:bg-muted/20 rounded-lg transition-all">
                  🔔 Notification Settings
                </button>
                <button className="w-full py-2 px-4 text-left text-text-primary hover:bg-muted/20 rounded-lg transition-all">
                  🔐 Change Password
                </button>
                <button className="w-full py-2 px-4 text-left text-text-primary hover:bg-muted/20 rounded-lg transition-all">
                  🌐 Language & Region
                </button>
                <button className="w-full py-2 px-4 text-left text-error hover:bg-error/10 rounded-lg transition-all">
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
