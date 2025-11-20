import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { notifyError, notifySuccess } from "../utils/notify";
import PageSurface from "../components/PageSurface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faMobileAlt,
  faChartLine,
  faBrain,
  faCogs,
  faShieldAlt,
  faCloud,
  faLink,
  faGraduationCap,
  faArrowsAlt,
  faBullseye,
  faCertificate,
  faUserGraduate,
  faCode,
  faUserTie,
  faEye,
  faCogs as faCogsAlt,
  faBook,
  faLayerGroup,
  faClock,
} from "../icons";

const Onboarding = () => {
  const navigate = useNavigate();
  const { currentUser: user, updateUserPreferences } = useAuthContext();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    // Step 1: Learning Preferences
    learningGoal: "",
    preferredDifficulty: "",
    learningStyle: "",
    dailyTimeCommitment: "",

    // Step 2: Interests
    selectedCategories: [],

    // Step 3: Current Status
    currentLevel: "",
    completedCourses: 0,
    currentlyLearning: [],
  });

  const learningGoals = [
    {
      id: "career-advancement",
      label: "Career Advancement",
      desc: "Grow within your current engineering field",
      icon: faGraduationCap,
    },
    {
      id: "domain-shift",
      label: "Domain Shift",
      desc: "Transition to a new tech domain (e.g., AI, Cloud)",
      icon: faArrowsAlt,
    },
    {
      id: "skill-specialization",
      label: "Skill Specialization",
      desc: "Deepen expertise in a specific technology",
      icon: faBullseye,
    },
    {
      id: "certification",
      label: "Certification Prep",
      desc: "Prepare for industry-recognized certifications",
      icon: faCertificate,
    },
  ];

  const difficulties = [
    {
      id: "beginner",
      label: "Beginner",
      desc: "Little to no prior coding experience",
      icon: faCode,
    },
    {
      id: "intermediate",
      label: "Intermediate",
      desc: "Comfortable with core programming and projects",
      icon: faUserGraduate,
    },
    {
      id: "advanced",
      label: "Advanced",
      desc: "Strong technical foundation with applied experience",
      icon: faUserTie,
    },
  ];

  const learningStyles = [
    {
      id: "visual",
      label: "Visual Learner",
      desc: "Prefers videos, diagrams, and visualizations",
      icon: faEye,
    },
    {
      id: "practical",
      label: "Practical Learner",
      desc: "Learns best through hands-on coding and projects",
      icon: faCogsAlt,
    },
    {
      id: "theoretical",
      label: "Theoretical Learner",
      desc: "Focuses on reading documentation and research papers",
      icon: faBook,
    },
    {
      id: "hybrid",
      label: "Hybrid Learner",
      desc: "Combines theory, visuals, and project-based learning",
      icon: faLayerGroup,
    },
  ];

  const timeCommitments = [
    { id: "30min", label: "30 min/day", value: "30 minutes", icon: faClock },
    { id: "1hour", label: "1 hour/day", value: "1 hour", icon: faClock },
    { id: "2hours", label: "2 hours/day", value: "2 hours", icon: faClock },
    { id: "3hours", label: "3+ hours/day", value: "3+ hours", icon: faClock },
  ];

  const categories = [
    { id: "web-dev", label: "Web Development", icon: "laptop-code" },
    { id: "mobile-dev", label: "Mobile App Development", icon: "mobile-alt" },
    {
      id: "data-science",
      label: "Data Science & Analytics",
      icon: "chart-line",
    },
    {
      id: "ai-ml",
      label: "Artificial Intelligence & Machine Learning",
      icon: "brain",
    },
    { id: "devops", label: "DevOps & Automation", icon: "cogs" },
    {
      id: "cybersecurity",
      label: "Cybersecurity & Ethical Hacking",
      icon: "shield-alt",
    },
    { id: "cloud", label: "Cloud Infrastructure & Deployment", icon: "cloud" },
    { id: "blockchain", label: "Blockchain & Web3 Development", icon: "link" },
  ];

  const categoryIconMap = {
    "laptop-code": faLaptopCode,
    "mobile-alt": faMobileAlt,
    "chart-line": faChartLine,
    brain: faBrain,
    cogs: faCogs,
    "shield-alt": faShieldAlt,
    cloud: faCloud,
    link: faLink,
  };

  const currentlyLearningOptions = [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Java",
    "Python",
    "C++",
    "TypeScript",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "TensorFlow",
    "Machine Learning",
    "Data Structures",
    "Algorithms",
  ];

  const handleSelection = (field, value) => {
    setPreferences({ ...preferences, [field]: value });
  };

  const toggleCategory = (categoryId) => {
    const selected = preferences.selectedCategories.includes(categoryId);
    if (selected) {
      setPreferences({
        ...preferences,
        selectedCategories: preferences.selectedCategories.filter((id) => id !== categoryId),
      });
    } else {
      setPreferences({
        ...preferences,
        selectedCategories: [...preferences.selectedCategories, categoryId],
      });
    }
  };

  const toggleLearning = (tech) => {
    const selected = preferences.currentlyLearning.includes(tech);
    if (selected) {
      setPreferences({
        ...preferences,
        currentlyLearning: preferences.currentlyLearning.filter((t) => t !== tech),
      });
    } else {
      setPreferences({
        ...preferences,
        currentlyLearning: [...preferences.currentlyLearning, tech],
      });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !preferences.learningGoal ||
        !preferences.preferredDifficulty ||
        !preferences.learningStyle ||
        !preferences.dailyTimeCommitment
      ) {
        notifyError("Please complete all fields before continuing");
        return;
      }
    } else if (step === 2) {
      if (preferences.selectedCategories.length === 0) {
        notifyError("Please select at least one category");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleComplete = () => {
    if (!preferences.currentLevel) {
      notifyError("Please select your current level");
      return;
    }

    // Update user preferences in context
    if (updateUserPreferences) {
      updateUserPreferences(preferences);
    }

    notifySuccess("Profile setup complete! ");
    navigate("/dashboard");
  };

  const skipOnboarding = () => {
    navigate("/dashboard");
  };

  return (
    <PageSurface>
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="card max-w-4xl w-full p-8 fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name || "Learner"}!
            </h1>
            <p className="text-gray-600">Let's personalize your learning experience</p>
            <div className="flex justify-center mt-4 space-x-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-16 rounded-full ${
                    s === step ? "bg-primary" : s < step ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Step {step} of 3</p>
          </div>

          {/* Step 1: Learning Preferences */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's your learning goal?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleSelection("learningGoal", goal.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        preferences.learningGoal === goal.id
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={goal.icon} className="text-2xl text-primary mr-3" />
                        <div className="text-lg font-semibold">{goal.label}</div>
                      </div>
                      <div className="text-sm text-gray-600">{goal.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's your current level?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {difficulties.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => handleSelection("preferredDifficulty", level.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        preferences.preferredDifficulty === level.id
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <FontAwesomeIcon icon={level.icon} className="text-3xl text-primary mb-2" />
                      <div className="text-lg font-semibold mb-1">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">How do you learn best?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleSelection("learningStyle", style.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        preferences.learningStyle === style.id
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      {style.id === "hybrid" && (
                        <span className="absolute -top-3 -right-4 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          Best Choice
                        </span>
                      )}
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={style.icon} className="text-2xl text-primary mr-3" />
                        <div className="text-lg font-semibold">{style.label}</div>
                      </div>
                      <div className="text-sm text-gray-600">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily time commitment?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {timeCommitments.map((time) => (
                    <button
                      key={time.id}
                      onClick={() => handleSelection("dailyTimeCommitment", time.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        preferences.dailyTimeCommitment === time.value
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <FontAwesomeIcon icon={time.icon} className="text-2xl text-primary mb-2" />
                      <div className="font-semibold">{time.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What topics interest you? (Select all that apply)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        preferences.selectedCategories.includes(category.id)
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={categoryIconMap[category.icon]}
                        className="text-3xl text-primary mb-2"
                      />
                      <div className="font-semibold">{category.label}</div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Selected: {preferences.selectedCategories.length} categories
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Current Status */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's your current programming level?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Just Starting", "Some Experience", "Professional"].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleSelection("currentLevel", level)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        preferences.currentLevel === level
                          ? "border-primary bg-primary-50"
                          : "border-gray-200 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-semibold">{level}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  How many courses have you completed?
                </h2>
                <input
                  type="number"
                  min="0"
                  value={preferences.completedCourses}
                  onChange={(e) =>
                    handleSelection("completedCourses", parseInt(e.target.value) || 0)
                  }
                  className="input-field max-w-xs"
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What are you currently learning? (Optional)
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentlyLearningOptions.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleLearning(tech)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        preferences.currentlyLearning.includes(tech)
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={skipOnboarding}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Skip for now
            </button>

            <div className="flex gap-3">
              {step > 1 && (
                <button onClick={prevStep} className="btn-secondary">
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={nextStep} className="btn-primary">
                  Continue →
                </button>
              ) : (
                <button onClick={handleComplete} className="btn-primary">
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageSurface>
  );
};

export default Onboarding;
