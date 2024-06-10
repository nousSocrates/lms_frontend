import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import Swal from "sweetalert2";

import { baseUrl } from "../exports";

function TeacherChangePassword() {
  const [teacherData, setTeacherData] = useState({
    password: "",
  });
  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    document.title = "SS | Change Password";
  });

  //change element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(teacherData);
  //end change value

  //submit form
  const changePassword = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);

    try {
      axios
        .post(
          baseUrl + "/teacher/change_password/" + teacher_id,
          teacherFormData
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
            // window.location.href = "/teacher_logout";
          } else {
            alert("OOPS!..... Some error occured");
          }
        });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };
  //end

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
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
                  Confirm New Password
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

export default TeacherChangePassword;
