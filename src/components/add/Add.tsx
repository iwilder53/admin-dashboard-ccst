import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { backend } from "../../endpoint";

type Props = {
  data: {};
  slug: string;
  endpoint: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {

  // TEST THE API

  const queryClient = useQueryClient();


  const key = props.columns.filter((item) => item.field !== "createdAt" && item.field !== "updatedAt" && item.field !== "_id").map(entry => entry.field)
  const val = props.columns.map(entry => entry.field)
  var result = key.reduce((o, k, i) => ({ ...o, [k]: val[i] }), {})
  const [formData, setFormData] = useState(result);
  //   console.log(formData)

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${backend}/api/${props.endpoint}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {

    var v = (e.target as HTMLInputElement).value

    let k =
      (e.target as HTMLInputElement).name


    setFormData(prev => ({ ...prev, [k]: v.includes(",") ? v.split(',') : v }))


  }
  useEffect(() => {
    console.log(formData)
  }, [formData]);
  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    //  e.preventDefault();

    //  console.log(formData);
    //add new item
    //  mutation.mutate();

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    //add new item
    mutation.mutate();
    props.setOpen(false)
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>

        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          {props.columns
            .filter((item) => item.field !== "_id" && item.field !== "img" && item.field !== "createdAt" && item.field !== "updatedAt")
            .map((column, idx) => (
              <div className="item" key={idx.toString()}>
                <label>{column.headerName}</label>
                <input onChange={handleChange} name={column.field} type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
