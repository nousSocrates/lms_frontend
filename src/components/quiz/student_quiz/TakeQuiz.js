import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from "../../student/StudentSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";

import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function TakeQuiz() {
  const [questionData, setQuestionData] = useState([]);
  const { quiz_id } = useParams();
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | Exam Questions";
    //axios fetch first question when page loads
    try {
      axios.get(baseUrl + "/quiz_questions/" + quiz_id + "/1").then((res) => {
        setQuestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(questionData);
  //SUBMIT A CHOICE
  const submitChoice = (question_id, correct_choice) => {
    const _formData = new FormData();
    _formData.append("student", student_id);
    _formData.append("question", question_id);
    _formData.append("correct_choice", correct_choice);

    try {
      axios.post(baseUrl + "/attempt_quiz/", _formData).then((res) => {
        //console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          //axios fetch next question when page loads
          try {
            axios
              .get(
                baseUrl +
                  "/quiz_questions/" +
                  quiz_id +
                  "/next_question/" +
                  question_id
              )
              .then((res) => {
                setQuestionData(res.data);
              });
          } catch (error) {
            console.log(error);
          }
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
          <h2 className=" bg-success mb-3 border-bottom pb-1">
            ......Quiz Title....
          </h2>
          {/* data mapping */}
          {questionData.map((row, index) => (
            <div className="card text-dark text-start bg-success">
              <div className="card-body ms-1 bg-light">
                <h5 className="card-header">{row.question}</h5>
                <table className="table">
                  <tbody className="light">
                    <tr>
                      <td>
                        <button
                          onClick={() => submitChoice(row.id, row.choice_A)}
                          className="btn btn-outline-secondary"
                        >
                          {row.choice_A}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          onClick={() => submitChoice(row.id, row.choice_B)}
                          className="btn btn-outline-secondary"
                        >
                          {row.choice_B}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          onClick={() => submitChoice(row.id, row.choice_C)}
                          className="btn btn-outline-secondary"
                        >
                          {row.choice_C}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          onClick={() => submitChoice(row.id, row.choice_D)}
                          className="btn btn-outline-secondary"
                        >
                          {row.choice_D}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-dark btn-sm">Skip</button>
                  <button className="btn btn-primary btn-sm ms-2">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Container>
  );
}

export default TakeQuiz;
