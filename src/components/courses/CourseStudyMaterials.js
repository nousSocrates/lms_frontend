import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../teacher/TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function CourseStudyMaterials() {
  const [materialData, setMaterialData] = useState([]);
  const [totalMaterials, setTotalMaterials] = useState([0]);
  //const { material_id } = useParams();
  const { course_id } = useParams();

  useEffect(() => {
    document.title = "SS | Study Materials";
    //axios fetch study materials when page loads
    try {
      axios
        .get(baseUrl + "/course_study_materials/" + course_id)
        .then((res) => {
          setMaterialData(res.data);
          setTotalMaterials(res.data.length);
        });
      console.log();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(materialData);
  const downloadFile = (file_url) => {
    window.location.href = file_url;
  };
  //Sweet alert confirm delete
  const Swal = require("sweetalert2"); //from installed sweetalert
  const handleDeleteMaterial = (material_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(baseUrl + "/study_material/" + material_id)
            .then((res) => {
              Swal.fire(
                "Deleted!",
                "Your study material has been deleted.",
                "success"
              );

              try {
                axios
                  .get(baseUrl + "/course_study_materials/" + course_id)
                  .then((res) => {
                    setMaterialData(res.data);
                    setTotalMaterials(res.data.length);
                  });
              } catch (error) {
                console.log(error);
              }
            });
        } catch (error) {
          Swal.fire("Error!", "Your study material has not deleted.", "danger");
        }
      } else {
        Swal.fire("Error!", "Your study material has not deleted.", "danger");
      }
    });
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark ">
              Course ***TITLE*** Files ({totalMaterials}){" "}
              <Link
                to={"/add_study_material/" + course_id}
                className=" btn btn-success btn-sm float-end"
              >
                Add Study Material
              </Link>
            </h5>
            <div className="card-body">
              {" "}
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="text-uppercase text-start fw-bold p-1  ">
                      Title
                    </th>
              
                    <th className="text-uppercase text-start fw-bold p-1 ">
                      Pages
                    </th>
                    <th className="text-uppercase text-center fw-bold p-1 ">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {materialData.map((row, index) => (
                    <tr>
                      <td>
                        <p className="text-start ms-2 fw-normal text-success  m-1">
                          {index + 1 + ". " + row.title}
                        </p>
                      </td>
                    
                      <td>
                        <p className="text-start ms-2 fw-light m-1">
                          {row.pages}
                        </p>
                      </td>
                      <td className="d-flex justify-content-center ">
                      <button
                          onClick={() => downloadFile(row.material)}
                          className="btn btn-sm btn-primary fw-light "
                        >
                          <i className="bi bi-download "></i>
                        </button>
                        {/* delete button */}
                        <button
                          onClick={() => handleDeleteMaterial(row.id)}
                          className="btn btn-danger btn-sm ms-1"
                        >
                          <i className="bi bi-trash "></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
export default CourseStudyMaterials;
