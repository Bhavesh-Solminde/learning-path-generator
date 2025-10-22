import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  const [accountSettings, setAccountSettings] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    progressReports: false,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "UTC",
    theme: "light",
    autoPlay: true,
  });

  const handleAccountChange = (e) => {
    setAccountSettings({
      ...accountSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveAccount = () => {
    // Validate passwords if changing
    if (accountSettings.newPassword) {
      if (accountSettings.newPassword !== accountSettings.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (accountSettings.newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
    }

    // Save account settings
    toast.success("Account settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  const handleSavePreferences = () => {
    toast.success("Preferences saved!");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      logout();
      toast.info("Account deleted");
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "security", label: "Security", icon: "🔐" },
  ];

  return (
    <div className="fade-in">
      <PageHeader title="Settings" showProfileButton={false} />

      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-text-secondary">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-card-border/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {/* Account Settings Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Account Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={accountSettings.name}
                      onChange={handleAccountChange}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={accountSettings.email}
                      onChange={handleAccountChange}
                      className="input-field"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="pt-4 border-t border-card-border/30">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Change Password
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={accountSettings.currentPassword}
                          onChange={handleAccountChange}
                          className="input-field"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={accountSettings.newPassword}
                          onChange={handleAccountChange}
                          className="input-field"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={accountSettings.confirmPassword}
                          onChange={handleAccountChange}
                          className="input-field"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button onClick={handleSaveAccount} className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {Object.entries({
                    emailNotifications: "Email Notifications",
                    courseUpdates: "Course Updates",
                    progressReports: "Progress Reports",
                    weeklyDigest: "Weekly Digest",
                    marketingEmails: "Marketing Emails",
                  }).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 border-b border-card-border/20"
                    >
                      <div>
                        <p className="font-medium text-text-primary">{label}</p>
                        <p className="text-sm text-text-secondary">
                          {key === "emailNotifications" &&
                            "Receive all email notifications"}
                          {key === "courseUpdates" &&
                            "Get notified about new course content"}
                          {key === "progressReports" &&
                            "Receive weekly progress reports"}
                          {key === "weeklyDigest" &&
                            "Get a weekly summary of your activity"}
                          {key === "marketingEmails" &&
                            "Receive promotional emails and offers"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notificationSettings[key]
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationSettings[key]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSaveNotifications}
                      className="btn-primary"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  General Preferences
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Language
                    </label>
                    <select
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange}
                      className="input-field"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={preferences.timezone}
                      onChange={handlePreferenceChange}
                      className="input-field"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="IST">India Standard Time (IST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Theme
                    </label>
                    <select
                      name="theme"
                      value={preferences.theme}
                      onChange={handlePreferenceChange}
                      className="input-field"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-gray-200">
                    <div>
                      <p className="font-medium text-text-primary">
                        Auto-play Videos
                      </p>
                      <p className="text-sm text-text-secondary">
                        Automatically play next lesson video
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          autoPlay: !preferences.autoPlay,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.autoPlay ? "bg-primary" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.autoPlay
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSavePreferences}
                      className="btn-primary"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  Security Settings
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🔐</span>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <button className="btn-secondary text-sm">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 border border-card-border/20 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">📱</span>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">
                          Active Sessions
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                          Manage devices where you're currently logged in
                        </p>
                        <button className="btn-secondary text-sm">
                          View Sessions
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 border border-card-border/20 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">📜</span>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">
                          Activity Log
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">
                          Review your recent account activity
                        </p>
                        <button className="btn-secondary text-sm">
                          View Activity
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-card-border/30">
                    <h3 className="text-lg font-semibold text-red-600 mb-3">
                      Danger Zone
                    </h3>
                    <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
                      <h4 className="font-semibold text-text-primary mb-2">
                        Delete Account
                      </h4>
                      <p className="text-sm text-text-secondary mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error/80 transition-colors"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
