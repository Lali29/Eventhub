import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 210 },
  { month: "Mar", registrations: 340 },
  { month: "Apr", registrations: 280 },
  { month: "May", registrations: 450 },
  { month: "Jun", registrations: 520 },
];

const RegistrationChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Monthly Registrations</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="registrations"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;