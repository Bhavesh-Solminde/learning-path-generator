import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuthContext } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";

const Analytics = () => {
  const { currentUser: user } = useAuthContext();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    // Using mock data for now - will be replaced with Spring Boot API later
    setAnalyticsData({
      completionTrend: [
        { month: "Jan", completed: 2 },
        { month: "Feb", completed: 3 },
        { month: "Mar", completed: 5 },
        { month: "Apr", completed: 4 },
        { month: "May", completed: 7 },
        { month: "Jun", completed: 6 },
      ],
      performanceTrend: [
        { week: "Week 1", score: 75 },
        { week: "Week 2", score: 82 },
        { week: "Week 3", score: 78 },
        { week: "Week 4", score: 88 },
        { week: "Week 5", score: 85 },
        { week: "Week 6", score: 92 },
      ],
      categoryStrength: [
        { name: "Web Development", value: 85 },
        { name: "Data Science", value: 72 },
        { name: "Mobile Dev", value: 65 },
        { name: "DevOps", value: 78 },
        { name: "AI/ML", value: 68 },
      ],
      learningStats: {
        totalCourses: 24,
        inProgress: 5,
        completed: 12,
        notStarted: 7,
      },
    });
    setLoading(false);
  };

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const pieData = analyticsData
    ? [
        {
          name: "Completed",
          value: analyticsData.learningStats?.completed || 0,
        },
        {
          name: "In Progress",
          value: analyticsData.learningStats?.inProgress || 0,
        },
        {
          name: "Not Started",
          value: analyticsData.learningStats?.notStarted || 0,
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <PageHeader
        title={
          <span>
            Progress Analytics <FontAwesomeIcon icon={faChartBar} />
          </span>
        }
        showProfileButton={false}
      />

      <div className="p-8">
        <div className="mb-8">
          <p className="text-text-secondary">
            Track your learning journey and identify areas for growth.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-text-secondary text-sm font-medium mb-2">
              Total Courses
            </h3>
            <p className="text-3xl font-bold text-primary">
              {analyticsData?.learningStats?.totalCourses}
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-text-secondary text-sm font-medium mb-2">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-gold">
              {analyticsData?.learningStats?.inProgress}
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-text-secondary text-sm font-medium mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-accent">
              {analyticsData?.learningStats?.completed}
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-text-secondary text-sm font-medium mb-2">
              Not Started
            </h3>
            <p className="text-3xl font-bold text-text-secondary">
              {analyticsData?.learningStats?.notStarted}
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Completion Trend */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Monthly Completion Rate
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData?.completionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Trend */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Performance Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData?.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Strength */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Category-wise Strengths
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData?.categoryStrength}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Learning Distribution */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Learning Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
