# Personalized Learning Path Generator

A responsive React + Tailwind CSS web application for personalized learning path generation with authentication, course management, progress analytics, and user profiles.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Dashboard**: Welcome screen with recommended topics, progress bars, and learning stats
- **Courses Explorer**: Browse, filter, and enroll in courses with grid/list views
- **Progress Analytics**: Interactive charts showing completion rates, performance trends, and category strengths
- **User Profile**: Manage personal information, learning preferences, and achievements
- **Responsive Design**: Beautiful UI with Tailwind CSS, hover animations, and smooth transitions

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Toastify
- **State Management**: Context API

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── pages/              # Main application pages
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Courses.jsx     # Courses explorer
│   ├── Analytics.jsx   # Progress analytics
│   └── Profile.jsx     # User profile
├── api/                # API configuration
│   └── axiosInstance.js  # Axios setup with interceptors
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Theme

- **Primary Color**: Indigo (#4F46E5)
- **Secondary Color**: Slate (#64748B)
- **Background**: #F9FAFB
- **Design**: Card-based layout with rounded corners, soft shadows, and gradient backgrounds

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Learning path"
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🔌 API Endpoints

The application expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses/:id/enroll` - Enroll in a course

### Progress
- `GET /api/progress/:userId` - Get user progress and analytics
- `GET /api/recommendations` - Get recommended topics

## 📱 Pages Overview

### Login Page
- Email and password authentication
- Error handling with toast notifications
- Redirect to dashboard on success
- Subtle fade-in animations

### Register Page
- User registration with name, email, password, and interests
- Password confirmation validation
- Auto-login after registration

### Dashboard
- Personalized welcome message
- Stats overview (courses completed, total hours, accuracy)
- Recommended topics with progress bars
- "Continue Learning" action buttons

### Courses Explorer
- Grid and list view modes
- Filters for difficulty, category, and enrollment status
- Course cards with ratings, duration, and instructors
- "Add to Learning Path" functionality

### Analytics
- Monthly completion rate chart (Line chart)
- Weekly performance trend (Line chart)
- Category-wise strengths (Bar chart)
- Learning distribution (Pie chart)
- Stats cards for quick insights

### Profile Page
- Personal information management
- Learning preferences display
- Achievement badges
- Account settings options

## 🎯 Key Components

### AuthContext
Manages authentication state, login, register, and logout functionality with JWT token handling.

### ProtectedRoute
Wrapper component that ensures only authenticated users can access protected pages.

### Sidebar
Vertical navigation bar with icons for Dashboard, Courses, Analytics, Profile, and Logout.

### Axios Instance
Pre-configured Axios client with:
- JWT token interceptor for authenticated requests
- Error handling for 401 responses
- Base URL configuration

## 🎨 Custom Styles

The app includes custom Tailwind components:
- `.card` - Card container with hover effects
- `.btn-primary` - Primary action button with animations
- `.btn-secondary` - Secondary action button
- `.input-field` - Styled form input with focus states
- `.fade-in` - Entrance animation

## 📦 Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

```bash
npm run test
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
