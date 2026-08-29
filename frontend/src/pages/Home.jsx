import { Link } from 'react-router-dom';
import logo from '../assets/Task Manager Logo.png';
import heroImage from '../assets/Task Manager.png';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="TaskFlow Logo" className="w-16 h-16 object-contain bg-white/20 rounded-lg p-1" />
          <span className="text-white text-xl font-bold">TaskFlow</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-white/90 hover:text-white font-medium px-4 py-2 transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-white text-slate-800 font-semibold px-5 py-2 rounded-lg hover:bg-white/90 transition shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur">
            ✨ Organize smarter, not harder
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Manage your tasks with clarity and focus
          </h1>

          <p className="text-white/80 text-lg mt-6 max-w-xl">
            Track priorities, energy levels, and deadlines — all in one
            clean, simple dashboard built for real productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
            <Link
              to="/register"
              className="bg-white text-slate-800 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border border-white/40 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroImage}
            alt="Task Manager Preview"
            className="max-w-md w-full rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-white font-semibold mb-1">Energy Aware</h3>
          <p className="text-white/70 text-sm">
            Tag tasks by energy level and tackle them at the right time.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="text-white font-semibold mb-1">Deadline Smart</h3>
          <p className="text-white/70 text-sm">
            Never miss a due date with visual urgency indicators.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-left">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-white font-semibold mb-1">Private & Secure</h3>
          <p className="text-white/70 text-sm">
            Your tasks are yours alone, protected with secure login.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;