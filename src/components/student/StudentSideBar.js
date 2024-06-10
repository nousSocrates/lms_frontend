import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl } from "../exports";

function StudentSideBar() {
  const [notificationData, setNotificationData] = useState([]);
  const student_id = localStorage.getItem("student_id");

  const [studentData, setStudentData] = useState({
    prev_profile_picture: "",
    username: "",
  });

  useEffect(() => {
    //fetch profile picture

    try {
      axios.get(baseUrl + "/student/" + student_id).then((res) => {
        setStudentData({
          prev_profile_picture: res.data.profile_picture,
          username: res.data.username,
        });
        console.log(studentData);
      });
    } catch (error) {
      console.log(error);
    }

    //fetch notifications
    try {
      axios
        .get(baseUrl + "/student/fetch_all_notifications/" + student_id)
        .then((res) => {
          setNotificationData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="card">
      <div className="side-nav">
        <div className="d-flex flex-column">
          <div className="profile bg-success ">
            <Link to="/student_portal">
              {studentData.prev_profile_picture && (
                <img
                  src={studentData.prev_profile_picture}
                  alt="Profile"
                  className="img-fluid  rounded-circle m-auto"
                />
              )}
            </Link>
            <Link to="/student_portal" className="username text-dark">
              {studentData.username}
            </Link>
          </div>
        </div>

        <nav className="bg-dark">
          <div className="card-header bg-warning">
            <Link
              to="/student_portal"
              className="text-decoration-none text-uppercase fw-normal text-success "
            >
              Dashboard
            </Link>
          </div>
          <div className="nav-menu">
            <ul className="list-group">
              <li>
                <Link
                  to="/student_profile"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/enrolled_courses"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  Enrolled Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my_tutors"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  My Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/favorite_courses"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  Favorite Courses
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  Recommended Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/student_assignments"
                  className="list-group-item-action text-start ms-2 fw-light"
                >
                  Assignments
                  <span className="badge bg-danger float-end mt-1 me-5 ">
                    {notificationData.length}
                  </span>
                </Link>
              </li>
              <Link
                to="/student_change_password"
                className="list-group-item-action text-start ms-2 fw-light"
              >
                Change Password
              </Link>
              <li>
                <Link
                  to="/student_logout"
                  className="btn btn-sm fw-lighter p-1 text-end me-2"
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

export default StudentSideBar;
