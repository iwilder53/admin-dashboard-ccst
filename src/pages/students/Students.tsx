import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./students.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
export interface Item {
  "attendance": [],
  "_id": string,
  "course": any,
  "firstName": string,
  "lastName": string,
  "middleName": string,
  "phone": number,
  "roll": number,
  "semester": string,
  "teacher": boolean,
  "userName": string
}

const columns: GridColDef[] = [
  /*   { field: "id", headerName: "ID", width: 90 },
   {
      field: "img",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    }, */
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "semester",
    type: "string",
    headerName: "Semester",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },

  {
    field: "email",
    headerName: "Email",
    width: 150,
    type: "string",
  },
];

const Students = () => {
  const [open, setOpen] = useState(false);
  // TEST THE API

  function getRowId(row: any) {
    return row._id;
  }
  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:7200/api/user/getstudents").then(
        (res) => res.json()

      ),
  })
  // console.log(data);


  return (
    <div className="students">
      <div className="info">
        <h1>Students</h1>
        <button onClick={() => setOpen(true)}>Add New Student</button>
      </div>
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="student" columns={columns} rows={data} />
      )}
      {open && <Add slug="student" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Students;
