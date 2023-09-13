import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from ".//StudentSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

const baseUrl = "http://127.0.0.1:8000/api";

function EnrolledCourses() {
  const [courseData, setCourseData] = useState([]);

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | Enrolled Courses";
    //axios fetch courses when page loads
    try {
      axios
        .get(baseUrl + "/fetch_student_enrolled_courses/" + student_id)
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
            <h5 className="card-header text-dark">Enrolled Courses</h5>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-start">Course</th>
                    <th className="text-start">Teacher</th>
                    <th className="text-start">Action</th>
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
                            className="text-start text-success fw-normal"
                          >
                            {index + 1 + ". " + row.course.course_title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={"/teacher_details/" + row.course.teacher.id}
                            className="text-start text-secondary fw-normal"
                          >
                            {row.course.teacher.surname +
                              " " +
                              row.course.teacher.first_name}
                          </Link>
                        </td>
                        <td className="d-flex justify-content-start ">
                          <Link to={"/course_details/" + row.course.id}>
                            <button className="btn btn-outline-info btn-sm fw-lighter p-1">
                              Tutorials
                            </button>
                          </Link>
                          <Link
                            to={"/student_study_materials/" + row.course.id}
                            className=""
                          >
                            <button className="btn btn-outline-success btn-sm fw-lighter ms-1 p-1">
                              Materials
                            </button>
                          </Link>
                          <Link
                            to={"/course_quiz/" + row.course.id}
                            className=""
                          >
                            <button className="btn btn-outline-danger btn-sm fw-lighter ms-1 p-1">
                              Exams
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

export default EnrolledCourses;
