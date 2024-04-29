import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
export type bigChartBoxProps = {
  name: string,
  data: object
};
type Keys<T> = { [K in keyof T]: K }; // Mapped type to infer keys

// Function to get keys using mapped type
function getKeys<T extends object>(obj: T): Keys<T>[keyof T][] {
  // Return the keys as an array of their own types
  return Object.keys(obj) as Keys<T>[keyof T][];
}
function randomHexColorCode() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

const BigChartBox = (props: bigChartBoxProps[]) => {


  const dataKeys = getKeys(props[0]);
  const data: bigChartBoxProps[] = [];
  for (const prop in props) {

    console.log(props[prop])
    data.push(props[prop])
  }
  console.log(data)

  console.log('Data for Big Chart Box  '); console.log(props);
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
            {dataKeys.filter((item) => item !== "name").map((e, i) => (

              <Area key={i.toString()}
                type="monotone"
                dataKey={e}
                stackId="1"
                stroke={randomHexColorCode()}
                fill={randomHexColorCode()}
              />

            ))}

            {/*     <Area
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
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
