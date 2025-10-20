import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all',
    progress: 'all',
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, courses]);

  const fetchCourses = async () => {
    // Using mock data for now - will be replaced with Spring Boot API later
    const mockCourses = [
      {
        id: 1,
        name: 'Complete React Developer',
        category: 'Web Development',
        difficulty: 'Intermediate',
        progress: 45,
        duration: '40 hours',
        instructor: 'John Doe',
        rating: 4.8,
        enrolled: true,
      },
      {
        id: 2,
        name: 'Python for Data Science',
        category: 'Data Science',
        difficulty: 'Beginner',
        progress: 0,
        duration: '35 hours',
        instructor: 'Jane Smith',
        rating: 4.9,
        enrolled: false,
      },
      {
        id: 3,
        name: 'Advanced Node.js',
        category: 'Backend',
        difficulty: 'Advanced',
        progress: 80,
        duration: '30 hours',
        instructor: 'Mike Johnson',
        rating: 4.7,
        enrolled: true,
      },
      {
        id: 4,
        name: 'Machine Learning Fundamentals',
        category: 'AI/ML',
        difficulty: 'Intermediate',
        progress: 20,
        duration: '50 hours',
        instructor: 'Sarah Lee',
        rating: 4.9,
        enrolled: true,
      },
      {
        id: 5,
        name: 'Docker & Kubernetes',
        category: 'DevOps',
        difficulty: 'Advanced',
        progress: 0,
        duration: '25 hours',
        instructor: 'Tom Wilson',
        rating: 4.6,
        enrolled: false,
      },
      {
        id: 6,
        name: 'React Native Mobile Apps',
        category: 'Mobile Development',
        difficulty: 'Intermediate',
        progress: 60,
        duration: '45 hours',
        instructor: 'Emma Davis',
        rating: 4.8,
        enrolled: true,
      },
    ];
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...courses];

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(
        (course) => course.difficulty.toLowerCase() === filters.difficulty
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((course) => course.category === filters.category);
    }

    if (filters.progress !== 'all') {
      if (filters.progress === 'enrolled') {
        filtered = filtered.filter((course) => course.enrolled);
      } else if (filters.progress === 'not-enrolled') {
        filtered = filtered.filter((course) => !course.enrolled);
      } else if (filters.progress === 'completed') {
        filtered = filtered.filter((course) => course.progress === 100);
      }
    }

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleAddToPath = async (courseId) => {
    // Simple enrollment - will be replaced with Spring Boot API later
    toast.success('Course added to your learning path!');
    // Update local state
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Courses Explorer 📚</h1>
        <p className="text-gray-600">Discover and add courses to your personalized learning path.</p>
      </div>

      {/* Filters and View Toggle */}
      <div className="card p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="input-field"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Backend">Backend</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile Development">Mobile Development</option>
            </select>
          </div>

          {/* Progress Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filters.progress}
              onChange={(e) => handleFilterChange('progress', e.target.value)}
              className="input-field"
            >
              <option value="all">All Courses</option>
              <option value="enrolled">Enrolled</option>
              <option value="not-enrolled">Not Enrolled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="ml-auto flex items-end gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <span>⊞</span> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <span>☰</span> List
            </button>
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredCourses.length}</span> courses
        </p>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    course.difficulty
                  )}`}
                >
                  {course.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{course.category}</p>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span>⏱️ {course.duration}</span>
                <span>•</span>
                <span>⭐ {course.rating}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>

              {course.enrolled && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {course.enrolled ? (
                <Link
                  to={`/course/${course.id}`}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 bg-primary hover:bg-primary-700 text-white text-center block"
                >
                  Continue Learning →
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToPath(course.id)}
                  className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 btn-primary"
                >
                  + Add to Learning Path
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card p-6 flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      course.difficulty
                    )}`}
                  >
                    {course.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">{course.category} • {course.duration} • ⭐ {course.rating}</p>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>

                {course.enrolled && (
                  <div className="mt-3 max-w-xs">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {course.enrolled ? (
                <Link
                  to={`/course/${course.id}`}
                  className="py-2 px-6 rounded-lg font-medium transition-all duration-300 bg-primary hover:bg-primary-700 text-white text-center"
                >
                  Continue Learning →
                </Link>
              ) : (
                <button
                  onClick={() => handleAddToPath(course.id)}
                  className="py-2 px-6 rounded-lg font-medium transition-all duration-300 btn-primary"
                >
                  + Add to Path
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
