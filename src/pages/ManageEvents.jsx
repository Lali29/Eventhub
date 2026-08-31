import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaSearch,
  FaPlus,
  FaFilter,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";

function ManageEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2026",
      category: "Technology",
      date: "25 Aug 2026",
      time: "10:00 AM",
      location: "Chennai Convention Centre",
      participants: 1250,
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      category: "Workshop",
      date: "30 Aug 2026",
      time: "09:30 AM",
      location: "Innovation Hub",
      participants: 320,
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Annual Cultural Fest",
      category: "Cultural",
      date: "05 Sep 2026",
      time: "04:00 PM",
      location: "University Auditorium",
      participants: 2100,
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "Sports Meet 2026",
      category: "Sports",
      date: "12 Sep 2026",
      time: "08:00 AM",
      location: "University Stadium",
      participants: 850,
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      title: "Entrepreneurship Summit",
      category: "Business",
      date: "20 Sep 2026",
      time: "11:00 AM",
      location: "Business Centre",
      participants: 620,
      status: "Upcoming",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      title: "Design Thinking Workshop",
      category: "Workshop",
      date: "28 Sep 2026",
      time: "02:00 PM",
      location: "Design Lab",
      participants: 180,
      status: "Completed",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Technology",
    date: "",
    location: "",
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || event.category === category;

      const matchesStatus =
        status === "All" || event.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, search, category, status]);

  const handleCreateEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      alert("Please fill all required fields.");
      return;
    }

    const event = {
      id: Date.now(),
      title: newEvent.title,
      category: newEvent.category,
      date: newEvent.date,
      time: "10:00 AM",
      location: newEvent.location,
      participants: 0,
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
    };

    setEvents((prev) => [event, ...prev]);

    setNewEvent({
      title: "",
      category: "Technology",
      date: "",
      location: "",
    });

    setShowForm(false);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    setOpenMenu(null);
  };

  return (
    <DashboardLayout>

      <div className="page-animation">

        {/* PAGE HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <PageHeader title="Manage Events" />

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="
              theme-primary
              text-white
              px-5
              py-3
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              font-semibold
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >
            <FaPlus />
            Create Event
          </button>

        </div>


        <p className="theme-secondary-text mb-8">
          Create, manage, and monitor all your events from one place.
        </p>


        {/* QUICK STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="theme-card rounded-2xl p-6 hover:-translate-y-1 transition">

            <p className="theme-secondary-text text-sm">
              Total Events
            </p>

            <h2 className="text-3xl font-extrabold mt-2">
              {events.length}
            </h2>

          </div>


          <div className="theme-card rounded-2xl p-6 hover:-translate-y-1 transition">

            <p className="theme-secondary-text text-sm">
              Upcoming
            </p>

            <h2 className="text-3xl font-extrabold mt-2 text-indigo-500">
              {events.filter((e) => e.status === "Upcoming").length}
            </h2>

          </div>


          <div className="theme-card rounded-2xl p-6 hover:-translate-y-1 transition">

            <p className="theme-secondary-text text-sm">
              Participants
            </p>

            <h2 className="text-3xl font-extrabold mt-2 text-emerald-500">
              {events.reduce((sum, e) => sum + e.participants, 0).toLocaleString()}
            </h2>

          </div>


          <div className="theme-card rounded-2xl p-6 hover:-translate-y-1 transition">

            <p className="theme-secondary-text text-sm">
              Draft Events
            </p>

            <h2 className="text-3xl font-extrabold mt-2 text-orange-500">
              {events.filter((e) => e.status === "Draft").length}
            </h2>

          </div>

        </div>


        {/* FILTER BAR */}

        <div className="theme-card rounded-2xl p-5 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* SEARCH */}

            <div className="relative flex-1">

              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
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
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

            </div>


            {/* CATEGORY */}

            <div className="relative">

              <FaFilter
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  pointer-events-none
                "
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  w-full
                  lg:w-48
                  h-11
                  pl-9
                  pr-4
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-slate-600
                  bg-gray-50
                  dark:bg-slate-700
                  outline-none
                "
              >
                <option>All</option>
                <option>Technology</option>
                <option>Workshop</option>
                <option>Cultural</option>
                <option>Sports</option>
                <option>Business</option>
              </select>

            </div>


            {/* STATUS */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                w-full
                lg:w-40
                h-11
                px-4
                rounded-xl
                border
                border-gray-200
                dark:border-slate-600
                bg-gray-50
                dark:bg-slate-700
                outline-none
              "
            >
              <option>All</option>
              <option>Upcoming</option>
              <option>Draft</option>
              <option>Completed</option>
            </select>

          </div>

        </div>


        {/* EVENT CARDS */}

        {filteredEvents.length > 0 ? (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredEvents.map((event, index) => (

              <div
                key={event.id}
                className="
                  theme-card
                  rounded-2xl
                  overflow-hidden
                  group
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
                style={{
                  animation: `pageFade 0.5s ease ${index * 0.08}s both`,
                }}
              >

                {/* IMAGE */}

                <div className="relative h-48 overflow-hidden">

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

                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


                  {/* CATEGORY */}

                  <span
                    className="
                      absolute
                      top-4
                      left-4
                      bg-white/90
                      text-gray-800
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      backdrop-blur
                    "
                  >
                    {event.category}
                  </span>


                  {/* STATUS */}

                  <span
                    className={`
                      absolute
                      top-4
                      right-4
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      ${
                        event.status === "Upcoming"
                          ? "bg-emerald-500 text-white"
                          : event.status === "Completed"
                          ? "bg-blue-500 text-white"
                          : "bg-orange-500 text-white"
                      }
                    `}
                  >
                    {event.status}
                  </span>


                  {/* EVENT TITLE ON IMAGE */}

                  <div className="absolute bottom-4 left-5 right-5 text-white">

                    <h3 className="text-xl font-bold line-clamp-1">
                      {event.title}
                    </h3>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="p-5">

                  <div className="space-y-3">

                    <div className="flex items-center gap-3 text-sm">

                      <FaCalendarAlt className="text-indigo-500" />

                      <span>
                        {event.date} • {event.time}
                      </span>

                    </div>


                    <div className="flex items-center gap-3 text-sm">

                      <FaMapMarkerAlt className="text-red-500" />

                      <span className="line-clamp-1">
                        {event.location}
                      </span>

                    </div>


                    <div className="flex items-center gap-3 text-sm">

                      <FaUsers className="text-emerald-500" />

                      <span>
                        {event.participants.toLocaleString()} Participants
                      </span>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">

                    <button
                      type="button"
                      className="
                        text-sm
                        font-semibold
                        theme-primary-text
                        hover:underline
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <FaEye />
                      View Details
                    </button>


                    <div className="relative">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === event.id
                              ? null
                              : event.id
                          )
                        }
                        className="
                          w-9
                          h-9
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          hover:bg-gray-100
                          dark:hover:bg-slate-700
                          transition
                        "
                      >
                        <FaEllipsisV />
                      </button>


                      {openMenu === event.id && (

                        <div
                          className="
                            absolute
                            right-0
                            bottom-11
                            z-30
                            w-40
                            theme-card
                            rounded-xl
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
                              px-3
                              py-2
                              rounded-lg
                              flex
                              items-center
                              gap-2
                              text-sm
                              hover:bg-gray-100
                              dark:hover:bg-slate-700
                            "
                          >
                            <FaEdit />
                            Edit Event
                          </button>


                          <button
                            type="button"
                            onClick={() => deleteEvent(event.id)}
                            className="
                              w-full
                              px-3
                              py-2
                              rounded-lg
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-red-500
                              hover:bg-red-50
                              dark:hover:bg-red-900/20
                            "
                          >
                            <FaTrash />
                            Delete
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="theme-card rounded-2xl py-20 text-center">

            <div className="text-6xl mb-5">
              📅
            </div>

            <h2 className="text-2xl font-bold">
              No Events Found
            </h2>

            <p className="theme-secondary-text mt-2">
              Try changing your search or filters.
            </p>

          </div>

        )}


        {/* CREATE EVENT MODAL */}

        {showForm && (

          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/50
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onClick={() => setShowForm(false)}
          >

            <div
              className="
                theme-card
                w-full
                max-w-lg
                rounded-2xl
                shadow-2xl
                p-7
                animate-dropdown
              "
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Create New Event
                  </h2>

                  <p className="theme-secondary-text text-sm mt-1">
                    Add a new event to EventHub.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="
                    w-9
                    h-9
                    rounded-full
                    hover:bg-gray-100
                    dark:hover:bg-slate-700
                  "
                >
                  ✕
                </button>

              </div>


              <form
                onSubmit={handleCreateEvent}
                className="space-y-5"
              >

                {/* TITLE */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Event Name
                  </label>

                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter event name"
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      dark:border-slate-600
                      bg-gray-50
                      dark:bg-slate-700
                      outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                    "
                  />

                </div>


                {/* CATEGORY */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>

                  <select
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        category: e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      dark:border-slate-600
                      bg-gray-50
                      dark:bg-slate-700
                      outline-none
                    "
                  >

                    <option>Technology</option>
                    <option>Workshop</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Business</option>

                  </select>

                </div>


                {/* DATE */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Event Date
                  </label>

                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      dark:border-slate-600
                      bg-gray-50
                      dark:bg-slate-700
                      outline-none
                    "
                  />

                </div>


                {/* LOCATION */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter event location"
                    className="
                      w-full
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      dark:border-slate-600
                      bg-gray-50
                      dark:bg-slate-700
                      outline-none
                    "
                  />

                </div>


                {/* BUTTONS */}

                <div className="flex gap-3 pt-3">

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="
                      flex-1
                      h-11
                      rounded-xl
                      border
                      border-gray-200
                      dark:border-slate-600
                      font-semibold
                      hover:bg-gray-100
                      dark:hover:bg-slate-700
                      transition
                    "
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="
                      flex-1
                      h-11
                      rounded-xl
                      theme-primary
                      text-white
                      font-semibold
                      hover:scale-105
                      transition
                    "
                  >
                    Create Event
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default ManageEvents;