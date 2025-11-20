import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { notifySuccess } from "../utils/notify";
import PageSurface from "../components/PageSurface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faChartBar, faPlay, faFilePdf, faCode, faFileArchive, faLink } from "../icons";

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser: user } = useAuthContext();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [userNotes, setUserNotes] = useState("");

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = () => {
    // Mock course data - will be replaced with Spring Boot API
    const mockCourse = {
      id: courseId,
      name: "Advanced React Patterns",
      instructor: "John Doe",
      difficulty: "Advanced",
      duration: "40 hours",
      description:
        "Master advanced React patterns including hooks, context, performance optimization, and architectural patterns.",
      progress: 65,
      enrolled: true,
      thumbnail: "https://via.placeholder.com/800x400?text=React+Course",

      // Course Modules
      modules: [
        {
          id: 1,
          title: "Module 1: React Hooks Deep Dive",
          duration: "8 hours",
          lessons: [
            {
              id: 101,
              title: "Introduction to Advanced Hooks",
              duration: "45 min",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Learn advanced hook patterns and custom hooks",
              resources: [
                { name: "Hook Rules PDF", url: "#", type: "pdf" },
                { name: "Code Examples", url: "#", type: "code" },
              ],
              completed: true,
            },
            {
              id: 102,
              title: "useCallback and useMemo",
              duration: "1 hour",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Performance optimization with memoization",
              resources: [
                { name: "Performance Guide", url: "#", type: "pdf" },
                { name: "Benchmark Examples", url: "#", type: "code" },
              ],
              completed: true,
            },
            {
              id: 103,
              title: "Custom Hooks Best Practices",
              duration: "50 min",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Building reusable custom hooks",
              resources: [
                { name: "Custom Hooks Library", url: "#", type: "code" },
                { name: "Testing Hooks Guide", url: "#", type: "pdf" },
              ],
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: Context API & State Management",
          duration: "10 hours",
          lessons: [
            {
              id: 201,
              title: "Context API Advanced Patterns",
              duration: "1 hour 15 min",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Advanced context patterns and optimization",
              resources: [
                { name: "Context Patterns PDF", url: "#", type: "pdf" },
                { name: "Example App", url: "#", type: "code" },
              ],
              completed: false,
            },
            {
              id: 202,
              title: "Redux Toolkit Integration",
              duration: "1 hour 30 min",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Modern Redux with Redux Toolkit",
              resources: [
                { name: "Redux Setup Guide", url: "#", type: "pdf" },
                { name: "RTK Query Examples", url: "#", type: "code" },
              ],
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Module 3: Performance Optimization",
          duration: "12 hours",
          lessons: [
            {
              id: 301,
              title: "Code Splitting & Lazy Loading",
              duration: "1 hour",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Optimize bundle size and loading",
              resources: [
                { name: "Webpack Guide", url: "#", type: "pdf" },
                { name: "Split Examples", url: "#", type: "code" },
              ],
              completed: false,
            },
            {
              id: 302,
              title: "React Profiler & DevTools",
              duration: "45 min",
              type: "video",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "Measure and improve performance",
              resources: [
                { name: "Profiling Guide", url: "#", type: "pdf" },
                { name: "Performance Checklist", url: "#", type: "pdf" },
              ],
              completed: false,
            },
          ],
        },
      ],

      // Additional Resources
      resources: [
        {
          id: 1,
          name: "Course Slides (All Modules)",
          url: "#",
          type: "presentation",
          size: "45 MB",
        },
        {
          id: 2,
          name: "Complete Source Code",
          url: "#",
          type: "zip",
          size: "12 MB",
        },
        { id: 3, name: "Cheat Sheet PDF", url: "#", type: "pdf", size: "2 MB" },
        {
          id: 4,
          name: "Additional Reading List",
          url: "#",
          type: "link",
          size: "-",
        },
      ],

      // Projects
      projects: [
        {
          id: 1,
          title: "Build a Task Manager App",
          description: "Apply React patterns to build a full-featured task manager",
          difficulty: "Intermediate",
          estimatedTime: "8 hours",
          completed: false,
        },
        {
          id: 2,
          title: "E-commerce Dashboard",
          description: "Create a complex dashboard with state management",
          difficulty: "Advanced",
          estimatedTime: "12 hours",
          completed: false,
        },
      ],
    };

    setCourse(mockCourse);

    // Set completed lessons
    const completed = mockCourse.modules
      .flatMap((m) => m.lessons)
      .filter((l) => l.completed)
      .map((l) => l.id);
    setCompletedLessons(completed);

    // Set first incomplete lesson as current
    const firstIncomplete = mockCourse.modules.flatMap((m) => m.lessons).find((l) => !l.completed);
    if (firstIncomplete) {
      setCurrentLesson(firstIncomplete);
    }

    setLoading(false);
  };

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      notifySuccess("Lesson marked as complete! 🎉");

      // Update progress
      const totalLessons = course.modules.flatMap((m) => m.lessons).length;
      const newProgress = Math.round(((completedLessons.length + 1) / totalLessons) * 100);
      setCourse({ ...course, progress: newProgress });
    }
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setActiveTab("video");
  };

  const saveNotes = () => {
    notifySuccess("Notes saved successfully!");
    setShowNotes(false);
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />;
      case "code":
        return <FontAwesomeIcon icon={faCode} className="text-blue-500" />;
      case "presentation":
        return <FontAwesomeIcon icon={faChartBar} className="text-green-500" />;
      case "zip":
        return <FontAwesomeIcon icon={faFileArchive} className="text-yellow-600" />;
      case "link":
        return <FontAwesomeIcon icon={faLink} className="text-primary" />;
      default:
        return <FontAwesomeIcon icon={faFilePdf} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageSurface>
      {/* Header */}
      <div className="bg-night-soft/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-white/60 hover:text-white"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{course.name}</h1>
                <p className="text-sm text-white/60">by {course.instructor}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60 mb-1">Your Progress</div>
              <div className="flex items-center space-x-2">
                <div className="w-32 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span className="text-sm font-semibold text-white">{course.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="card">
              <div className="border-b border-white/10">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {["overview", "video", "resources", "projects"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? "border-white text-white"
                          : "border-transparent text-white/50 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">About this course</h2>
                    <p className="text-gray-700">{course.description}</p>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="text-sm text-white/60">Duration</div>
                        <div className="text-lg font-semibold text-white">{course.duration}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="text-sm text-white/60">Difficulty</div>
                        <div className="text-lg font-semibold text-white">{course.difficulty}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <div className="text-sm text-white/60">Lessons</div>
                        <div className="text-lg font-semibold text-white">
                          {course.modules.flatMap((m) => m.lessons).length}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Tab */}
                {activeTab === "video" && currentLesson && (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{currentLesson.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{currentLesson.duration}</p>
                      </div>
                      <button
                        onClick={() => handleLessonComplete(currentLesson.id)}
                        className={`btn-primary ${
                          completedLessons.includes(currentLesson.id)
                            ? "opacity-50 cursor-default"
                            : ""
                        }`}
                        disabled={completedLessons.includes(currentLesson.id)}
                      >
                        {completedLessons.includes(currentLesson.id)
                          ? "✓ Completed"
                          : "Mark as Complete"}
                      </button>
                    </div>

                    {/* Video Player */}
                    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>

                    <p className="text-gray-700">{currentLesson.description}</p>

                    {/* Lesson Resources */}
                    {currentLesson.resources && currentLesson.resources.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Lesson Resources
                        </h3>
                        <div className="space-y-2">
                          {currentLesson.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                                <span className="font-medium text-gray-900">{resource.name}</span>
                              </div>
                              <span className="text-primary text-sm">Download →</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">My Notes</h3>
                        <button
                          onClick={() => setShowNotes(!showNotes)}
                          className="text-primary hover:text-primary-700 text-sm font-medium"
                        >
                          {showNotes ? "Hide" : "Show"} Notes
                        </button>
                      </div>
                      {showNotes && (
                        <div>
                          <textarea
                            value={userNotes}
                            onChange={(e) => setUserNotes(e.target.value)}
                            placeholder="Write your notes here..."
                            className="input-field h-32 resize-none"
                          />
                          <button onClick={saveNotes} className="btn-primary mt-2">
                            Save Notes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === "resources" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Course Resources</h2>
                    <div className="space-y-2">
                      {course.resources.map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-3xl">{getResourceIcon(resource.type)}</span>
                            <div>
                              <div className="font-medium text-gray-900">{resource.name}</div>
                              <div className="text-sm text-gray-600">{resource.size}</div>
                            </div>
                          </div>
                          <span className="text-primary text-sm font-medium">Download →</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Practice Projects</h2>
                    {course.projects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-600">
                                <FontAwesomeIcon icon={faClock} className="mr-1" />{" "}
                                {project.estimatedTime}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  project.difficulty === "Advanced"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {project.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            className={`btn-primary ${project.completed ? "opacity-50" : ""}`}
                            disabled={project.completed}
                          >
                            {project.completed ? "✓ Completed" : "Start Project"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Course Curriculum */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Course Curriculum</h3>
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.duration}</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                            currentLesson?.id === lesson.id ? "bg-primary-50" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                {completedLessons.includes(lesson.id) && (
                                  <span className="text-green-500">✓</span>
                                )}
                                <span
                                  className={`text-sm font-medium ${
                                    completedLessons.includes(lesson.id)
                                      ? "text-gray-600 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                            </div>
                            {currentLesson?.id === lesson.id && (
                              <FontAwesomeIcon icon={faPlay} className="text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSurface>
  );
};

export default CourseLearning;
