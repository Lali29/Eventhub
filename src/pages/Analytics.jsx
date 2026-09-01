import { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaTicketAlt,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/Common/PageHeader";

function Analytics() {
  const [period, setPeriod] = useState("This Month");

  const monthlyData = [
    { month: "Jan", registrations: 420 },
    { month: "Feb", registrations: 610 },
    { month: "Mar", registrations: 540 },
    { month: "Apr", registrations: 780 },
    { month: "May", registrations: 920 },
    { month: "Jun", registrations: 850 },
    { month: "Jul", registrations: 1100 },
    { month: "Aug", registrations: 1250 },
  ];

  const eventPerformance = [
    {
      name: "Tech Conference 2026",
      registrations: 1250,
      capacity: 1500,
      percentage: 83,
      color: "bg-indigo-500",
    },
    {
      name: "AI & Machine Learning Workshop",
      registrations: 320,
      capacity: 400,
      percentage: 80,
      color: "bg-cyan-500",
    },
    {
      name: "Annual Cultural Fest",
      registrations: 2100,
      capacity: 2500,
      percentage: 84,
      color: "bg-emerald-500",
    },
    {
      name: "Sports Meet 2026",
      registrations: 850,
      capacity: 1000,
      percentage: 85,
      color: "bg-orange-500",
    },
  ];

  const activities = [
    {
      title: "Tech Conference reached 1,000 registrations",
      time: "10 minutes ago",
      icon: <FaUsers />,
      color: "bg-indigo-500",
    },
    {
      title: "₹25,000 ticket revenue generated",
      time: "1 hour ago",
      icon: <FaRupeeSign />,
      color: "bg-emerald-500",
    },
    {
      title: "AI Workshop received 50 new registrations",
      time: "3 hours ago",
      icon: <FaTicketAlt />,
      color: "bg-cyan-500",
    },
    {
      title: "Cultural Fest registration deadline updated",
      time: "Yesterday",
      icon: <FaCalendarAlt />,
      color: "bg-orange-500",
    },
  ];

  const maxValue = Math.max(
    ...monthlyData.map((item) => item.registrations)
  );

  return (
    <DashboardLayout>

      <div className="page-animation">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-2">

          <PageHeader title="Analytics" />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              dark:border-slate-600
              bg-white
              dark:bg-slate-700
              outline-none
              cursor-pointer
            "
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>

        </div>

        <p className="theme-secondary-text mb-8">
          Monitor registrations, attendance, revenue, and event performance.
        </p>


        {/* KPI CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {/* Registrations */}

          <div className="theme-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="theme-secondary-text text-sm font-medium">
                  Total Registrations
                </p>

                <h2 className="text-3xl font-extrabold mt-2">
                  5,420
                </h2>

                <p className="text-emerald-500 text-sm font-semibold mt-3 flex items-center gap-1">
                  <FaArrowUp />
                  12.5%
                  <span className="theme-secondary-text font-normal">
                    vs last month
                  </span>
                </p>

              </div>

              <div className="theme-gradient w-12 h-12 rounded-xl flex items-center justify-center text-white">
                <FaUsers />
              </div>

            </div>

          </div>


          {/* Revenue */}

          <div className="theme-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="theme-secondary-text text-sm font-medium">
                  Total Revenue
                </p>

                <h2 className="text-3xl font-extrabold mt-2">
                  ₹18.5K
                </h2>

                <p className="text-emerald-500 text-sm font-semibold mt-3 flex items-center gap-1">
                  <FaArrowUp />
                  8.4%
                  <span className="theme-secondary-text font-normal">
                    vs last month
                  </span>
                </p>

              </div>

              <div className="bg-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                <FaRupeeSign />
              </div>

            </div>

          </div>


          {/* Tickets */}

          <div className="theme-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="theme-secondary-text text-sm font-medium">
                  Tickets Sold
                </p>

                <h2 className="text-3xl font-extrabold mt-2">
                  4,890
                </h2>

                <p className="text-emerald-500 text-sm font-semibold mt-3 flex items-center gap-1">
                  <FaArrowUp />
                  15.2%
                  <span className="theme-secondary-text font-normal">
                    vs last month
                  </span>
                </p>

              </div>

              <div className="bg-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                <FaTicketAlt />
              </div>

            </div>

          </div>


          {/* Attendance */}

          <div className="theme-card rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300">

            <div className="flex justify-between items-start">

              <div>

                <p className="theme-secondary-text text-sm font-medium">
                  Attendance Rate
                </p>

                <h2 className="text-3xl font-extrabold mt-2">
                  91.8%
                </h2>

                <p className="text-red-500 text-sm font-semibold mt-3 flex items-center gap-1">
                  <FaArrowDown />
                  2.1%
                  <span className="theme-secondary-text font-normal">
                    vs last month
                  </span>
                </p>

              </div>

              <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                <FaChartLine />
              </div>

            </div>

          </div>

        </div>


        {/* MAIN CHART + SUMMARY */}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Registration Chart */}

          <div className="theme-card rounded-2xl p-6 lg:col-span-2">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-xl font-bold">
                  Registration Overview
                </h2>

                <p className="theme-secondary-text text-sm mt-1">
                  Monthly participant registrations
                </p>

              </div>

              <FaChartLine className="text-indigo-500 text-xl" />

            </div>


            {/* BAR CHART */}

            <div className="h-64 flex items-end gap-3 sm:gap-5">

              {monthlyData.map((item, index) => {

                const height =
                  (item.registrations / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                    style={{
                      animation: `barGrow 0.7s ease ${
                        index * 0.08
                      }s both`,
                    }}
                  >

                    <span className="text-xs font-semibold">
                      {item.registrations}
                    </span>

                    <div
                      className="
                        w-full
                        max-w-10
                        theme-gradient
                        rounded-t-lg
                        hover:opacity-80
                        transition
                        cursor-pointer
                      "
                      style={{
                        height: `${height}%`,
                      }}
                      title={`${item.registrations} registrations`}
                    />

                    <span className="text-xs theme-secondary-text">
                      {item.month}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>


          {/* Attendance Summary */}

          <div className="theme-card rounded-2xl p-6">

            <h2 className="text-xl font-bold">
              Attendance
            </h2>

            <p className="theme-secondary-text text-sm mt-1 mb-7">
              Overall event attendance
            </p>


            {/* Circular-looking score */}

            <div className="flex justify-center mb-7">

              <div
                className="
                  w-40
                  h-40
                  rounded-full
                  flex
                  items-center
                  justify-center
                  relative
                "
                style={{
                  background:
                    "conic-gradient(#4f46e5 0deg 330deg, #e5e7eb 330deg 360deg)",
                }}
              >

                <div className="w-32 h-32 rounded-full theme-card flex flex-col items-center justify-center">

                  <span className="text-3xl font-extrabold">
                    91.8%
                  </span>

                  <span className="text-xs theme-secondary-text">
                    Attendance
                  </span>

                </div>

              </div>

            </div>


            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="theme-secondary-text text-sm">
                  Present
                </span>

                <span className="font-bold">
                  4,976
                </span>

              </div>

              <div className="flex justify-between">

                <span className="theme-secondary-text text-sm">
                  Absent
                </span>

                <span className="font-bold">
                  444
                </span>

              </div>

              <div className="flex justify-between">

                <span className="theme-secondary-text text-sm">
                  Average Rate
                </span>

                <span className="font-bold text-emerald-500">
                  91.8%
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* EVENT PERFORMANCE */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <div className="theme-card rounded-2xl p-6">

            <div className="flex items-center justify-between mb-7">

              <div>

                <h2 className="text-xl font-bold">
                  Event Performance
                </h2>

                <p className="theme-secondary-text text-sm mt-1">
                  Registration capacity utilization
                </p>

              </div>

              <FaUsers className="text-indigo-500" />

            </div>


            <div className="space-y-6">

              {eventPerformance.map((event, index) => (

                <div key={event.name}>

                  <div className="flex justify-between gap-3 mb-2">

                    <span className="text-sm font-semibold">
                      {event.name}
                    </span>

                    <span className="text-sm theme-secondary-text">
                      {event.registrations.toLocaleString()} /{" "}
                      {event.capacity.toLocaleString()}
                    </span>

                  </div>


                  <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">

                    <div
                      className={`${event.color} h-full rounded-full`}
                      style={{
                        width: `${event.percentage}%`,
                        animation: `progressGrow 1s ease ${
                          index * 0.15
                        }s both`,
                      }}
                    />

                  </div>


                  <div className="text-right mt-1">

                    <span className="text-xs theme-secondary-text">
                      {event.percentage}% filled
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* RECENT ACTIVITY */}

          <div className="theme-card rounded-2xl p-6">

            <div className="flex items-center justify-between mb-7">

              <div>

                <h2 className="text-xl font-bold">
                  Recent Activity
                </h2>

                <p className="theme-secondary-text text-sm mt-1">
                  Latest updates from your events
                </p>

              </div>

              <FaClock className="text-indigo-500" />

            </div>


            <div className="space-y-5">

              {activities.map((activity, index) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-4
                    items-start
                    hover:translate-x-1
                    transition
                  "
                >

                  <div
                    className={`
                      ${activity.color}
                      w-10
                      h-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-white
                      flex-shrink-0
                    `}
                  >
                    {activity.icon}
                  </div>


                  <div className="flex-1">

                    <p className="text-sm font-semibold">
                      {activity.title}
                    </p>

                    <p className="text-xs theme-secondary-text mt-1">
                      {activity.time}
                    </p>

                  </div>

                  <FaCheckCircle className="text-emerald-500 mt-1" />

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* INSIGHT BANNER */}

        <div className="theme-gradient rounded-2xl p-7 text-white shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">
                EventHub Insight
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Your event registrations are growing!
              </h2>

              <p className="text-white/80 text-sm mt-2 max-w-2xl">
                Registrations increased by 12.5% compared with the
                previous month. Technology and cultural events are
                currently attracting the highest number of participants.
              </p>

            </div>

            <div className="text-5xl">
              📈
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Analytics;