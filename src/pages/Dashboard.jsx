import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaRupeeSign,
  FaArrowUp,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaPlus,
} from "react-icons/fa";

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return count.toLocaleString();
}

function Dashboard() {
  const stats = [
    {
      title: "Total Events",
      value: 120,
      icon: <FaCalendarAlt />,
      change: "+12.5%",
      description: "from last month",
    },
    {
      title: "Participants",
      value: 5420,
      icon: <FaUsers />,
      change: "+18.2%",
      description: "from last month",
    },
    {
      title: "Tickets Sold",
      value: 890,
      icon: <FaTicketAlt />,
      change: "+8.4%",
      description: "from last month",
    },
    {
      title: "Revenue",
      value: 18000,
      icon: <FaRupeeSign />,
      change: "+15.8%",
      description: "from last month",
      currency: true,
    },
  ];

  const events = [
    {
      title: "Tech Conference 2026",
      date: "25 Aug 2026",
      time: "09:00 AM",
      location: "Main Auditorium",
      participants: 450,
      icon: "💻",
    },
    {
      title: "Cultural Fest",
      date: "02 Sep 2026",
      time: "10:30 AM",
      location: "University Ground",
      participants: 800,
      icon: "🎭",
    },
    {
      title: "AI Workshop",
      date: "10 Sep 2026",
      time: "02:00 PM",
      location: "Computer Lab",
      participants: 120,
      icon: "🤖",
    },
  ];

  return (
    <DashboardLayout>

      {/* HERO SECTION */}

      <section className="relative overflow-hidden rounded-[28px] theme-gradient p-8 md:p-10 mb-8 text-white">

        {/* Decorative circles */}

        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute right-32 -bottom-24 h-52 w-52 rounded-full bg-white/10" />

        <div className="relative z-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-white/80 font-medium mb-2">
                Welcome back, Admin 👋
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Manage your events beautifully.
              </h1>

              <p className="text-white/75 mt-3 max-w-xl">
                Create memorable events, manage participants, track
                registrations and monitor your event performance.
              </p>

              <button className="mt-6 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition duration-300 shadow-lg">

                <FaPlus />

                Create New Event

              </button>

            </div>

            <div className="hidden md:flex text-[110px] animate-bounce">
              🎉
            </div>

          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {stats.map((stat, index) => (

          <div
            key={stat.title}
            className="theme-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300"
            style={{
              animation: `pageFade 0.5s ease ${index * 0.1}s both`,
            }}
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="theme-secondary-text text-sm font-medium">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-extrabold mt-3 tracking-tight">

                  {stat.currency && "₹"}

                  <AnimatedNumber value={stat.value} />

                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl theme-primary flex items-center justify-center text-white text-xl group-hover:rotate-12 transition duration-300">
                {stat.icon}
              </div>

            </div>

            <div className="flex items-center gap-2 mt-5">

              <span className="flex items-center gap-1 text-emerald-500 text-sm font-bold">

                <FaArrowUp />

                {stat.change}

              </span>

              <span className="theme-secondary-text text-xs">
                {stat.description}
              </span>

            </div>

          </div>

        ))}

      </section>


      {/* MAIN GRID */}

      <section className="grid xl:grid-cols-3 gap-6">


        {/* REGISTRATION CHART */}

        <div className="theme-card rounded-2xl p-6 xl:col-span-2">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold">
                Registration Overview
              </h2>

              <p className="theme-secondary-text text-sm mt-1">
                Participant registrations during the last 6 months
              </p>

            </div>

            <select className="theme-input !w-auto text-sm">
              <option>Last 6 months</option>
              <option>This year</option>
              <option>Last year</option>
            </select>

          </div>


          {/* Fake chart */}

          <div className="h-64 flex items-end gap-4 px-3">

            {[42, 58, 48, 75, 68, 92, 80, 100, 88, 115, 105, 130].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex-1 flex flex-col justify-end h-full group"
                >

                  <div
                    className="theme-gradient rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      height: `${height * 1.5}px`,
                      animation: `chartGrow 0.8s ease ${index * 0.06}s both`,
                    }}
                  />

                  <span className="text-[10px] theme-secondary-text text-center mt-2">
                    {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index % 6]}
                  </span>

                </div>

              )
            )}

          </div>

        </div>


        {/* EVENT CATEGORIES */}

        <div className="theme-card rounded-2xl p-6">

          <h2 className="text-xl font-bold">
            Event Categories
          </h2>

          <p className="theme-secondary-text text-sm mt-1">
            Distribution of events
          </p>


          <div className="flex justify-center my-8">

            <div className="relative w-44 h-44 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center">

              <div className="w-28 h-28 rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center">

                <span className="text-3xl font-extrabold">
                  120
                </span>

                <span className="text-xs theme-secondary-text">
                  Events
                </span>

              </div>

            </div>

          </div>


          <div className="space-y-4">

            {[
              ["Technology", "35%", "bg-indigo-500"],
              ["Cultural", "25%", "bg-purple-500"],
              ["Sports", "20%", "bg-emerald-500"],
              ["Academic", "20%", "bg-cyan-500"],
            ].map((category) => (

              <div
                key={category[0]}
                className="flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <span
                    className={`w-3 h-3 rounded-full ${category[2]}`}
                  />

                  <span className="text-sm">
                    {category[0]}
                  </span>

                </div>

                <span className="font-bold text-sm">
                  {category[1]}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* UPCOMING EVENTS */}

      <section className="mt-8">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-2xl font-bold">
              Upcoming Events
            </h2>

            <p className="theme-secondary-text text-sm mt-1">
              Keep track of your upcoming events
            </p>

          </div>

          <button className="theme-text font-semibold flex items-center gap-2 hover:gap-3 transition-all">

            View All

            <FaArrowRight />

          </button>

        </div>


        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {events.map((event, index) => (

            <div
              key={event.title}
              className="theme-card rounded-2xl p-5 hover:-translate-y-2 transition-all duration-300"
              style={{
                animation: `pageFade 0.6s ease ${index * 0.12}s both`,
              }}
            >

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl">
                  {event.icon}
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  Upcoming
                </span>

              </div>


              <h3 className="font-bold text-lg mt-5">
                {event.title}
              </h3>


              <div className="space-y-3 mt-4">

                <div className="flex items-center gap-3 theme-secondary-text text-sm">

                  <FaCalendarAlt />

                  {event.date}

                </div>


                <div className="flex items-center gap-3 theme-secondary-text text-sm">

                  <FaClock />

                  {event.time}

                </div>


                <div className="flex items-center gap-3 theme-secondary-text text-sm">

                  <FaMapMarkerAlt />

                  {event.location}

                </div>

              </div>


              <div className="border-t mt-5 pt-4 flex items-center justify-between">

                <span className="text-sm theme-secondary-text">
                  Participants
                </span>

                <span className="font-bold theme-text">
                  {event.participants}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

    </DashboardLayout>
  );
}

export default Dashboard;