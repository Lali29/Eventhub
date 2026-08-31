import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import {
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaUserCheck,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";

const eventData = [
  {
    id: 1,
    name: "Tech Conference 2026",
    category: "Technology",
    date: "25 Aug 2026",
    year: "2026",
    month: "August",
    participants: 1250,
    capacity: 1500,
    status: "Upcoming",
  },
  {
    id: 2,
    name: "AI & Machine Learning Workshop",
    category: "Workshop",
    date: "30 Aug 2026",
    year: "2026",
    month: "August",
    participants: 820,
    capacity: 1000,
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Annual Cultural Fest",
    category: "Cultural",
    date: "05 Sep 2026",
    year: "2026",
    month: "September",
    participants: 2150,
    capacity: 3000,
    status: "Upcoming",
  },
  {
    id: 4,
    name: "Startup Innovation Summit",
    category: "Business",
    date: "18 Sep 2026",
    year: "2026",
    month: "September",
    participants: 650,
    capacity: 800,
    status: "Upcoming",
  },
  {
    id: 5,
    name: "Web Development Bootcamp",
    category: "Training",
    date: "10 Oct 2026",
    year: "2026",
    month: "October",
    participants: 310,
    capacity: 500,
    status: "Upcoming",
  },
  {
    id: 6,
    name: "Digital Marketing Workshop",
    category: "Workshop",
    date: "22 Oct 2026",
    year: "2026",
    month: "October",
    participants: 140,
    capacity: 300,
    status: "Upcoming",
  },
];

function Participants() {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedMonth, setSelectedMonth] = useState("All Months");

  const years = ["All Years", "2026", "2027"];

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredEvents = useMemo(() => {
    return eventData.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesYear =
        selectedYear === "All Years" || event.year === selectedYear;

      const matchesMonth =
        selectedMonth === "All Months" || event.month === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [search, selectedYear, selectedMonth]);

  const totalParticipants = filteredEvents.reduce(
    (total, event) => total + event.participants,
    0
  );

  const totalEvents = filteredEvents.length;

  const averageParticipants =
    totalEvents > 0
      ? Math.round(totalParticipants / totalEvents)
      : 0;

  const highestEvent =
    filteredEvents.length > 0
      ? filteredEvents.reduce((previous, current) =>
          current.participants > previous.participants
            ? current
            : previous
        )
      : null;

  const getPercentage = (participants, capacity) => {
    return Math.min(
      Math.round((participants / capacity) * 100),
      100
    );
  };

  return (
    <DashboardLayout>

      <PageHeader title="Participants" />

      {/* Intro */}
      <div className="mb-8 animate-fade-in">

        <p className="text-slate-500 dark:text-slate-300 text-lg">
          View and monitor participant registrations for each event.
        </p>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Total Participants */}
        <div className="theme-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

          <div className="flex items-center justify-between">

            <div>
              <p className="theme-secondary-text text-sm font-medium">
                Total Participants
              </p>

              <h2 className="text-3xl font-extrabold theme-text mt-2">
                {totalParticipants.toLocaleString()}
              </h2>

              <p className="text-emerald-500 text-sm mt-2 font-semibold">
                ↑ 12.5% this month
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl theme-gradient flex items-center justify-center text-white text-xl">
              <FaUsers />
            </div>

          </div>

        </div>

        {/* Total Events */}
        <div className="theme-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

          <div className="flex items-center justify-between">

            <div>
              <p className="theme-secondary-text text-sm font-medium">
                Events
              </p>

              <h2 className="text-3xl font-extrabold theme-text mt-2">
                {totalEvents}
              </h2>

              <p className="text-indigo-500 text-sm mt-2 font-semibold">
                Active events
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xl">
              <FaCalendarAlt />
            </div>

          </div>

        </div>

        {/* Average */}
        <div className="theme-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

          <div className="flex items-center justify-between">

            <div>
              <p className="theme-secondary-text text-sm font-medium">
                Average / Event
              </p>

              <h2 className="text-3xl font-extrabold theme-text mt-2">
                {averageParticipants.toLocaleString()}
              </h2>

              <p className="text-cyan-500 text-sm mt-2 font-semibold">
                Participants per event
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300 flex items-center justify-center text-xl">
              <FaChartLine />
            </div>

          </div>

        </div>

        {/* Highest */}
        <div className="theme-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

          <div className="flex items-center justify-between">

            <div className="min-w-0">

              <p className="theme-secondary-text text-sm font-medium">
                Highest Registration
              </p>

              <h2 className="text-xl font-extrabold theme-text mt-2 truncate">
                {highestEvent
                  ? highestEvent.participants.toLocaleString()
                  : "0"}
              </h2>

              <p className="theme-secondary-text text-sm mt-2 truncate">
                {highestEvent
                  ? highestEvent.name
                  : "No event found"}
              </p>

            </div>

            <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xl">
              <FaUserCheck />
            </div>

          </div>

        </div>

      </div>

      {/* Filter Section */}
      <div className="theme-card rounded-2xl p-6 shadow-sm mb-8">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl theme-gradient text-white flex items-center justify-center">
            <FaFilter />
          </div>

          <div>
            <h2 className="text-xl font-bold theme-text">
              Filter Participants
            </h2>

            <p className="theme-secondary-text text-sm">
              Select year, month or search for an event
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Year */}
          <div>

            <label className="block text-sm font-semibold theme-text mb-2">
              Year
            </label>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="theme-input w-full rounded-xl px-4 py-3 outline-none cursor-pointer"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

          </div>

          {/* Month */}
          <div>

            <label className="block text-sm font-semibold theme-text mb-2">
              Month
            </label>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="theme-input w-full rounded-xl px-4 py-3 outline-none cursor-pointer"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

          </div>

          {/* Search */}
          {/* Search Event */}
<div>
  <label className="block text-sm font-semibold theme-text mb-2">
    Search Event
  </label>

  <div
    style={{
      position: "relative",
      width: "100%",
    }}
  >
    {/* Search Icon */}
    <FaSearch
      style={{
        position: "absolute",
        left: "18px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#94a3b8",
        fontSize: "16px",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />

    {/* Search Input */}
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search events..."
      style={{
        width: "100%",
        height: "52px",
        paddingLeft: "52px",
        paddingRight: "16px",
        borderRadius: "12px",
        outline: "none",
        boxSizing: "border-box",
      }}
      className="theme-input"
    />
  </div>
</div>

        </div>

      </div>

      {/* Event-wise Participant List */}
      <div className="theme-card rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b theme-border">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

            <div>

              <h2 className="text-2xl font-bold theme-text">
                Event-wise Participants
              </h2>

              <p className="theme-secondary-text mt-1">
                Participant registration details for each event
              </p>

            </div>

            <div className="theme-badge px-4 py-2 rounded-full text-sm font-semibold">
              {filteredEvents.length} Events
            </div>

          </div>

        </div>

        {/* Event Cards */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filteredEvents.length > 0 ? (

            filteredEvents.map((event, index) => {

              const percentage = getPercentage(
                event.participants,
                event.capacity
              );

              return (
                <div
                  key={event.id}
                  className="theme-event-card rounded-2xl p-6 border theme-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >

                  {/* Header */}
                  <div className="flex justify-between items-start gap-4">

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-xl theme-gradient flex items-center justify-center text-white text-lg flex-shrink-0">
                        <FaCalendarAlt />
                      </div>

                      <div>

                        <h3 className="font-bold text-lg theme-text">
                          {event.name}
                        </h3>

                        <p className="theme-secondary-text text-sm mt-1">
                          {event.category}
                        </p>

                      </div>

                    </div>

                    <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {event.status}
                    </span>

                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-5 theme-secondary-text text-sm">

                    <FaCalendarAlt />

                    <span>{event.date}</span>

                  </div>

                  {/* Participant Count */}
                  <div className="mt-6 flex items-end justify-between">

                    <div>

                      <p className="theme-secondary-text text-sm">
                        Registered Participants
                      </p>

                      <h3 className="text-3xl font-extrabold theme-text mt-1">
                        {event.participants.toLocaleString()}
                      </h3>

                    </div>

                    <div className="text-right">

                      <p className="theme-secondary-text text-sm">
                        Capacity
                      </p>

                      <p className="font-bold theme-text">
                        {event.capacity.toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mt-5">

                    <div className="flex justify-between text-xs mb-2">

                      <span className="theme-secondary-text">
                        Registration Progress
                      </span>

                      <span className="font-bold theme-text">
                        {percentage}%
                      </span>

                    </div>

                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">

                      <div
                        className="h-full theme-gradient rounded-full transition-all duration-1000"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t theme-border flex justify-between items-center">

                    <span className="theme-secondary-text text-sm">
                      Available Seats
                    </span>

                    <span className="font-bold theme-text">
                      {Math.max(
                        event.capacity - event.participants,
                        0
                      ).toLocaleString()}
                    </span>

                  </div>

                </div>
              );
            })

          ) : (

            <div className="lg:col-span-2 text-center py-16">

              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-2xl">
                <FaSearch />
              </div>

              <h3 className="text-xl font-bold theme-text mt-5">
                No events found
              </h3>

              <p className="theme-secondary-text mt-2">
                Try changing the year, month or search term.
              </p>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Participants;