import { useEffect, useState } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import PageHeader from "../components/PageHeader";
import { useLayout } from "../context/LayoutContext";

const LoadingDemo = () => {
  const { setHeaderActions, resetHeaderActions } = useLayout();
  const [showLoading, setShowLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleStartDemo = () => {
    setShowLoading(true);
    setLoadingComplete(false);
  };

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setShowLoading(false);
    setLoadingComplete(false);
  };

  useEffect(() => {
    setHeaderActions({ showProfileButton: false });
    return () => resetHeaderActions();
  }, [resetHeaderActions, setHeaderActions]);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Loading Animation Demo" />

      <div className="max-w-4xl mx-auto p-8">
        <div className="card p-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            🎨 Learning Path Progress Bar Demo
          </h1>
          <p className="text-text-secondary mb-8">
            This is the loading animation for PathForge - watch as your learning path comes to life!
          </p>

          {/* Demo Controls */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={handleStartDemo}
              disabled={showLoading}
              className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶️ Start Demo
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 text-lg bg-gray-200 hover:bg-gray-300 text-text-primary rounded-lg transition-all font-semibold"
            >
              🔄 Reset
            </button>
          </div>

          {/* Features List */}
          <div className="bg-primary/5 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold text-text-primary mb-4">✨ Animation Features:</h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">🎯</span>
                <span>
                  <strong>Curved Path Animation:</strong> A smooth SVG path that fills with your
                  brand gradient
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">🏆</span>
                <span>
                  <strong>Animated Lordicon Milestones:</strong> Each milestone uses your existing
                  Lordicons (Target, Books, Trophy, Check)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">💫</span>
                <span>
                  <strong>Dynamic Progress:</strong> Real-time updates with smooth transitions and
                  bouncing animations
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">🎨</span>
                <span>
                  <strong>Brand Colors:</strong> Uses your exact color scheme (navy blue, primary
                  blue, gold)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">✅</span>
                <span>
                  <strong>Completion Indicators:</strong> Checkmarks appear as milestones are passed
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3 text-xl">🚀</span>
                <span>
                  <strong>Moving Traveler:</strong> A glowing dot travels along the path showing
                  real-time progress
                </span>
              </li>
            </ul>
          </div>

          {/* Status */}
          {loadingComplete && (
            <div className="mt-8 p-4 bg-green-100 border-2 border-green-500 rounded-lg">
              <p className="text-green-700 font-semibold text-lg">
                ✅ Loading Complete! Animation finished successfully.
              </p>
            </div>
          )}
        </div>

        {/* Implementation Note */}
        <div className="mt-8 card p-6 bg-gold/10 border-2 border-gold/30">
          <h3 className="text-lg font-semibold text-text-primary mb-3">💡 Implementation Notes:</h3>
          <ul className="text-text-secondary space-y-2 text-sm">
            <li>• Can be used during initial app load, course loading, or data fetching</li>
            <li>• Fully responsive and works on all screen sizes</li>
            <li>• Uses existing Lordicon assets - no additional dependencies needed</li>
            <li>• Smooth 3-second animation (adjustable)</li>
            <li>• Callback support for triggering actions when loading completes</li>
          </ul>
        </div>
      </div>

      {/* Show Loading Animation */}
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
    </div>
  );
};

export default LoadingDemo;
