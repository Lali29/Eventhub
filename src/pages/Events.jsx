import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaPlus,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";


// ======================================================
// EVENT DATA
// ======================================================

const eventData = [
  {
    id: 1,
    title: "Tech Conference 2026",
    category: "Technology",
    date: "2026-08-25",
    time: "10:00 AM",
    location: "Chennai Convention Centre",
    participants: 1250,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    category: "Workshop",
    date: "2026-08-30",
    time: "09:30 AM",
    location: "Innovation Hub",
    participants: 820,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 3,
    title: "Annual Cultural Fest",
    category: "Cultural",
    date: "2026-09-05",
    time: "04:00 PM",
    location: "University Auditorium",
    participants: 1500,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 4,
    title: "Startup & Innovation Summit",
    category: "Business",
    date: "2026-09-18",
    time: "10:00 AM",
    location: "Business Centre",
    participants: 680,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 5,
    title: "Cyber Security Awareness",
    category: "Technology",
    date: "2026-10-10",
    time: "11:00 AM",
    location: "Digital Learning Centre",
    participants: 540,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 6,
    title: "Leadership Development Program",
    category: "Training",
    date: "2026-10-24",
    time: "09:00 AM",
    location: "Grand Conference Hall",
    participants: 530,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 7,
    title: "Digital Marketing Workshop",
    category: "Workshop",
    date: "2027-01-15",
    time: "10:30 AM",
    location: "Training Centre",
    participants: 420,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: 8,
    title: "National Student Innovation Expo",
    category: "Education",
    date: "2027-02-20",
    time: "09:30 AM",
    location: "Expo Grounds",
    participants: 1750,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
  },
];


// ======================================================
// MONTHS
// ======================================================

const months = [
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


// ======================================================
// EVENTS PAGE
// ======================================================

function Events() {

  const [selectedYear, setSelectedYear] = useState("all");

  const [selectedMonth, setSelectedMonth] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");


  // ====================================================
  // AVAILABLE YEARS
  // ====================================================

  const years = useMemo(() => {

    return [
      ...new Set(
        eventData.map((event) =>
          new Date(event.date).getFullYear()
        )
      ),
    ].sort();

  }, []);


  // ====================================================
  // FILTER EVENTS
  // ====================================================

  const filteredEvents = useMemo(() => {

    return eventData.filter((event) => {

      const eventDate = new Date(event.date);

      const eventYear =
        eventDate.getFullYear().toString();

      const eventMonth =
        eventDate.toLocaleString("default", {
          month: "long",
        });


      const yearMatch =
        selectedYear === "all" ||
        eventYear === selectedYear;


      const monthMatch =
        selectedMonth === "all" ||
        eventMonth === selectedMonth;


      const searchMatch =
        event.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase());


      return (
        yearMatch &&
        monthMatch &&
        searchMatch
      );

    });

  }, [
    selectedYear,
    selectedMonth,
    searchTerm,
  ]);


  // ====================================================
  // STATISTICS
  // ====================================================

  const totalParticipants =
    filteredEvents.reduce(
      (total, event) =>
        total + event.participants,
      0
    );


  const upcomingEvents =
    filteredEvents.filter(
      (event) =>
        event.status === "Upcoming"
    ).length;


  // ====================================================
  // DATE FORMAT
  // ====================================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ====================================================
  // CLEAR FILTERS
  // ====================================================

  const clearFilters = () => {

    setSelectedYear("all");

    setSelectedMonth("all");

    setSearchTerm("");

  };


  return (

    <DashboardLayout>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <PageHeader
          title="Manage Events"
        />

        <button
          onClick={() =>
            alert("Create Event feature coming soon!")
          }
          className="
            flex items-center justify-center gap-2
            px-6 py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >

          <FaPlus />

          Create Event

        </button>

      </div>


      <p className="text-slate-500 dark:text-slate-400 mb-8">

        Create, manage, and monitor all your events
        from one place.

      </p>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">


        {/* Total Events */}

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Events
              </p>

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                {filteredEvents.length}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">

              <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400 text-xl" />

            </div>

          </div>

        </div>


        {/* Upcoming */}

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Upcoming
              </p>

              <h2 className="text-3xl font-bold text-indigo-600 mt-2">
                {upcomingEvents}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">

              <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400 text-xl" />

            </div>

          </div>

        </div>


        {/* Participants */}

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Participants
              </p>

              <h2 className="text-3xl font-bold text-emerald-500 mt-2">
                {totalParticipants.toLocaleString()}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">

              <FaUsers className="text-emerald-500 text-xl" />

            </div>

          </div>

        </div>


        {/* Categories */}

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Categories
              </p>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {
                  new Set(
                    filteredEvents.map(
                      (event) => event.category
                    )
                  ).size
                }
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">

              <FaFilter className="text-orange-500 text-xl" />

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          FILTER SECTION
      ================================================= */}

      <div
        className="
          event-filter
          bg-white
          dark:bg-slate-800
          rounded-2xl
          p-6
          md:p-8
          shadow-sm
          mb-10
          border
          border-slate-100
          dark:border-slate-700
        "
      >

        {/* Filter Header */}

        <div className="flex items-center gap-4 mb-7">

          <div
            className="
              w-12 h-12
              rounded-xl
              bg-gradient-to-br
              from-indigo-600
              to-cyan-500
              flex
              items-center
              justify-center
              text-white
            "
          >

            <FaFilter />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800 dark:text-white">

              Filter Events

            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Select year and month to view events

            </p>

          </div>

        </div>


        {/* Filters */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          {/* YEAR */}

          <div>

            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">

              Year

            </label>

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(e.target.value)
              }
              className="
                event-select
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                cursor-pointer
              "
            >

              <option value="all">
                All Years
              </option>

              {years.map((year) => (

                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>

              ))}

            </select>

          </div>


          {/* MONTH */}

          <div>

            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">

              Month

            </label>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
              className="
                event-select
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-800
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                cursor-pointer
              "
            >

              <option value="all">
                All Months
              </option>

              {months.map((month) => (

                <option
                  key={month}
                  value={month}
                >
                  {month}
                </option>

              ))}

            </select>

          </div>


          {/* SEARCH */}

          <div>

            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">

              Search Event

            </label>

            <div className="relative">

              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search events..."
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-800
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

            </div>

          </div>

        </div>


        {/* Clear Button */}

        {(selectedYear !== "all" ||
          selectedMonth !== "all" ||
          searchTerm !== "") && (

          <button
            onClick={clearFilters}
            className="
              mt-5
              text-sm
              font-semibold
              text-indigo-600
              hover:text-indigo-800
              transition
            "
          >

            Clear all filters

          </button>

        )}

      </div>


      {/* =================================================
          RESULTS TITLE
      ================================================= */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">

            Events

          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""}
            found

          </p>

        </div>

      </div>


      {/* =================================================
          EVENT CARDS
      ================================================= */}

      {filteredEvents.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

          {filteredEvents.map((event) => (

            <div
              key={event.id}
              className="
                group
                bg-white
                dark:bg-slate-800
                rounded-2xl
                overflow-hidden
                shadow-sm
                hover:shadow-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                border
                border-slate-100
                dark:border-slate-700
              "
            >

              {/* IMAGE */}

              <div className="relative h-52 overflow-hidden">

                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                  "
                />


                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


                {/* Category */}

                <span
                  className="
                    absolute
                    top-4
                    left-4
                    bg-white
                    text-slate-800
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-bold
                  "
                >

                  {event.category}

                </span>


                {/* Status */}

                <span
                  className="
                    absolute
                    top-4
                    right-4
                    bg-emerald-500
                    text-white
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                  "
                >

                  {event.status}

                </span>


                {/* Title */}

                <h3
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    text-white
                    text-xl
                    font-bold
                    line-clamp-2
                  "
                >

                  {event.title}

                </h3>

              </div>


              {/* CONTENT */}

              <div className="p-5">

                {/* Date */}

                <div className="flex items-center gap-3 mb-3">

                  <FaCalendarAlt className="text-indigo-600" />

                  <span className="text-sm text-slate-700 dark:text-slate-300">

                    {formatDate(event.date)}

                  </span>

                </div>


                {/* Time */}

                <div className="flex items-center gap-3 mb-3">

                  <FaClock className="text-indigo-600" />

                  <span className="text-sm text-slate-700 dark:text-slate-300">

                    {event.time}

                  </span>

                </div>


                {/* Location */}

                <div className="flex items-center gap-3 mb-4">

                  <FaMapMarkerAlt className="text-red-500" />

                  <span className="text-sm text-slate-700 dark:text-slate-300 truncate">

                    {event.location}

                  </span>

                </div>


                {/* Participants */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    dark:border-slate-700
                    pt-4
                  "
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-emerald-100
                        dark:bg-emerald-900/40
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaUsers className="text-emerald-600" />

                    </div>

                    <div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">

                        Participants

                      </p>

                      <p className="font-bold text-slate-800 dark:text-white">

                        {event.participants.toLocaleString()}

                      </p>

                    </div>

                  </div>


                  <button
                    onClick={() =>
                      alert(
                        `${event.title}\nParticipants: ${event.participants}`
                      )
                    }
                    className="
                      px-4
                      py-2
                      rounded-lg
                      bg-indigo-50
                      dark:bg-indigo-900/30
                      text-indigo-600
                      dark:text-indigo-400
                      text-sm
                      font-semibold
                      hover:bg-indigo-600
                      hover:text-white
                      transition-all
                      duration-300
                    "
                  >

                    View

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* =================================================
           NO RESULTS
        ================================================= */

        <div
          className="
            bg-white
            dark:bg-slate-800
            rounded-2xl
            p-16
            text-center
            shadow-sm
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-full
              bg-slate-100
              dark:bg-slate-700
              flex
              items-center
              justify-center
              mx-auto
              mb-5
            "
          >

            <FaSearch className="text-slate-400 text-xl" />

          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white">

            No events found

          </h3>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Try changing the year, month, or search term.

          </p>

          <button
            onClick={clearFilters}
            className="
              mt-5
              px-5
              py-2.5
              rounded-lg
              bg-indigo-600
              text-white
              font-semibold
              hover:bg-indigo-700
              transition
            "
          >

            Clear Filters

          </button>

        </div>

      )}

    </DashboardLayout>

  );

}


export default Events;