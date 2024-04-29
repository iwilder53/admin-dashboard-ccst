import { useQuery } from "@tanstack/react-query";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox, { bigChartBoxProps } from "../../components/bigChartBox/BigChartBox";
import ChartBox, { chartBoxProps } from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox, { TopBoxProps } from "../../components/topBox/TopBox";

import "./home.scss";
import { backend } from "../../endpoint";

export interface Weekday {
  monday: number;
  tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
}

interface ScheduledClass {
  _id: string;
  course: {
    _id: string;
    course: string;
    semester: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  day: Weekday;
  lectures: Lecture[];
  semester: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Lecture {
  _id: string;
  time: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoggedClass {
  _id: string;
  roll: number;
  subject: string;
  locationLat?: number;
  locationLng?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  semester?: string;
  course?: string;
}

interface Response {
  success: boolean;
  result: {
    topUsers: TopBoxProps[],
    logsByFrequency: { [key: number]: number };
    logsBySubjects: { [key: string]: number };
    recentClasses: { [key: string]: number };
    bigChartBoxData: bigChartBoxProps[];
    lectureDistributionByWeekday: {
      color: string;
      icon: string;
      title: string;
      number: number;
      dataKey: string;
      percentage: number;
      chartData: [{ Weekday: number }];
    };
    chartBoxClasses: chartBoxProps;
    chartBoxOffLectures: chartBoxProps;
    scheduledClassesWeekly: chartBoxProps;
    chartBoxStudents: chartBoxProps;
    byCourse: {

      name: string,
      value: number,
      color: string
    }[];
    scheduledClasses: ScheduledClass[];
  };
  loggedClasses: LoggedClass[];
}


const Home = () => {

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`${backend}/api/analytics/getattendancerecords`).then(
        (res) =>
          res.json()

      ),
  })

  const res: Response = data;
  console.log(res);
  return (

    isLoading ? <div className="home"> Loading Analytics</div> :
      <div>
        <div className="home">
          <div className="box box1">
            <TopBox{...res.result.topUsers} />
          </div>
          <div className="box box2">
            <ChartBox {...res.result.chartBoxStudents} />
          </div>
          <div className="box box3">
            <ChartBox {...res.result.chartBoxOffLectures} />
          </div>
          <div className="box box4">
            <PieChartBox {...res.result.byCourse} />
          </div>

          <div className="box box5">
            <ChartBox {...res.result.chartBoxClasses} />
          </div>
          <div className="box box6">
            <ChartBox {...res.result.scheduledClassesWeekly} />
          </div>
          <div className="box box7">
            <BigChartBox {...res.result.bigChartBoxData} />
          </div>
          <div className="box box8">
            <BarChartBox {...res.result.lectureDistributionByWeekday} />
          </div>
        </div></div>
  );
};

export default Home;
