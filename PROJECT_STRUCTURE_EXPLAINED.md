# 🎓 Learning Pathway Generator - Project Structure & Explanation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Folder Structure](#folder-structure)
5. [Data Flow](#data-flow)
6. [Key Features](#key-features)
7. [How Everything Works Together](#how-everything-works-together)

---

## 🎯 Project Overview

This is a **Personalized Learning Path Generator** web application that helps users:
- Create personalized learning paths based on their goals and preferences
- Track their learning progress
- Access course content with videos, resources, and notes
- View analytics of their learning journey
- Manage their profile and preferences

**Current State**: Frontend-only application using **mock data** (ready for Spring Boot backend integration)

---

## 🛠️ Technology Stack

### **Core Technologies**
```json
{
  "Framework": "React 19.1.1",
  "Build Tool": "Vite 7.1.7",
  "Routing": "React Router DOM 7.9.4",
  "Styling": "Tailwind CSS 3.4.16",
  "HTTP Client": "Axios 1.12.2",
  "Charts": "Recharts 3.3.0",
  "Notifications": "React Toastify 11.0.5"
}
```

### **Development Tools**
- **ESLint**: Code linting
- **PostCSS + Autoprefixer**: CSS processing
- **Vite**: Lightning-fast development server and build tool

---

## 🏗️ Project Architecture

### **Architecture Pattern**
This project follows a **Component-Based Architecture** with:
- **Context API** for state management (authentication)
- **React Router** for client-side routing
- **Protected Routes** for authentication
- **Modular component structure**

### **Visual Architecture**
```
┌─────────────────────────────────────────────────────┐
│                   Browser                            │
│  ┌───────────────────────────────────────────────┐  │
│  │         React Application (main.jsx)          │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │      AuthProvider (Context)             │  │  │
│  │  │  ┌───────────────────────────────────┐  │  │  │
│  │  │  │    Router (BrowserRouter)         │  │  │  │
│  │  │  │  ┌─────────────────────────────┐  │  │  │  │
│  │  │  │  │   Routes                    │  │  │  │  │
│  │  │  │  │  - Public (Login/Register)  │  │  │  │  │
│  │  │  │  │  - Protected (Dashboard)    │  │  │  │  │
│  │  │  │  │  - With Sidebar             │  │  │  │  │
│  │  │  │  └─────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
         │                         │
         ▼                         ▼
   Toast Notifications    Axios Instance (API Ready)
                                   │
                                   ▼
                          Spring Boot Backend
                          (To be connected)
```

---

## 📁 Folder Structure

```
Learning path/
│
├── public/                          # Static assets
│   └── vite.svg                     # Vite logo
│
├── src/                             # Source code
│   ├── api/                         # API configuration
│   │   └── axiosInstance.js         # Axios setup with interceptors
│   │
│   ├── assets/                      # Images, icons
│   │   └── react.svg
│   │
│   ├── components/                  # Reusable components
│   │   ├── ProtectedRoute.jsx       # Route protection wrapper
│   │   └── Sidebar.jsx              # Navigation sidebar
│   │
│   ├── context/                     # Context API providers
│   │   └── AuthContext.jsx          # Authentication state management
│   │
│   ├── hooks/                       # Custom React hooks (empty for now)
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── Login.jsx                # Login page
│   │   ├── Register.jsx             # Registration page
│   │   ├── Onboarding.jsx           # 3-step preference wizard
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Courses.jsx              # Course explorer
│   │   ├── CourseLearning.jsx       # Course learning interface
│   │   ├── Analytics.jsx            # Learning analytics
│   │   └── Profile.jsx              # User profile
│   │
│   ├── App.jsx                      # Main app component with routing
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles + Tailwind directives
│   └── App.css                      # Component-specific styles
│
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind customization
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint rules
└── README.md                        # Project documentation
```

---

## 🔄 Data Flow

### **1. Application Initialization**
```
main.jsx
  ├─> Renders <App /> inside <StrictMode>
  │
App.jsx
  ├─> Wraps everything in <AuthProvider>
  ├─> Sets up <Router> for navigation
  └─> Defines <Routes> for all pages
```

### **2. Authentication Flow**
```
User visits app
  │
  ├─> Not logged in? → /login
  │     │
  │     ├─> Enter credentials
  │     ├─> AuthContext.login() called
  │     ├─> User state updated
  │     └─> Redirect to /dashboard
  │
  └─> Already logged in? → Access protected routes
```

### **3. Registration & Onboarding Flow**
```
/register
  │
  ├─> User fills form (name, email, password, interests)
  ├─> AuthContext.register() called
  ├─> User created with needsOnboarding: true
  └─> Redirect to /onboarding
       │
       ├─> Step 1: Learning Preferences
       │    (Goal, Difficulty, Style, Time)
       ├─> Step 2: Interest Categories
       │    (Web Dev, AI/ML, Cloud, etc.)
       └─> Step 3: Current Status
            (Level, Completed Courses, Learning)
            │
            ├─> updateUserPreferences() called
            ├─> Preferences saved to user object
            └─> Redirect to /dashboard
```

### **4. Dashboard to Course Learning Flow**
```
/dashboard
  │
  ├─> Shows recommended topics based on preferences
  ├─> User clicks "Continue Learning" on a topic
  │
/course/:courseId
  │
  ├─> Loads course data (currently mock)
  ├─> Displays video player + curriculum
  ├─> User watches lessons
  ├─> Marks lessons complete
  ├─> Progress updates in real-time
  └─> Downloads resources, takes notes
```

---

## 🗂️ Component Breakdown

### **1. Context (State Management)**

#### `src/context/AuthContext.jsx`
**Purpose**: Manages global authentication state

```javascript
{
  user: {
    id: 123,
    name: "John Doe",
    email: "john@example.com",
    needsOnboarding: false,
    preferences: {
      learningGoal: "career-advancement",
      preferredDifficulty: "intermediate",
      selectedCategories: ["web-dev", "ai-ml"],
      // ... more preferences
    }
  },
  isAuthenticated: true,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateUserPreferences: () => {}
}
```

**Key Features**:
- ✅ Simplified authentication (no localStorage for now)
- ✅ User registration with onboarding flag
- ✅ Preference updates from onboarding
- ✅ Global user state accessible via `useAuth()` hook

---

### **2. Routing (App.jsx)**

#### Route Structure:
```javascript
PUBLIC ROUTES (No authentication required)
├── /login          → Login.jsx
└── /register       → Register.jsx

PROTECTED ROUTES (Requires authentication)
├── /onboarding     → Onboarding.jsx     (3-step wizard)
├── /dashboard      → Dashboard.jsx       (Main hub)
├── /courses        → Courses.jsx         (Course explorer)
├── /course/:id     → CourseLearning.jsx  (Learning interface)
├── /analytics      → Analytics.jsx       (Charts & stats)
└── /profile        → Profile.jsx         (User info)
```

**ProtectedRoute Component**:
```javascript
// Wraps routes to check authentication
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// If not authenticated → Redirect to /login
// If authenticated → Render the component
```

---

### **3. Pages**

#### **A. Login.jsx**
- **Purpose**: User login
- **Features**: Email/password validation, error handling, redirect to dashboard
- **State**: Uses `useAuth()` context

#### **B. Register.jsx**
- **Purpose**: New user registration
- **Features**: Form validation, interest selection, redirect to onboarding
- **Data Collected**: Name, email, password, interests
- **Flow**: Register → Set `needsOnboarding: true` → Navigate to `/onboarding`

#### **C. Onboarding.jsx** ⭐
- **Purpose**: 3-step personalization wizard
- **Step 1**: Learning preferences (goal, difficulty, style, time commitment)
- **Step 2**: Interest categories (web dev, AI/ML, cloud, etc.)
- **Step 3**: Current status (level, completed courses, currently learning)
- **Features**: 
  - Progress indicator (Step X of 3)
  - Form validation at each step
  - Skip option
  - Saves all data to `AuthContext.updateUserPreferences()`

#### **D. Dashboard.jsx** 🏠
- **Purpose**: Main landing page after login
- **Features**:
  - Welcome message with user name
  - Quick stats (Learning Hours, Courses, Streak, Achievements)
  - Recommended topics based on onboarding preferences
  - "Continue Learning" buttons linking to `/course/:id`
  - Recent activity feed
  - Includes Sidebar for navigation

#### **E. Courses.jsx**
- **Purpose**: Browse and explore all available courses
- **Features**:
  - Grid/List view toggle
  - Filter by category, difficulty, status
  - Search functionality
  - Course cards showing:
    - Instructor, duration, difficulty
    - Enrollment status
    - "Enroll" or "Continue Learning" button
  - Mock data: 12 courses across different categories

#### **F. CourseLearning.jsx** 📚 ⭐
- **Purpose**: Complete course learning interface
- **Features**:
  - **Video Player**: Embedded YouTube iframe
  - **4 Tabs**: Overview, Video, Resources, Projects
  - **Curriculum Sidebar**: All modules and lessons
  - **Progress Tracking**: Visual progress bar (%)
  - **Lesson Completion**: Mark as complete button
  - **Resources**: Downloadable PDFs, code examples
  - **Notes**: Personal note-taking per lesson
  - **Projects**: Practice assignments
- **Mock Data**: 3 modules, 7 lessons with videos
- **Navigation**: Click any lesson in sidebar to jump to it

#### **G. Analytics.jsx**
- **Purpose**: Visualize learning progress and statistics
- **Features**:
  - Line chart: Learning hours over time
  - Bar chart: Course completion by category
  - Area chart: Skill progress over months
  - Pie chart: Time distribution across topics
- **Library**: Uses Recharts for visualizations

#### **H. Profile.jsx**
- **Purpose**: View and edit user profile
- **Features**:
  - Personal info (name, email, bio)
  - Onboarding preferences display
  - Learning statistics
  - Account settings section

---

### **4. Components**

#### **A. Sidebar.jsx**
- **Purpose**: Navigation menu for protected pages
- **Features**:
  - Logo and app name
  - Navigation links with icons
  - Active route highlighting
  - Logout button
  - Fixed position on left side
  - Routes: Dashboard, Courses, Analytics, Profile

#### **B. ProtectedRoute.jsx**
- **Purpose**: Authentication wrapper for private routes
- **Logic**:
  ```javascript
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children; // Render the protected page
  ```

---

### **5. API Configuration**

#### **src/api/axiosInstance.js**
- **Purpose**: Centralized HTTP client for API calls
- **Configuration**:
  - Base URL: `http://localhost:5000/api` (for future Spring Boot backend)
  - Default headers: `Content-Type: application/json`
  
- **Request Interceptor**:
  ```javascript
  // Automatically adds JWT token to every request
  config.headers.Authorization = `Bearer ${token}`;
  ```

- **Response Interceptor**:
  ```javascript
  // Handles 401 errors (unauthorized)
  if (error.response?.status === 401) {
    // Clear token and redirect to login
  }
  ```

- **Current Status**: Configured but not actively used (mock data for now)

---

## 🎨 Styling System

### **Tailwind CSS Configuration**

#### **Custom Color Palette**
```javascript
colors: {
  primary: '#4F46E5' (Indigo)
    - Used for buttons, links, active states
    - Shades: 50-900 for various UI elements
  
  secondary: '#64748B' (Slate Gray)
    - Used for text, borders, backgrounds
    - Shades: 50-900 for text hierarchy
}
```

#### **Utility Classes** (in `index.css`)
```css
.card          → White background, shadow, rounded corners
.btn-primary   → Primary color button with hover effects
.btn-secondary → Secondary color button
.input-field   → Styled form input with focus state
.fade-in       → Opacity animation
.slide-up      → Slide up animation
```

---

## 🔑 Key Features Explained

### **1. Authentication System**
**Current Implementation**:
- ✅ **Simplified for development** (no localStorage)
- ✅ Uses **Context API** for global state
- ✅ Mock login (validates fields, sets user state)
- ✅ Mock registration (creates user object)

**Future Integration** (Spring Boot):
```javascript
// Will replace mock logic
const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', {
    email, password
  });
  localStorage.setItem('token', response.data.token);
  setUser(response.data.user);
};
```

---

### **2. Onboarding System** ⭐
**Purpose**: Personalize learning experience

**Data Collected**:
```javascript
preferences: {
  // Step 1
  learningGoal: 'career-advancement',
  preferredDifficulty: 'intermediate',
  learningStyle: 'practical',
  dailyTimeCommitment: '2 hours',
  
  // Step 2
  selectedCategories: ['web-dev', 'ai-ml'],
  
  // Step 3
  currentLevel: 'Some Experience',
  completedCourses: 5,
  currentlyLearning: ['React', 'Python', 'Docker']
}
```

**Usage**: Dashboard uses these preferences to recommend relevant courses

---

### **3. Course Learning Interface** 📚
**Complete learning experience**:

```
Header: [Back] Course Name by Instructor [Progress Bar 65%]
│
├─ LEFT (2/3 width)
│   │
│   ├─ Tabs: [Overview] [Video] [Resources] [Projects]
│   │
│   └─ Tab Content:
│       ├─ Overview: Course description, stats
│       ├─ Video: Video player + lesson resources + notes
│       ├─ Resources: Downloadable course materials
│       └─ Projects: Practice assignments
│
└─ RIGHT (1/3 width)
    │
    └─ Curriculum Sidebar (Sticky)
        │
        ├─ Module 1: React Hooks Deep Dive
        │   ├─ ✓ Lesson 1: Introduction (completed)
        │   ├─ ▶ Lesson 2: useCallback (current)
        │   └─   Lesson 3: Custom Hooks
        │
        └─ Module 2: Context API
            └─ ...
```

---

### **4. Progress Tracking**
**How it works**:
```javascript
// Calculate progress
const totalLessons = course.modules
  .flatMap(m => m.lessons).length;

const progress = Math.round(
  completedLessons.length / totalLessons * 100
);

// Visual representation
<div className="bg-gray-200 rounded-full h-2">
  <div 
    className="bg-primary h-2 rounded-full"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 🔌 Spring Boot Integration Points

### **Ready for Backend Connection**

#### **1. Authentication Endpoints**
```javascript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### **2. Course Endpoints**
```javascript
GET  /api/courses              // All courses
GET  /api/courses/:id          // Single course details
POST /api/courses/:id/enroll   // Enroll in course
GET  /api/courses/recommended  // Based on user preferences
```

#### **3. Progress Endpoints**
```javascript
POST /api/progress/lesson/:id/complete
GET  /api/progress/user/:userId
POST /api/notes/lesson/:lessonId
GET  /api/notes/lesson/:lessonId
```

#### **4. Analytics Endpoints**
```javascript
GET /api/analytics/user/:userId/hours
GET /api/analytics/user/:userId/completion
GET /api/analytics/user/:userId/skills
```

---

## 🚀 How Everything Works Together

### **Complete User Journey**

```
1. USER VISITS APP
   └─> App.jsx loads
       └─> AuthContext wraps entire app
           └─> Router handles navigation

2. NOT AUTHENTICATED
   └─> ProtectedRoute redirects to /login
       └─> User enters credentials
           └─> login() called in AuthContext
               └─> User state set
                   └─> Navigate to /dashboard

3. NEW USER REGISTRATION
   └─> /register page
       └─> User fills form
           └─> register() called
               └─> needsOnboarding: true set
                   └─> Navigate to /onboarding
                       └─> 3-step wizard
                           └─> updateUserPreferences()
                               └─> Navigate to /dashboard

4. DASHBOARD (Main Hub)
   └─> Sidebar loaded for navigation
       └─> User stats displayed
           └─> Recommended courses shown
               └─> Click "Continue Learning"
                   └─> Navigate to /course/:id

5. COURSE LEARNING
   └─> Load course data (mock for now)
       └─> Display video player
           └─> Show curriculum sidebar
               └─> User clicks lesson
                   └─> Video loads
                       └─> Watch → Mark complete
                           └─> Progress updates
                               └─> Next lesson

6. OTHER FEATURES
   └─> /courses → Browse all courses
   └─> /analytics → View learning stats
   └─> /profile → View/edit profile
   └─> Logout → Clear user state → /login
```

---

## 📊 Mock Data vs. Real Data

### **Current State (Mock Data)**

All data is **hardcoded in components**:
- ✅ User preferences (from onboarding)
- ✅ Course list (12 courses in Courses.jsx)
- ✅ Course details (modules, lessons in CourseLearning.jsx)
- ✅ Analytics data (charts in Analytics.jsx)
- ✅ User stats (Dashboard.jsx)

### **Future State (Spring Boot Backend)**

Replace mock data with API calls:
```javascript
// Example: Load courses
useEffect(() => {
  const fetchCourses = async () => {
    const response = await axiosInstance.get('/courses');
    setCourses(response.data);
  };
  fetchCourses();
}, []);
```

---

## 🎯 Key Takeaways

### **What This Project Does**
✅ Provides personalized learning path recommendations  
✅ Allows users to browse and enroll in courses  
✅ Offers complete course learning with videos and resources  
✅ Tracks progress and displays analytics  
✅ Collects user preferences through onboarding  

### **Current Architecture**
✅ **Frontend-only** with mock data  
✅ **React** + **Vite** + **Tailwind CSS**  
✅ **Context API** for state management  
✅ **React Router** for navigation  
✅ **Protected Routes** for authentication  

### **Ready for Integration**
✅ Axios instance configured  
✅ JWT interceptors ready  
✅ API endpoint structure planned  
✅ Just needs Spring Boot backend connection  

### **User Experience Flow**
```
Register → Onboarding → Dashboard → Browse Courses → 
Learn Course → Track Progress → View Analytics → Manage Profile
```

---

## 🔍 Technical Highlights

### **1. Modern React Patterns**
- Functional components with hooks
- Context API for global state
- Custom hooks ready for expansion
- Component composition

### **2. Responsive Design**
- Tailwind CSS utility classes
- Mobile-first approach
- Grid/Flexbox layouts
- Custom breakpoints

### **3. Developer Experience**
- Vite for fast HMR (Hot Module Replacement)
- ESLint for code quality
- Clean folder structure
- Comprehensive documentation

### **4. Performance**
- Code splitting ready
- Lazy loading (can be added)
- Optimized re-renders with proper state management

---

## 📝 Summary

This is a **full-featured learning platform frontend** built with modern React best practices. It's currently running on **mock data** and is architecturally ready for Spring Boot backend integration. The project demonstrates:

- ✅ **Complete user authentication flow**
- ✅ **Personalized onboarding experience**
- ✅ **Rich course learning interface**
- ✅ **Progress tracking and analytics**
- ✅ **Professional UI/UX with Tailwind CSS**
- ✅ **Scalable and maintainable code structure**

**Next Steps**: Connect to Spring Boot backend to replace mock data with real API calls! 🚀

