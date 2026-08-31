import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Manage Events",
    path: "/events",
    icon: <FaCalendarAlt />,
  },
  {
    name: "Participants",
    path: "/participants",
    icon: <FaUsers />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FaChartBar />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 theme-sidebar z-40">

      {/* Logo */}

      <div className="h-20 flex items-center px-6 border-b border-slate-200">

        <div className="w-10 h-10 rounded-xl theme-gradient flex items-center justify-center mr-3">
          📅
        </div>

        <div>
          <h1 className="text-xl font-extrabold theme-text">
            EventHub
          </h1>

          <p className="text-xs theme-secondary-text">
            Event Management
          </p>
        </div>

      </div>


      {/* Navigation */}

      <nav className="p-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "theme-sidebar-active shadow-lg"
                  : "hover:bg-slate-100"
              }`
            }
          >

            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* Bottom card */}

      <div className="absolute bottom-6 left-4 right-4">

        <div className="theme-gradient rounded-2xl p-5">

          <p className="font-bold">
            Ready to host?
          </p>

          <p className="text-sm opacity-90 mt-1">
            Create your next amazing event.
          </p>

          <button className="mt-4 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-semibold">
            Create Event
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;