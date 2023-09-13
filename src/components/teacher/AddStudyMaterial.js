import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function AddStudyMaterial() {
  const [materialData, setMaterialData] = useState({
    title: "",
    description: "",
    material: "",
    pages: "",
  });

  useEffect(() => {
    document.title = "SS | Add Material";
  });

  //change element value
  const handleChange = (event) => {
    setMaterialData({
      ...materialData,
      [event.target.name]: event.target.value,
    });
  };
  //change material value
  const handleMaterialChange = (event) => {
    window.URL = window.URL || window.webkitURL;
    var material = document.createElement("material");
    material.src = URL.createObjectURL(event.target.files[0]);
    setMaterialData({
      ...materialData,
      [event.target.name]: event.target.files[0],
    });
  };

  //strandUpload fxn

  const { course_id } = useParams();

  const materialFormUpload = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("title", materialData.title);
    _formData.append("description", materialData.description);
    _formData.append(
      "material",
      materialData.material,
      materialData.material.name
    );
    _formData.append("pages", materialData.pages);

    try {
      axios
        .post(baseUrl + "/course_study_materials/" + course_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Material has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });

            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Add Study Material</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
                <div className="mb-3">
                  <label for="title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label float-start">
                    Description
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label for="material" className="form-label float-start">
                    Study Material
                  </label>
                  <input
                    onChange={handleMaterialChange}
                    type="file"
                    id="material"
                    name="material"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="remark" className="form-label float-start">
                    Pages/Slides
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="pages"
                    name="pages"
                    className="form-control"
                    placeholder="This material is..."
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={materialFormUpload}
                  className="btn btn-primary float-end "
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default AddStudyMaterial;
