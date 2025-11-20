import { useState, useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "../icons";

// Import Lordicon assets
import targetIcon from "./assets/Target.json";
import booksIcon from "./assets/Books.json";
import trophyIcon from "./assets/Medal.json";
import checkIcon from "./assets/Check.json";

const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Refs for Lordicons
  const targetRef = useRef(null);
  const booksRef = useRef(null);
  const trophyRef = useRef(null);
  const checkRef = useRef(null);

  const milestones = [
    {
      position: 25,
      icon: targetRef,
      label: "Setting up your goals",
      lordicon: targetIcon,
    },
    {
      position: 50,
      icon: booksRef,
      label: "Loading courses",
      lordicon: booksIcon,
    },
    {
      position: 75,
      icon: trophyRef,
      label: "Preparing achievements",
      lordicon: trophyIcon,
    },
    {
      position: 100,
      icon: checkRef,
      label: "Almost ready!",
      lordicon: checkIcon,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(() => onComplete(), 500);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Completes in ~3 seconds

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Update milestone and text based on progress
    milestones.forEach((milestone, index) => {
      if (progress >= milestone.position && currentMilestone < index + 1) {
        setCurrentMilestone(index + 1);
        setLoadingText(milestone.label);
        milestone.icon.current?.playFromBeginning();
      }
    });
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-navbar via-navbar-light to-primary flex items-center justify-center z-50">
      <div className="max-w-2xl w-full px-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-white font-bold text-2xl">PF</span>
          </div>
          <span className="text-4xl font-bold text-white ml-4">PathForge</span>
        </div>

        {/* Loading Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">{loadingText}</h2>
          <p className="text-primary text-sm">{progress}% Complete</p>
        </div>

        {/* Learning Path Progress Bar */}
        <div className="relative h-32 mb-8">
          {/* The Path - SVG curved line */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background path (gray) */}
            <path
              d="M 50 60 Q 200 20, 350 60 T 750 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Animated progress path (gradient) */}
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(0, 102, 204)" />
                <stop offset="100%" stopColor="rgb(255, 215, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 50 60 Q 200 20, 350 60 T 750 60"
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (progress / 100) * 1000}
              style={{
                transition: "stroke-dashoffset 0.3s ease-out",
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
              }}
            />
          </svg>

          {/* Milestone Icons */}
          {milestones.map((milestone, index) => {
            const xPosition = 50 + (milestone.position / 100) * 700;
            const yPosition = index % 2 === 0 ? 45 : 75;
            const isPassed = progress >= milestone.position;
            const isActive =
              progress >= milestone.position - 5 && progress < milestone.position + 5;

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${xPosition / 8}%`,
                  top: `${yPosition}%`,
                }}
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPassed ? "bg-gold shadow-2xl scale-110" : "bg-white/20 scale-90"
                  } ${isActive ? "animate-bounce" : ""}`}
                  style={{
                    boxShadow: isPassed ? "0 0 30px rgba(255, 215, 0, 0.8)" : "none",
                  }}
                >
                  {isPassed ? (
                    <div className="w-10 h-10">
                      <Player
                        ref={milestone.icon}
                        icon={milestone.lordicon}
                        size={40}
                        // colorize="#FFFFFF"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/30"></div>
                  )}
                </div>

                {/* Checkmark for completed milestones */}
                {isPassed && progress > milestone.position + 10 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Animated traveler (moving dot) */}
          {/* <div
            className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `${(50 + (progress / 100) * 700) / 8}%`,
              top: "50%",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
              animation: "pulse 1s infinite",
            }}
          />*/}
        </div>

        {/* Progress Percentage Bar (backup) */}
        {/* <div className="relative h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgb(0, 102, 204) 0%, rgb(255, 215, 0) 100%)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)",
            }}
          /> 
        </div> */}

        {/* Fun Loading Tips */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm italic">
            "Every expert was once a beginner. Keep learning! 🚀"
          </p>
        </div>
      </div>

      {/* Pulsing animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
