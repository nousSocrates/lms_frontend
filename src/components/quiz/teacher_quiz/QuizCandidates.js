import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import QuizResult from "./QuizResult";

import { baseUrl } from "../../exports";

function QuizCandidates() {
  const [studentData, setStudentData] = useState([]);

  const { quiz_id } = useParams();
  useEffect(() => {
    document.title = "SS | Quiz Candidates";
    //axios fetch quizes when page loads
    try {
      axios.get(baseUrl + "/attempted_quiz/" + quiz_id).then((res) => {
        setStudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h6 className="card-header text-dark ">Quiz Candidates</h6>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className=" text-uppercase fw-bold  fs-6">Name</th>
                    <th className=" text-uppercase fw-bold  fs-6">email</th>
                    <th className=" text-uppercase fw-bold  fs-6">Results</th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {studentData.map((row, index) => (
                    <tr>
                      <td>
                        <p className="text-dark">
                          {index + 1 + ". " + row.student.full_name}
                        </p>
                      </td>

                      <td>
                        <p className="text-dark">{row.student.email}</p>
                      </td>
                      <td>
                        <p className="d-flex justify-content-center ">
                          <p className="btn btn-sm fw-light badge bg-info">
                            36/50
                          </p>
                          <p className="btn btn-sm fw-light badge bg-success ms-1">
                            78%
                          </p>

                          <button
                            type="button"
                            className="btn btn-sm fw-lighter btn-outline-success mt-0 ms-1 p-1 mb-3"
                            data-bs-toggle="modal"
                            data-bs-target={"#resultModal"}
                          >
                            See Details
                          </button>
                          <div
                            className="modal fade"
                            id={"resultModal"}
                            aria-labelledby="result"
                            tabIndex="-1"
                            aria-hidden="true"
                          >
                            <QuizResult
                              quiz={row.quiz.id}
                              student={row.student.id}
                            />
                          </div>
                        </p>
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

export default QuizCandidates;
