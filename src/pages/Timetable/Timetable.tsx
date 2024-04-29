
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./timetable.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
export interface Item {
  "subjects": [],
  "_id": string,
  "course": any,
  "createdAt": string,
  "updatedAt": string,
  "semester": string,

}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  /*  {
      field: "img",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },  {
            "_id": "639d9e4cea220e24b6276c06",
            "course": "Msc Computer science",
            "semester": 2,
            "subjects": [
                "CG",
                "CAO",
                "VC++",
                "TOC"
            ],
            "createdAt": "2022-12-17T10:47:40.958Z",
            "updatedAt": "2022-12-17T10:47:40.958Z",
            "__v": 0
        },*/
  {
    field: "course",
    type: "string",
    headerName: "Course",
    width: 250,
  },
  {
    field: "semester",
    type: "string",
    headerName: "Semester",
    width: 200,
  },
  {
    field: "lectures",
    type: "array",
    headerName: "subjects",
    width: 200
    ,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: "createdAt",
    width: 200,
  },

  {
    field: "updatedAt",
    headerName: "updatedAt",
    width: 150,
    type: "string",
  }, { field: "_id", headerName: "ID", width: 90, type: "string" }
];

const Timetable = () => {
  const [open, setOpen] = useState(false);
  // TEST THE API

  function getRowId(row: any) {
    return row._id;
  }
  const { isLoading, data } = useQuery({
    queryKey: ["allcourses"],

    queryFn: () =>
      fetch("http://127.0.0.1:7200/api/timetable/gettimetables", {
        method: 'get'
      }).then(

        (res) => res.json())
  });

  console.log(data);

  return (
    <div className="timetable">
      <div className="info">
        <h1>Time Table</h1>
        <button onClick={() => setOpen(true)}>Add New Course</button>
      </div>
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="timetable" columns={columns} rows={data.result} />
      )}
      {open && <Add slug="timetable" data={data} columns={columns} setOpen={setOpen} endpoint="course/addtimetable" />}
    </div>
  );
};

export default Timetable;
