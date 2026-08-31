import {
  FaCalendarCheck,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCalendarCheck size={40} />,
      title: "Easy Scheduling",
      text: "Create and organize events in minutes.",
    },
    {
      icon: <FaUsers size={40} />,
      title: "Participant Management",
      text: "Manage attendees and registrations easily.",
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Analytics",
      text: "Track registrations with beautiful dashboards.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-14">
          Why Choose EventHub?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition"
            >

              <div className="text-indigo-600 mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Features;