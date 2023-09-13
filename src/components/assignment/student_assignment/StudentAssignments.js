import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from "../../student/StudentSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
//import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentAssignments() {
  const [assignmentData, setAssignmentData] = useState([]);

  const student_id = localStorage.getItem("student_id");
  //const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    document.title = "SS | My Assignments";
    //axios fetch assignments when page loads
    try {
      axios.get(baseUrl + "/student_assignments/" + student_id).then((res) => {
        setAssignmentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData);

  //Student put assignment data
  const markAsDone = (assignment_id, title, detail, student, teacher) => {
    const _formData = new FormData();
    _formData.append("student_assignment_status", true);
    _formData.append("title", title);
    _formData.append("detail", detail);
    _formData.append("student", student);
    _formData.append("teacher", teacher);
    try {
      axios
        .put(
          baseUrl + "/student_mark_assignment_status/" + assignment_id,
          _formData,
          {
            headers: {
              "content-type": "multipart/form-data", //allows posting of img and video data to db
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
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
          <StudentSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">My Assignments</h5>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-start">Assignment</th>

                    <th className="text-start">Teacher</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* data mapping */}
                  {assignmentData.map(
                    (
                      row,
                      index // notice the row, data fetched one level down
                    ) => (
                      <tr>
                        <td>
                          <Link
                            to={"/course_details/" + row.id}
                            className="text-start ms-4 fs-6 fw-normal text-success"
                          >
                            {index + 1 + ". " + row.title}
                          </Link>
                        </td>

                        <td className="text-start text-secondary">
                          {row.teacher.surname + " " + row.teacher.first_name}
                        </td>
                        <td className="text-start">
                          {row.student_assignment_status === false && (
                            <button
                              onClick={() =>
                                markAsDone(
                                  row.id,
                                  row.title,
                                  row.detail,
                                  row.student.id,
                                  row.teacher.id
                                )
                              }
                              className="btn btn-success btn-sm p-1"
                            >
                              Mark as done
                            </button>
                          )}
                          {row.student_assignment_status === true && (
                            <span className="badge bg-primary">Completed</span>
                          )}
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

export default StudentAssignments;
