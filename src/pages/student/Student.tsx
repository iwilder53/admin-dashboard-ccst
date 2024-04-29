import { useParams } from "react-router-dom";
import Single from "../../components/single/Single"
import "./user.scss"
import { useQuery } from "@tanstack/react-query";

const Student = () => {

  //Fetch data and send to Single Component
  var { id } = useParams();

  //id = id?.split(":")[1];
  console.log(id);

  const { isLoading, data } = useQuery({
    queryKey: [id],
    queryFn: () =>
      fetch(`${backend}/api/user/getstudent/${id}`,).then(
        (res) => res.json()

      ),
  })
  console.log(data);
  return (
    <div className="student">

      {isLoading ? (
        "Loading..."
      ) : (
        <Single {...data} />
      )}
    </div>
  )
}

export default Student