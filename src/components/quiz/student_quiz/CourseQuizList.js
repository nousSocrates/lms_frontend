import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from "../../student/StudentSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
//props
import CheckQuizInCourse from "./CheckQuizStatusForStudent";
import CheckQuizStatusForStudent from "./CheckQuizStatusForStudent";

const baseUrl = "http://127.0.0.1:8000/api";

function CourseQuizList() {
  const [quizData, setQuizData] = useState([]);

  const student_id = localStorage.getItem("student_id");
  const { course_id } = useParams();

  useEffect(() => {
    document.title = "SS | Assigned Quizes";
    //axios fetch courses when page loads
    try {
      axios
        .get(baseUrl + "/fetch_course_assigned_quiz/" + course_id)
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(quizData);

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <StudentSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">EXAMS</h5>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="text-start">Quiz</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.map((row, index) => (
                    <tr>
                      <td className="text-start">{row.quiz.title}</td>
                      {/* <td className="d-flex justify-content-start ">
                        <Link
                          to={"/take_quiz/" + row.quiz.id}
                          className="btn btn-outline-info btn-sm fw-lighter p-1"
                        >
                          Take Quiz
                        </Link>
                      </td> */}
                      <CheckQuizStatusForStudent
                        quiz={row.quiz.id}
                        student={student_id}
                      />
                    </tr>
                  ))}
                  {/* <tr>
                    <td className="text-start">Performing Arts</td>
                    <td className="d-flex justify-content-start ">Done</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default CourseQuizList;
