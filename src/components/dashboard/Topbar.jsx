import { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="theme-topbar sticky top-0 z-40 px-6 py-4">

      <div className="flex items-center justify-between gap-6">

        {/* Search */}
        <div className="relative w-full max-w-xl">

          {/* Search Icon */}
          <FaSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              pointer-events-none
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events, participants..."
            className="
              w-full
              h-11
              pl-11
              pr-4
              rounded-xl
              border
              border-gray-200
              dark:border-slate-600
              bg-gray-50
              dark:bg-slate-700
              text-gray-800
              dark:text-white
              placeholder:text-gray-400
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-transparent
              transition-all
              duration-300
            "
          />

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="
                relative
                w-11
                h-11
                rounded-xl
                flex
                items-center
                justify-center
                theme-icon-button
                hover:scale-105
                transition-all
                duration-300
              "
            >

              <FaBell className="text-lg" />

              {/* Notification Badge */}
              <span
                className="
                  absolute
                  top-2
                  right-2
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-red-500
                  border-2
                  border-white
                  dark:border-slate-800
                "
              />

            </button>


            {/* Notification Dropdown */}
            {showNotifications && (

              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-80
                  theme-card
                  rounded-2xl
                  shadow-xl
                  border
                  p-4
                  animate-dropdown
                "
              >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="font-bold text-lg">
                    Notifications
                  </h3>

                  <span className="text-xs text-indigo-500 font-semibold">
                    3 New
                  </span>

                </div>


                <div className="space-y-3">

                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-slate-700">
                    <p className="font-semibold text-sm">
                      New participant registered
                    </p>

                    <p className="text-xs theme-secondary-text mt-1">
                      Rahul Kumar registered for Tech Conference.
                    </p>
                  </div>


                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-slate-700">
                    <p className="font-semibold text-sm">
                      Event successfully created
                    </p>

                    <p className="text-xs theme-secondary-text mt-1">
                      AI Workshop has been added.
                    </p>
                  </div>


                  <div className="p-3 rounded-xl bg-orange-50 dark:bg-slate-700">
                    <p className="font-semibold text-sm">
                      Event reminder
                    </p>

                    <p className="text-xs theme-secondary-text mt-1">
                      Cultural Fest starts in 3 days.
                    </p>
                  </div>

                </div>

              </div>

            )}

          </div>


          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-slate-600" />


          {/* Profile */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setShowProfile(!showProfile)}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-2
                py-1.5
                hover:bg-gray-100
                dark:hover:bg-slate-700
                transition-all
                duration-300
              "
            >

              {/* Avatar */}
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  theme-gradient
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-md
                "
              >
                <FaUserCircle className="text-2xl" />
              </div>


              {/* User Details */}
              <div className="hidden md:block text-left">

                <p className="font-semibold text-sm">
                  Admin
                </p>

                <p className="theme-secondary-text text-xs">
                  Administrator
                </p>

              </div>


              <FaChevronDown
                className={`
                  hidden sm:block
                  text-xs
                  theme-secondary-text
                  transition-transform
                  duration-300
                  ${showProfile ? "rotate-180" : ""}
                `}
              />

            </button>


            {/* Profile Dropdown */}
            {showProfile && (

              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-52
                  theme-card
                  rounded-2xl
                  shadow-xl
                  border
                  p-2
                  animate-dropdown
                "
              >

                <button
                  type="button"
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-gray-100
                    dark:hover:bg-slate-700
                    transition
                  "
                >
                  👤 My Profile
                </button>


                <button
                  type="button"
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    rounded-xl
                    hover:bg-gray-100
                    dark:hover:bg-slate-700
                    transition
                  "
                >
                  ⚙️ Settings
                </button>


                <div className="border-t my-2 dark:border-slate-600" />


                <button
                  type="button"
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    rounded-xl
                    text-red-500
                    hover:bg-red-50
                    dark:hover:bg-red-900/20
                    transition
                  "
                >
                  🚪 Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;