import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600 text-3xl" />
          <span className="text-2xl font-bold text-indigo-600">
            EventHub
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>

        <Link
          to="/register"
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;