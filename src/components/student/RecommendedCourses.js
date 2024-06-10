import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from ".//StudentSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function RecommendedCourses() {
  const [courseData, setCourseData] = useState([]);

  const studentId = localStorage.getItem("student_id");
 // console.log(studentId)

  useEffect(() => {
    document.title = "SS | Recommended Courses";
    //axios fetch courses when page loads
    try {
      axios
        .get(baseUrl + "/fetch_student_recommended_courses/" + studentId)
        .then((res) => {
          setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData);

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <StudentSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Recommended Courses</h5>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Technologies</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* data mapping */}
                  {courseData.map(
                    (
                      row,
                      index // notice the row, data fetched one level down
                    ) => (
                      <tr>
                        <td>
                          <Link
                            to={"/course_details/" + row.course.id}
                            className="text-start text-success"
                          >
                            {index + 1 + ". " + row.course.course_title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={"/teacher_details/" + row.course.teacher.id}
                            className="text-start fs-6 text-success"
                          >
                            {row.course.teacher.surname +
                              " " +
                              row.course.teacher.first_name}
                          </Link>
                        </td>
                        <td className="text-start fs-6 text-primary">{row.course.course_techs}</td>
                        <td className="d-flex float-end">
                          <Link to={"/course_details/" + row.course.id}>
                            <button className="btn btn-success btn-sm p-1">
                              Explore
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default RecommendedCourses;
