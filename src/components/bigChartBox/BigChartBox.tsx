import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    msc: 12,
    bsc: 120,
    bca: 240,
  },
  {
    name: "Mon",
    msc: 9,
    bsc: 82,
    bca: 210,
  },
  {
    name: "Tue",
    msc: 5,
    bsc: 90,
    bca: 200,
  },
  {
    name: "Wed",
    msc: 8,
    bsc: 80,
    bca: 120,
  },
  {
    name: "Thu",
    msc: 9,
    bsc: 88,
    bca: 99,
  },
  {
    name: "Fri",
    msc: 4,
    bsc: 98,
    bca: 174,
  },
  {
    name: "Sat",
    msc: 4,
    bsc: 78,
    bca: 124,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="msc"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="bsc"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="bca"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
