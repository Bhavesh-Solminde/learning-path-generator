import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faChartLine, faRocket, faGraduationCap, faArrowRight } from "../icons";

const LandingPage = () => {
  return (
    <div className="page-shell">
      <div className="page-shell__backdrop">
        <div className="page-shell__glow page-shell__glow--left" />
        <div className="page-shell__glow page-shell__glow--right" />
        <div className="page-shell__noise" />
      </div>

      <div className="page-shell__content flex flex-col">
        {/* Navbar */}
        <nav className="container mx-auto px-6 py-6">
          <div className="glass-nav flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/25">
                <FontAwesomeIcon icon={faGraduationCap} className="text-lg" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PathForge</span>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="btn-ghost">
                Log In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1">
          <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
            <div className="fade-in relative z-10 max-w-4xl space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-accent-blue backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue"></span>
                </span>
                AI-Powered Learning Paths
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                Master Your <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
                Create personalized learning paths, track your progress, and achieve your goals with
                our intelligent learning management system.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/register" className="btn-primary h-14 px-8 text-lg">
                  Start Learning Now
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link to="/login" className="btn-secondary h-14 px-8 text-lg">
                  View Demo
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative z-10 py-24">
            <div className="container mx-auto px-6">
              <div className="grid gap-8 md:grid-cols-3">
                <FeatureCard
                  icon={faBrain}
                  title="Smart Learning Paths"
                  description="AI-driven curriculum generation tailored to your specific goals and current skill level."
                  color="text-blue-400"
                />
                <FeatureCard
                  icon={faChartLine}
                  title="Progress Tracking"
                  description="Visual analytics and detailed insights to keep you motivated and on track."
                  color="text-violet-400"
                />
                <FeatureCard
                  icon={faRocket}
                  title="Skill Mastery"
                  description="Interactive exercises and project-based learning to ensure deep understanding."
                  color="text-fuchsia-400"
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 bg-black/20 py-12 backdrop-blur-xl">
          <div className="container mx-auto px-6 text-center">
            <p className="text-zinc-500">
              &copy; {new Date().getFullYear()} PathForge. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="card group p-8 hover:bg-white/10">
    <div
      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl ${color} shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
    <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
