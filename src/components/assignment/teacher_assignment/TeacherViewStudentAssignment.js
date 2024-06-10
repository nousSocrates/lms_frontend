import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../../exports";

function TeacherViewStudentAssignment() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState([0]);
  const { student_id } = useParams();
  const { teacher_id } = useParams();

  useEffect(() => {
    document.title = "SS | Uploaded Assignments";
    //axios fetch courses when page loads
    try {
      axios
        .get(baseUrl + "/assignment/" + teacher_id + "/" + student_id)
        .then((res) => {
          setAssignmentData(res.data);
          setTotalAssignments(res.data.length);
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
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark ">
              Given Assignments ({totalAssignments})
              <Link
                to={"/add_assignment/" + student_id + "/" + teacher_id}
                className=" btn btn-success btn-sm float-end"
              >
                Add Assignment
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="text-uppercase text-start mx-3">Title</th>
                    <th className="text-uppercase text-start mx-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {assignmentData.map((row, index) => (
                    <tr>
                      <td className="text-start">
                        {index + 1 + ". " + row.title}
                      </td>
                      <td>
                        {row.student_assignment_status === false && (
                          <span className="badge bg-warning">Pending</span>
                        )}
                        {row.student_assignment_status === true && (
                          <span className="badge bg-success">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
export default TeacherViewStudentAssignment;
