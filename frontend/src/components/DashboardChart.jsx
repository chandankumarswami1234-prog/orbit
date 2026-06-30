import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function DashboardChart({
  todo,
  inProgress,
  completed,
}) {
  const data = [
    {
      name: "TODO",
      value: Number(todo),
    },
    {
      name: "IN PROGRESS",
      value: Number(inProgress),
    },
    {
      name: "COMPLETED",
      value: Number(completed),
    },
  ];

  const COLORS = [
    "#2196f3",
    "#ff9800",
    "#4caf50",
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default DashboardChart;