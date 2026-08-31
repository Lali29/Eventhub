import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Technical", value: 40 },
  { name: "Cultural", value: 30 },
  { name: "Sports", value: 20 },
  { name: "Workshops", value: 10 },
];

const colors = [
  "#4F46E5",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
];

const CategoryChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Event Categories</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;