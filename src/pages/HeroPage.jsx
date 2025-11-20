import React, { useState, useEffect } from "react";
import { Play, ArrowRight, ShieldCheck, Users, Zap, Command, Cpu, Globe } from "lucide-react";

const PathForgePremiumHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* --- Ambient Lighting --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-30 mix-blend-screen"></div>
        {/* Subtle Noise Texture for that "Film" look */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      {/* --- Navbar: Minimal & Floating --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
              <Command size={16} />
            </div>
            <span className="font-semibold tracking-tight text-sm">PathForge</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">
              Methodology
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Mentors
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Enterprise
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-sm text-zinc-300 hover:text-white transition-colors px-3">
              Log in
            </button>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
              Start Trial
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Hero Content --- */}
      <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
            v2.0 Platform Live
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 transition-all duration-1000 delay-100 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Mastery, <br className="hidden md:block" />
          Engineered.
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed transition-all duration-1000 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          The premier learning ecosystem for elite developers. We don't just teach syntax; we forge
          architectural thinking through{" "}
          <span className="text-white font-medium">simulation-based learning</span>.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button className="group relative h-12 px-8 rounded-full bg-white text-black font-semibold flex items-center gap-2 overflow-hidden">
            <span className="relative z-10">Start Learning</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform group-hover:translate-x-1"
            />
            <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <button className="h-12 px-8 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all hover:border-zinc-700">
            <Play size={16} fill="currentColor" />
            Watch the Film
          </button>
        </div>

        {/* --- The "Product" Visual --- */}
        <div
          className={`mt-24 relative w-full max-w-5xl aspect-[16/9] transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Glow behind the image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>

          {/* The Glass Interface */}
          <div className="relative h-full w-full bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Window Controls */}
            <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-black/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              </div>
              <div className="text-xs font-mono text-zinc-500">pathforge_env_v2</div>
              <div className="w-4"></div>
            </div>

            {/* Interface Content */}
            <div className="flex-1 flex relative">
              {/* Sidebar */}
              <div className="w-64 border-r border-white/5 hidden md:block bg-black/20 p-6 space-y-8">
                <div className="space-y-4">
                  <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                  <div className="h-8 w-full bg-white/5 rounded-lg border border-white/5"></div>
                  <div className="h-8 w-full bg-transparent rounded-lg"></div>
                </div>
                <div className="space-y-3 pt-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded border border-zinc-700"></div>
                      <div className="h-2 w-20 bg-zinc-800 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Canvas */}
              <div className="flex-1 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                {/* Abstract Graphics */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]"></div>

                {/* Center "Node" Animation */}
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-white to-zinc-400 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer border border-white">
                    <Cpu size={40} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">System Design</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Simulation
                  </div>
                </div>

                {/* Floating Elements */}
                <FloatingCard
                  className="absolute top-10 right-10"
                  icon={<Globe size={16} />}
                  label="Global Edge"
                />
                <FloatingCard
                  className="absolute bottom-10 left-10"
                  icon={<Zap size={16} />}
                  label="Latency: 12ms"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- Trust Section --- */}
      <section className="py-12 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-zinc-500 mb-8">
            Trusted by engineering teams at forward-thinking companies
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {["Acme Corp", "Nebula", "Vertex", "Horizon", "Pinnacle"].map((brand) => (
              <span key={brand} className="text-xl font-bold text-zinc-300 font-serif italic">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Value Grid --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <ValueCard
            icon={<ShieldCheck className="text-white" />}
            title="Enterprise Grade"
            desc="Security and scalability protocols taught by ex-FAANG architects."
          />
          <ValueCard
            icon={<Users className="text-white" />}
            title="Peer Review"
            desc="Get your code reviewed by senior developers, not just automated scripts."
          />
          <ValueCard
            icon={<Zap className="text-white" />}
            title="Rapid Velocity"
            desc="From concept to deployment 3x faster with our boilerplates."
          />
        </div>
      </section>
    </div>
  );
};

const FloatingCard = ({ icon, label, className }) => (
  <div
    className={`bg-zinc-900/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg ${className} animate-bounce duration-[3000ms]`}
  >
    <div className="text-zinc-400">{icon}</div>
    <span className="text-xs font-mono text-zinc-300">{label}</span>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all duration-300">
    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default PathForgePremiumHero;
