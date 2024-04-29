import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backend } from "../../../endpoint";

type Props = {

  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {

  // TEST THE API

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(`${backend}/api/${props.slug}/delete${props.slug}/${id}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    }
  });

  const handleDelete = (id: number) => {
    //delete the item
    mutation.mutate(id)
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          {/*     <Link to={`/${props.slug}/${params.row._id}`}>
            <img src="/view.svg" alt="" />
          </Link> */}
          <div className="delete" onClick={() => handleDelete(params.row._id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };
  let navigate = useNavigate();
  const routeChange = (id: string) => {
    console.log(id)
    const path = `/${props.slug}/${id}`
    navigate(path);
  }
  return (
    <div className="dataTable">
      <DataGrid
        getRowId={() =>Math.floor(Math.random() * 10000)}
        className="dataGrid"
        //   onCellClick={(row) => routeChange(String(row.id))}
        rows={props.rows}
        /*         columns={[...props.columns, actionColumn]}
        
         */

        columns={[...props.columns, actionColumn]}
        initialState={{

          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 100 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick

        disableDensitySelector

      />
    </div>
  );
};

export default DataTable;
