import StudentSideBar from "./StudentSideBar";
import { useEffect, useState } from "react"; //for hooking
import { Container } from "../../componentcss/styledcss/Container.styled";
import axios from "axios"; // used in fetching http request to the server
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentProfile() {
  const [studentData, setStudentData] = useState({
    prev_profile_picture: "",
    profile_picture: "",
    username: "",
    full_name: "",
    phone_number: "",
    email: "",
    interest: "",
    school: "",
    county: "",
    nationality: "",
    status: "",
  });
  const student_id = localStorage.getItem("student_id");
  useEffect(() => {
    document.title = "SS | Update Profile";
    //fetch current student data

    try {
      axios.get(baseUrl + "/student/" + student_id).then((res) => {
        setStudentData({
          prev_profile_picture: res.data.profile_picture,
          profile_picture: "",
          username: res.data.username,
          full_name: res.data.full_name,
          phone_number: res.data.phone_number,
          interest: res.data.interest,
          school: res.data.school,
          email: res.data.email,
          county: res.data.county,
          nationality: res.data.nationality,
        });
        console.log(studentData);
      });
    } catch (error) {
      console.log(error);
    }

    //end
  }, []);
  //change element value
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(studentData);
  //end change value

  //change file value for vids and img
  const handleFileChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.files[0],
    });
  };
  //update form
  const studentUpdateForm = () => {
    const studentFormData = new FormData();
    studentFormData.append("username", studentData.username);
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("phone_number", studentData.phone_number);
    studentFormData.append("interest", studentData.interest);
    studentFormData.append("school", studentData.school);
    studentFormData.append("email", studentData.email);
    studentFormData.append("county", studentData.county);
    studentFormData.append("nationality", studentData.nationality);
    if (studentData.profile_picture !== "") {
      studentFormData.append(
        "profile_picture",
        studentData.profile_picture,
        studentData.profile_picture.name
      );
    }

    try {
      axios
        .put(baseUrl + "/student/" + student_id + "/", studentFormData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((response) => {
          if (response.status === 200) {
            //Sweet alert confirm delete
            Swal.fire({
              title: "Your details are now updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };
  //end
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus !== "true") {
    window.location.href = "/student_login";
  }
  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <StudentSideBar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header text-dark">Update Profile</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label
                  for="profile_picture"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Profile Photo
                </label>
                {studentData.prev_profile_picture && (
                  <img
                    src={studentData.prev_profile_picture}
                    className="rounded m-2 ms-4 w-25 float-start"
                    alt="previous photo"
                  ></img>
                )}
                <input
                  onChange={handleFileChange}
                  name="profile_picture"
                  type="file"
                  id="profile_picture"
                  className="form-control"
                ></input>
              </div>
              <div className="mb-3 row">
                <label
                  for="full_name"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Full name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="full_name"
                    name="full_name"
                    value={studentData.full_name}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="username"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Username
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="username"
                    id="username"
                    value={studentData.username}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  for="phone_number"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Phone number
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    value={studentData.phone_number}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="email"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    value={studentData.email}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  for="interest"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Interest
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="interest"
                    name="interest"
                    value={studentData.interest}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  for="school"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  School
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="school"
                    name="school"
                    value={studentData.school}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  for="county"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  County
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="county"
                    name="county"
                    value={studentData.county}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  for="nationality"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Nationality
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="nationality"
                    name="nationality"
                    value={studentData.nationality}
                    className="form-control"
                  />
                </div>
              </div>
              <hr className="text-dark" />
              <button
                type="button"
                onClick={studentUpdateForm}
                className="btn btn-primary float-end"
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default StudentProfile;
