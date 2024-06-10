import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../student/StudentSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function StudentStudyMaterials() {
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
const downloadFile = (file_url)=>{
  window.location.href = file_url
}
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
                      Description
                    </th>
                    <th className="text-uppercase text-start fw-bold p-1 ">
                      Pages/Slides
                    </th>
                    <th className="text-uppercase text-start fw-bold p-1 ">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {materialData.map((row, index) => (
                    <tr>
                      <td>
                        <p className="text-start  fw-normal text-success  m-1">
                          {index + 1 + ". " + row.title}
                        </p>
                      </td>
                      <td>
                        <p className="text-start fw-light  m-1">
                          {row.description}
                        </p>
                      </td>
                      <td>
                        <p className="text-start fw-light m-1">{row.pages}</p>
                      </td>
                      <td>
                        <button onClick={()=>downloadFile(row.material)} className="btn btn-sm btn-outline-primary fw-light ">Download</button>
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
export default StudentStudyMaterials;
