# 🎨 Loading Animation Demo

## How to View the Demo

1. **Start your development server** (if not already running):

   ```bash
   npm run dev
   ```

2. **Navigate to the demo page**:

   - Open your browser and go to: `http://localhost:5173/loading-demo`
   - Or add `/loading-demo` to your current URL

3. **Try the demo**:
   - Click "▶️ Start Demo" to see the animation
   - Click "🔄 Reset" to restart the demo

## 🎯 What You'll See

### Learning Path Progress Bar Animation Features:

1. **Curved SVG Path**

   - Smooth animated line that fills from left to right
   - Uses your brand gradient (blue to gold)
   - Glowing shadow effect

2. **4 Animated Milestones**

   - 🎯 Target - "Setting up your goals" (25%)
   - 📚 Books - "Loading courses" (50%)
   - 🏆 Trophy - "Preparing achievements" (75%)
   - ✅ Check - "Almost ready!" (100%)

3. **Dynamic Effects**

   - Moving white dot travels along the path
   - Milestones bounce when reached
   - Lordicons animate at each milestone
   - Checkmarks appear when milestones are completed
   - Gold glow effect on active milestones

4. **Loading States**

   - Real-time percentage counter
   - Dynamic loading text updates
   - Motivational quote at the bottom
   - Backup progress bar below the path

5. **Visual Design**
   - Gradient background (navy to blue)
   - PathForge logo with pulsing animation
   - Smooth transitions throughout
   - Responsive layout

## 🔧 Customization Options

You can easily customize:

- **Speed**: Change `setInterval` timing (currently 30ms = ~3 seconds total)
- **Milestones**: Add/remove milestone points and icons
- **Colors**: Already uses your brand colors
- **Path Shape**: Modify the SVG path `d` attribute for different curves
- **Text**: Update loading messages for each milestone

## 📁 Files Created

1. **`src/components/LoadingAnimation.jsx`** - The main loading animation component
2. **`src/pages/LoadingDemo.jsx`** - Demo page with controls and documentation
3. **Route added** to `App.jsx` at `/loading-demo`

## 🚀 Implementation

To use this in your actual app:

```jsx
import LoadingAnimation from "./components/LoadingAnimation";

function YourComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingAnimation onComplete={() => setLoading(false)} />}
      {/* Your content */}
    </>
  );
}
```

## 💡 Best Use Cases

- Initial app load (splash screen)
- Course content loading
- Dashboard data fetching
- Profile initialization
- Onboarding process transitions

Enjoy the demo! 🎉
