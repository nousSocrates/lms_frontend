import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherSideBar() {
  //const [notificationData, setNotificationData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  const [teacherData, setTeacherData] = useState({
    prev_profile_picture: "",
    surname: "",
  });

  useEffect(() => {
    //fetch profile picture

    try {
      axios.get(baseUrl + "/teacher/" + teacher_id).then((res) => {
        setTeacherData({
          prev_profile_picture: res.data.profile_picture,
          surname: res.data.surname,
        });
        console.log(teacherData);
      });
    } catch (error) {
      console.log(error);
    }

    //fetch notifications
    // try {
    //   axios
    //     .get(baseUrl + "/teacher/fetch_all_notifications/" + teacher_id)
    //     .then((res) => {
    //       setNotificationData(res.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return (
    <div className="card">
      <div className="side-nav">
        <div className="d-flex flex-column">
          <div className="profile bg-success ">
            <Link to="/teacher_dashboard">
              {teacherData.prev_profile_picture && (
                <img
                  src={teacherData.prev_profile_picture}
                  alt="Profile"
                  className="img-fluid rounded-circle m-auto"
                />
              )}
            </Link>
            <Link to="/teacher_dashboard" className="username text-dark">
              {teacherData.surname}
            </Link>
          </div>
        </div>

        <nav className="bg-dark">
          <div className="card-header bg-warning">
            <Link
              to="/teacher_dashboard"
              className="text-decoration-none text-uppercase fw-normal text-success "
            >
              Dashboard
            </Link>
          </div>
          <div className="nav-menu">
            <ul className="list-group">
              <li>
                <Link
                  to="/teacher_profile"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher_courses"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my_students"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  My Students
                </Link>
              </li>
              <li>
                <Link
                  to="/add_course"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher_quiz"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/add_quiz"
                  className="list-group-item-action text-start ms-4 fw-light"
                >
                  Add Quiz
                </Link>
              </li>
              <Link
                to="/teacher_change_password"
                className="list-group-item-action text-start ms-4 fw-light"
              >
                Change Password
              </Link>
              <li>
                <Link
                  to="/teacher_logout"
                  className="btn btn-sm text-danger fw-lighter text-end me-2"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default TeacherSideBar;
