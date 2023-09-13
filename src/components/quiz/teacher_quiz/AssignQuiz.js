import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import CheckQuizInCourse from "./CheckQuizInCourse";

const baseUrl = "http://127.0.0.1:8000/api";

function AsignQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  const { course_id } = useParams();
  useEffect(() => {
    document.title = "SS | My Quiz";
    //axios fetch quizes when page loads
    try {
      axios.get(baseUrl + "/teacher_quizes/" + teacher_id).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    //fetch courses when page loads
    try {
      axios.get(baseUrl + "/courses/" + course_id).then((res) => {
        setCourseData(res.data);
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
            <h6 className="card-header text-dark ">
              Assign Quiz to:{" "}
              <span className="text-success"> {courseData.course_title}</span>
            </h6>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className=" text-uppercase fw-bold  fs-6">Title</th>

                    <th className="bg-warning text-uppercase fw-bold  fs-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {quizData.map((row, index) => (
                    <tr>
                      <td>
                        <Link
                          to={"/quiz_questions/" + row.quiz_id}
                          className="fw-normal text-success text-start"
                        >
                          {index + 1 + ". " + row.title}
                        </Link>
                      </td>

                      <td>
                        <CheckQuizInCourse quiz={row.id} course={course_id} />
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

export default AsignQuiz;
