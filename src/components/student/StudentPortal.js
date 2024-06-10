import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import { Container } from "../../componentcss/styledcss/Container.styled";
import StudentSideBar from "./StudentSideBar";

import { baseUrl } from "../exports";

function StudentPortal() {
  const [portalData, setPortalData] = useState([]);
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | Student Portal";

    try {
      axios.get(baseUrl + "/student/portal/" + student_id).then((res) => {
        setPortalData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container className="mt-6">
      <div className="row">
        <aside className="col-md-3">
          <StudentSideBar />
        </aside>

        <section className="col-md-9">
          <div className="row">
            <div className="col-md-3">
              <div className="card border-secondary">
                <h6 className="card-header bg-secondary text-white">
                  Enrolled Courses
                </h6>
                <div className="card-body">
                  <h3>
                    <Link to="/enrolled_courses">
                      {portalData.enrolled_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-info">
                <h6 className="card-header bg-info text-white">
                  Favorite Courses
                </h6>
                <div className="card-body">
                  <h3>
                    <Link to="/favorite_courses">
                      {portalData.favorite_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-success">
                <h6 className="card-header bg-success text-white">
                  Completed Tests
                </h6>
                <div className="card-body">
                  <h3>
                    <Link to="/student_assignments">
                      {portalData.completed_assignments}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-warning">
                <h6 className="card-header bg-warning text-white">
                  Pending Tests
                </h6>
                <div className="card-body">
                  <h3>
                    <Link  to="/student_assignments">
                      {portalData.pending_assignments}
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

export default StudentPortal;
