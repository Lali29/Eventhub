const events = [
  {
    title: "Tech Conference",
    date: "20 July",
    status: "Upcoming",
  },
  {
    title: "Hackathon",
    date: "25 July",
    status: "Open",
  },
  {
    title: "Music Fest",
    date: "30 July",
    status: "Closed",
  },
];

const RecentEvents = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Recent Events
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Event</th>
            <th>Date</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr key={event.title} className="border-b">

              <td className="py-4">
                {event.title}
              </td>

              <td>{event.date}</td>

              <td>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  {event.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentEvents;