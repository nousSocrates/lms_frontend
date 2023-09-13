import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from "./StudentSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentChangePassword() {
  const [studentData, setStudentData] = useState({
    password: "",
  });
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | Change Password";
  });

  //change element value
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(studentData);
  //end change value

  //submit form
  const changePassword = () => {
    const studentFormData = new FormData();
    studentFormData.append("password", studentData.password);

    try {
      axios
        .post(
          baseUrl + "/student/change_password/" + student_id,
          studentFormData
        )
        .then((response) => {
          if (response.status === 200) {
            //Sweet alert confirm delete

            Swal.fire({
              title: "Your password has been saved",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            // window.location.href = "/student_logout";
          } else {
            alert("OOPS!..... Some error occured");
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };
  //end

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <StudentSideBar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header text-dark bg-danger">Change Password</h4>
            <div className="card-body">
              {/* <div className="mb-3 row">
                <label
                  for="old_password"
                  className="col-sm-4 col-form-label text-dark"
                >
                  Old Password
                </label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" />
                </div>
              </div> */}
              <div className="mb-3 row">
                <label
                  for="new_password1"
                  className="col-sm-4 col-form-label text-dark"
                >
                  New Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              {/* <div className="mb-3 row">
                <label
                  for="new_password2"
                  className="col-sm-4 col-form-label text-dark"
                >
                  Repeat New Password
                </label>
                <div className="col-sm-8">
                  <input type="password" className="form-control" />
                </div>
              </div> */}

              <hr />
              <button
                type="button"
                onClick={changePassword}
                className="btn btn-primary float-end"
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default StudentChangePassword;
