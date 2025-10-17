import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/courses', icon: '📚', label: 'Courses' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary">LearnPath</h2>
        <p className="text-xs text-gray-500 mt-1">Personalized Learning</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 w-full"
        >
          <span className="text-xl">🔒</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
