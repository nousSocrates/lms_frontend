import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function AddAssignment() {
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    detail: "",
  });

  useEffect(() => {
    document.title = "SS | Add Strand";
  });
  //const { videoDuration, setVideoDuration } = useState();

  //change element value
  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const { teacher_id } = useParams();
  const { student_id } = useParams();

  const assignmentdFormUpload = () => {
    const _formData = new FormData();
    _formData.append("teacher", teacher_id);
    _formData.append("student", student_id);
    _formData.append("title", assignmentData.title);
    _formData.append("detail", assignmentData.detail);

    try {
      axios
        .post(
          baseUrl + "/assignment/" + teacher_id + "/" + student_id,
          _formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Assignment has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            //Save Notification Data
            const _notificationData = new FormData();
            _notificationData.append("teacher", teacher_id);
            _notificationData.append("message", "assignment");
            _notificationData.append("receiver", "student");
            _notificationData.append("student", student_id);
            axios
              .post(baseUrl + "/save_notification/", _notificationData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              })
              .then((res) => {
                console.log("Notification Added");
              });
              //end of notification
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
            <h5 className="card-header text-dark">Add Assignment</h5>
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
                  <label for="detail" className="form-label float-start">
                    Details
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="detail"
                    name="detail"
                    className="form-control"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={assignmentdFormUpload}
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

export default AddAssignment;
