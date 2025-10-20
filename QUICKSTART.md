# Quick Start Guide

## 🚀 Running the Application

### Step 1: Install Dependencies
```powershell
cd "Learning path"
npm install
```

### Step 2: Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```powershell
npm run dev
```

The app will be available at `http://localhost:5173`

## 📋 Default Mock Data

Since the backend API isn't connected yet, the app uses mock data:

### Mock User for Testing
- **Email**: Any valid email format
- **Password**: Any password (for demo purposes)

The app will show demo data for:
- Dashboard recommendations
- Course listings
- Analytics charts
- User profile

## 🎯 Testing the Features

### 1. Login/Register Flow
- Navigate to `/login` or `/register`
- Enter any credentials (mock authentication)
- You'll be redirected to the dashboard

### 2. Dashboard
- View welcome message
- See stats overview (courses, hours, accuracy)
- Browse recommended topics with progress

### 3. Courses Explorer
- Switch between grid and list views
- Use filters (difficulty, category, status)
- Click "Add to Learning Path" to enroll

### 4. Analytics
- View monthly completion trends
- Check performance over time
- See category-wise strengths
- Review learning distribution

### 5. Profile
- View user information
- Edit profile details
- Check earned badges
- Review learning preferences

### 6. Navigation
- Use sidebar to navigate between pages
- Logout returns to login page

## 🔧 Customization

### Update API Endpoint
Edit `.env`:
```env
VITE_API_URL=https://your-api-url.com/api
```

### Modify Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { DEFAULT: '#4F46E5', ... },
  secondary: { DEFAULT: '#64748B', ... }
}
```

### Add New Routes
Edit `src/App.jsx` to add new protected routes:
```javascript
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

## 📦 Build for Production

```powershell
npm run build
```

Preview production build:
```powershell
npm run preview
```

## 🐛 Troubleshooting

### Issue: CSS not loading
- Make sure Tailwind config files exist
- Check that `index.css` includes Tailwind directives
- Restart dev server

### Issue: Routes not working
- Ensure React Router DOM is installed
- Check that BrowserRouter wraps the app
- Verify route paths in App.jsx

### Issue: API calls failing
- Check `.env` file exists and is configured
- Verify API endpoint is correct
- Check browser console for errors

## 📝 Next Steps

1. **Connect to Backend**: Replace mock data with real API calls
2. **Add Form Validation**: Use libraries like Formik or React Hook Form
3. **Implement Search**: Add course search functionality
4. **Add Pagination**: Implement pagination for courses
5. **Enhance Analytics**: Add more chart types and filters
6. **Add Testing**: Set up Jest and React Testing Library
7. **Optimize Performance**: Add lazy loading and code splitting

## 📞 Support

For issues or questions, refer to the main README.md file.
