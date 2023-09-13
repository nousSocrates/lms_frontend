import { Container } from "../../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";

const baseUrl = "http://127.0.0.1:8000/api";
function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  //axios fetch courses when page loads
  useEffect(() => {
    document.title = "SS | Teacher Dashboard";
    //fetch couses
    try {
      axios.get(baseUrl + "/teacher/dashboard/" + teacher_id).then((res) => {
        setDashboardData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Container className="mt-6">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>

        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4">
              <div className="card border-success">
                <h5 className="card-header bg-success text-white">
                  Total Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher_courses">
                      {dashboardData.total_teacher_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-info">
                <h5 className="card-header bg-info text-white">
                  Total Strands
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/teacher_courses">
                      {dashboardData.total_teacher_strands}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-warning">
                <h5 className="card-header bg-warning text-white">
                  Total Students
                </h5>
                <div className="card-body">
                  <h3>
                    <Link to="/my_students">
                      {dashboardData.total_teacher_students}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default TeacherDashboard;
