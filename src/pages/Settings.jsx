import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaPalette,
  FaShieldAlt,
  FaSave,
  FaMoon,
  FaSun,
  FaCheck,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/Common/PageHeader";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
  } = useTheme();

  const [name, setName] = useState("EventHub Admin");
  const [email, setEmail] = useState("admin@eventhub.com");
  const [phone, setPhone] = useState("9876543210");

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [eventNotifications, setEventNotifications] =
    useState(true);

  const [registrationNotifications, setRegistrationNotifications] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const themes = [
    {
      name: "indigo",
      label: "Indigo",
      color: "bg-indigo-600",
    },
    {
      name: "purple",
      label: "Purple",
      color: "bg-purple-600",
    },
    {
      name: "emerald",
      label: "Emerald",
      color: "bg-emerald-600",
    },
    {
      name: "rose",
      label: "Rose",
      color: "bg-rose-600",
    },
  ];

  return (
    <DashboardLayout>

      <div className="page-animation">

        {/* HEADER */}

        <PageHeader title="Settings" />

        <p className="theme-secondary-text mb-8">
          Customize your EventHub account, appearance,
          notifications, and security preferences.
        </p>


        {/* PROFILE + APPEARANCE */}

        <div className="grid xl:grid-cols-3 gap-6 mb-6">

          {/* PROFILE */}

          <div className="theme-card rounded-2xl p-6 xl:col-span-2">

            <div className="flex items-center gap-4 mb-7">

              <div className="theme-gradient w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl">
                <FaUser />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Profile Information
                </h2>

                <p className="theme-secondary-text text-sm">
                  Manage your EventHub administrator details.
                </p>
              </div>

            </div>


            <form
              onSubmit={handleSave}
              className="grid md:grid-cols-2 gap-5"
            >

              <div>

                <label className="block text-sm font-semibold mb-2">
                  Organization / Admin Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    settings-input
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    outline-none
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    settings-input
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    outline-none
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="
                    settings-input
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    outline-none
                  "
                />

              </div>


              <div>

                <label className="block text-sm font-semibold mb-2">
                  Account Role
                </label>

                <div
                  className="
                    settings-input
                    px-4
                    py-3
                    rounded-xl
                    flex
                    items-center
                    gap-2
                  "
                >

                  <FaShieldAlt className="text-emerald-500" />

                  <span className="font-semibold">
                    Administrator
                  </span>

                </div>

              </div>

            </form>

          </div>


          {/* QUICK APPEARANCE */}

          <div className="theme-card rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-purple-500/10 text-purple-500 w-11 h-11 rounded-xl flex items-center justify-center">
                <FaPalette />
              </div>

              <div>

                <h2 className="font-bold text-lg">
                  Appearance
                </h2>

                <p className="theme-secondary-text text-xs">
                  Customize your interface
                </p>

              </div>

            </div>


            {/* DARK MODE */}

            <div className="flex items-center justify-between mb-7">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">

                  {darkMode ? (
                    <FaMoon className="text-indigo-500" />
                  ) : (
                    <FaSun className="text-orange-500" />
                  )}

                </div>

                <div>

                  <p className="font-semibold text-sm">
                    Dark Mode
                  </p>

                  <p className="theme-secondary-text text-xs">
                    {darkMode ? "Enabled" : "Disabled"}
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`
                  w-14
                  h-7
                  rounded-full
                  p-1
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }
                `}
              >

                <div
                  className={`
                    w-5
                    h-5
                    bg-white
                    rounded-full
                    transition-transform
                    duration-300
                    ${
                      darkMode
                        ? "translate-x-7"
                        : "translate-x-0"
                    }
                  `}
                />

              </button>

            </div>


            {/* COLOR THEMES */}

            <h3 className="font-semibold text-sm mb-4">
              Theme Color
            </h3>

            <div className="grid grid-cols-2 gap-3">

              {themes.map((item) => (

                <button
                  key={item.name}
                  type="button"
                  onClick={() => setTheme(item.name)}
                  className={`
                    flex
                    items-center
                    gap-2
                    p-3
                    rounded-xl
                    border-2
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${
                      theme === item.name
                        ? "border-gray-900 dark:border-white"
                        : "border-transparent"
                    }
                  `}
                >

                  <span
                    className={`${item.color} w-7 h-7 rounded-full`}
                  />

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>

                  {theme === item.name && (
                    <FaCheck className="ml-auto text-sm" />
                  )}

                </button>

              ))}

            </div>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="theme-card rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-4 mb-7">

            <div className="bg-cyan-500/10 text-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <FaBell />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Notification Preferences
              </h2>

              <p className="theme-secondary-text text-sm">
                Choose which notifications you want to receive.
              </p>

            </div>

          </div>


          <div className="space-y-4">


            {/* EMAIL */}

            <NotificationRow
              title="Email Notifications"
              description="Receive important updates through email."
              checked={emailNotifications}
              setChecked={setEmailNotifications}
            />


            {/* EVENTS */}

            <NotificationRow
              title="Event Updates"
              description="Get notified when event information changes."
              checked={eventNotifications}
              setChecked={setEventNotifications}
            />


            {/* REGISTRATIONS */}

            <NotificationRow
              title="New Registrations"
              description="Receive notifications when participants register."
              checked={registrationNotifications}
              setChecked={setRegistrationNotifications}
            />

          </div>

        </div>


        {/* SECURITY */}

        <div className="theme-card rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-4 mb-6">

            <div className="bg-emerald-500/10 text-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <FaShieldAlt />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Security
              </h2>

              <p className="theme-secondary-text text-sm">
                Protect your administrator account.
              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-4">

            <button
              type="button"
              className="
                border
                border-gray-200
                dark:border-slate-600
                rounded-xl
                p-4
                text-left
                hover:border-indigo-500
                hover:-translate-y-1
                transition
              "
            >

              <p className="font-semibold">
                Change Password
              </p>

              <p className="theme-secondary-text text-sm mt-1">
                Update your account password.
              </p>

            </button>


            <button
              type="button"
              className="
                border
                border-gray-200
                dark:border-slate-600
                rounded-xl
                p-4
                text-left
                hover:border-indigo-500
                hover:-translate-y-1
                transition
              "
            >

              <p className="font-semibold">
                Two-Factor Authentication
              </p>

              <p className="theme-secondary-text text-sm mt-1">
                Add an additional layer of account security.
              </p>

            </button>

          </div>

        </div>


        {/* SAVE BUTTON */}

        <div className="flex justify-end">

          <button
            type="button"
            onClick={handleSave}
            className="
              theme-gradient
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              gap-3
              shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            {saved ? (
              <>
                <FaCheck />
                Settings Saved
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}

          </button>

        </div>


        {/* SUCCESS MESSAGE */}

        {saved && (

          <div
            className="
              fixed
              bottom-6
              right-6
              bg-emerald-500
              text-white
              px-6
              py-4
              rounded-xl
              shadow-2xl
              flex
              items-center
              gap-3
              z-50
              page-animation
            "
          >

            <FaCheck />

            <div>

              <p className="font-semibold">
                Settings updated successfully
              </p>

              <p className="text-xs text-white/80">
                Your preferences have been saved.
              </p>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}


/* ------------------------------------------------ */
/* NOTIFICATION ROW */
/* ------------------------------------------------ */

function NotificationRow({
  title,
  description,
  checked,
  setChecked,
}) {
  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        p-4
        rounded-xl
        border
        border-gray-100
        dark:border-slate-700
        hover:bg-gray-50
        dark:hover:bg-slate-800
        transition
      "
    >

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="theme-secondary-text text-sm mt-1">
          {description}
        </p>

      </div>


      <button
        type="button"
        onClick={() => setChecked(!checked)}
        className={`
          w-14
          h-7
          rounded-full
          p-1
          flex
          items-center
          transition-all
          duration-300
          flex-shrink-0
          ${
            checked
              ? "bg-indigo-600"
              : "bg-gray-300"
          }
        `}
      >

        <span
          className={`
            w-5
            h-5
            bg-white
            rounded-full
            shadow
            transition-transform
            duration-300
            ${
              checked
                ? "translate-x-7"
                : "translate-x-0"
            }
          `}
        />

      </button>

    </div>
  );
}

export default Settings;