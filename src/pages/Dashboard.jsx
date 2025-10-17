import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';

const Dashboard = () => {
  const { user } = useAuth();
  const [recommendedTopics, setRecommendedTopics] = useState([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    totalHours: 0,
    accuracy: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recommended topics
      const topicsResponse = await axiosInstance.get('/recommendations');
      setRecommendedTopics(topicsResponse.data);

      // Fetch user stats
      const statsResponse = await axiosInstance.get(`/progress/${user?.id || 'me'}`);
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set mock data for demo
      setRecommendedTopics([
        { id: 1, name: 'Advanced React Patterns', difficulty: 'Advanced', progress: 65 },
        { id: 2, name: 'Node.js Microservices', difficulty: 'Intermediate', progress: 30 },
        { id: 3, name: 'Python Data Science', difficulty: 'Beginner', progress: 80 },
      ]);
      setStats({
        coursesCompleted: 12,
        totalHours: 48,
        accuracy: 87,
      });
    } finally {
      setLoading(false);
    }
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
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Learner'}! 👋
        </h1>
        <p className="text-gray-600">Continue your learning journey and achieve your goals.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Courses Completed</p>
              <p className="text-3xl font-bold text-primary mt-2">{stats.coursesCompleted}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <span className="text-3xl">🎓</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Hours</p>
              <p className="text-3xl font-bold text-primary mt-2">{stats.totalHours}h</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <span className="text-3xl">⏱️</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Accuracy</p>
              <p className="text-3xl font-bold text-primary mt-2">{stats.accuracy}%</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <span className="text-3xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Topics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Recommended Next Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedTopics.map((topic) => (
            <div key={topic.id} className="card p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{topic.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{topic.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>

              <button className="btn-primary w-full">
                Continue Learning →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
