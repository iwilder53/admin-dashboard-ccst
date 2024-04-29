
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./courses.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import { backend } from "../../endpoint";
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
  { field: "_id", headerName: "ID", width: 90 },

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
    field: "subjects",
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

const Courses = () => {
  const [open, setOpen] = useState(false);
  // TEST THE API

  function getRowId(row: any) {
    return row._id;
  }
  const { isLoading, data } = useQuery({
    queryKey: ["allcourses"],
    queryFn: () =>
      fetch(`${backend}/api/course/getCourses`).then(

        (res) => res.json())
  });
  console.log(data);

  //  const result = data.result;
  return (
    <div className="courses">
      <div className="info">
        <h1>Active Courses</h1>
        <button onClick={() => setOpen(true)}>Add New Course</button>
      </div>
      {/* TEST THE API */}

      {isLoading ? (
       'Loading . . . .'
      ) : (
        <DataTable slug="course" columns={columns} rows={data.result} />
      )}
      {open && <Add slug="course" data={data} columns={columns} setOpen={setOpen} endpoint="course/addcourse" />}
    </div>
  );
};

export default Courses;
