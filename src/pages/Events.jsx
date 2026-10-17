
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaPlus,
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaClock,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/Common/PageHeader";

const API_URL = "http://localhost:5000/api/events";

const defaultImage =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const emptyForm = {
  eventName: "",
  description: "",
  category: "Technology",
  location: "",
  organizer: "EventHub",
  eventDate: "",
  participants: 0,
  status: "Upcoming",
};

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Load events from MongoDB through the backend API.
  const fetchEvents = async () => {
    try {
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load events.");
      }

      setEvents(data.events || []);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure it is running on port 5000."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const years = useMemo(() => {
    return [
      ...new Set(
        events
          .filter((event) => event.eventDate)
          .map((event) =>
            new Date(event.eventDate).getFullYear()
          )
      ),
    ].sort((a, b) => a - b);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const date = event.eventDate
        ? new Date(event.eventDate)
        : null;

      const year = date ? String(date.getFullYear()) : "";
      const month = date
        ? months[date.getMonth()]
        : "";

      const name = (event.eventName || "").toLowerCase();
      const category = (event.category || "").toLowerCase();
      const location = (event.location || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      return (
        (selectedYear === "all" || year === selectedYear) &&
        (selectedMonth === "all" || month === selectedMonth) &&
        (name.includes(search) ||
          category.includes(search) ||
          location.includes(search))
      );
    });
  }, [events, selectedYear, selectedMonth, searchTerm]);

  const totalParticipants = filteredEvents.reduce(
    (total, event) => total + Number(event.participants || 0),
    0
  );

  const upcomingEvents = filteredEvents.filter(
    (event) => event.status === "Upcoming"
  ).length;

  const categoriesCount = new Set(
    filteredEvents.map((event) => event.category)
  ).size;

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const clearFilters = () => {
    setSelectedYear("all");
    setSelectedMonth("all");
    setSearchTerm("");
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingId(event._id);

    setForm({
      eventName: event.eventName || "",
      description: event.description || "",
      category: event.category || "Technology",
      location: event.location || "",
      organizer: event.organizer || "EventHub",
      eventDate: event.eventDate
        ? event.eventDate.slice(0, 10)
        : "",
      participants: Number(event.participants || 0),
      status: event.status || "Upcoming",
    });

    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "participants" ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const eventDate = form.eventDate;
    const [year, monthNumber] = eventDate.split("-");

    const payload = {
      ...form,
      eventDate,
      month: months[Number(monthNumber) - 1],
      year: Number(year),
      participants: Number(form.participants || 0),
    };

    try {
      const response = await fetch(
        editingId
          ? `${API_URL}/${editingId}`
          : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not save event.");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await fetchEvents();
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that it is running."
          : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.eventName}"?`
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/${event._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not delete event.");
      }

      await fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
        <PageHeader title="Manage Events" />

        <button
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <FaPlus /> Create Event
        </button>
      </div>

      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Create, manage, and monitor all your events from one place.
      </p>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          {error}
          <button
            onClick={() => setError("")}
            className="ml-3 font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Events",
            value: filteredEvents.length,
            icon: <FaCalendarAlt />,
            color: "text-indigo-600",
            bg: "bg-indigo-100 dark:bg-indigo-900/40",
          },
          {
            label: "Upcoming",
            value: upcomingEvents,
            icon: <FaCalendarAlt />,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/40",
          },
          {
            label: "Participants",
            value: totalParticipants.toLocaleString(),
            icon: <FaUsers />,
            color: "text-emerald-500",
            bg: "bg-emerald-100 dark:bg-emerald-900/40",
          },
          {
            label: "Categories",
            value: categoriesCount,
            icon: <FaFilter />,
            color: "text-orange-500",
            bg: "bg-orange-100 dark:bg-orange-900/40",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <h2 className={`text-3xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </h2>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.bg} ${stat.color}`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm mb-10 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="all">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Search Event
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {(selectedYear !== "all" ||
          selectedMonth !== "all" ||
          searchTerm !== "") && (
          <button
            onClick={clearFilters}
            className="mt-5 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Events list */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Events
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {loading
              ? "Loading events..."
              : `${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-12 text-slate-500 dark:text-slate-300">
          Loading events from MongoDB...
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 dark:border-slate-700"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={defaultImage}
                  alt={event.eventName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-4 left-4 bg-white text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold">
                  {event.category}
                </span>

                <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                  {event.status}
                </span>

                <h3 className="absolute bottom-5 left-5 right-5 text-white text-xl font-bold line-clamp-2">
                  {event.eventName}
                </h3>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendarAlt className="text-indigo-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {formatDate(event.eventDate)}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="text-indigo-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Time not specified
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    {event.location}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <FaUsers className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Participants
                      </p>
                      <p className="font-bold text-slate-800 dark:text-white">
                        {Number(event.participants || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(event)}
                      title="Edit event"
                      className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      title="Delete event"
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
          <FaSearch className="text-slate-400 text-3xl mx-auto mb-5" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            No events found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Create an event or change your filters.
          </p>
          <button
            onClick={openCreateForm}
            className="mt-5 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Create Event
          </button>
        </div>
      )}

      {/* Create/Edit Event Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {editingId ? "Edit Event" : "Create Event"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Close form"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                  Event Name *
                </label>
                <input
                  name="eventName"
                  value={form.eventName}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  placeholder="Enter event name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  placeholder="Describe your event"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  >
                    <option>Technology</option>
                    <option>Workshop</option>
                    <option>Cultural</option>
                    <option>Business</option>
                    <option>Training</option>
                    <option>Education</option>
                    <option>Sports</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Location *
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                    placeholder="Event venue"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Organizer
                  </label>
                  <input
                    name="organizer"
                    value={form.organizer}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Participants
                  </label>
                  <input
                    type="number"
                    name="participants"
                    value={form.participants}
                    onChange={handleFormChange}
                    min="0"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-slate-700 dark:text-slate-200">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-3"
                  >
                    <option>Upcoming</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Event"
                    : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Events;