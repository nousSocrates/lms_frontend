import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
const baseUrl = "http://127.0.0.1:8000/api";

function QuizQuestions() {
  const [questionData, setQuestionData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([0]);
  const { question_id } = useParams();
  const { quiz_id } = useParams();

  useEffect(() => {
    document.title = "SS | Quiz Questions";
    //axios fetch questions when page loads
    try {
      axios.get(baseUrl + "/quiz_questions/" + quiz_id).then((res) => {
        setQuestionData(res.data);
        setTotalQuestions(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(questionData);

  //Sweet alert confirm delete
  const Swal = require("sweetalert2"); //from installed sweetalert
  const handleDeleteQuestion = (question_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + "/questions/" + question_id).then((res) => {
            Swal.fire("Deleted!", "Your question has been deleted.", "success");

            try {
              axios.get(baseUrl + "/quiz_questions/" + quiz_id).then((res) => {
                setQuestionData(res.data);
                setTotalQuestions(res.data.length);
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("Error!", "Your question has not deleted.", "danger");
        }
      } else {
        Swal.fire("Error!", "Your question has not deleted.", "danger");
      }
    });
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark ">
              Quiz ***TITLE*** Questions ({totalQuestions}){" "}
              <Link
                to={"/add_question/" + quiz_id}
                className=" btn btn-success btn-sm float-end"
              >
                Add Question
              </Link>
            </h5>
            <div className="card-body">
              {" "}
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="text-uppercase text-start fs-5">Question</th>
                    <th className="text-uppercase text-start fs-5">Answer</th>
                    <th className="text-uppercase text-start fs-5">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {questionData.map((question, index) => (
                    <tr>
                      <td className="text-start ">
                        <Link
                          to={"/edit_question/" + question.id}
                          className="text-start text-decoration-none text-success fw-normal"
                        >
                          {index + 1 + ". " + question.question}
                        </Link>
                      </td>

                      <td className="text-start">{question.correct_choice}</td>
                      <td className="d-flex justify-content-center ">
                        {/* edit button */}
                        <Link
                          to={"/edit_question/" + question.id}
                          className=" btn btn-info btn-sm "
                        >
                          <i className="bi bi-pencil-square text-white"></i>
                        </Link>
                        {/* delete button */}
                        <button
                          onClick={() => handleDeleteQuestion(question_id)}
                          className="btn btn-danger btn-sm ms-1 fs-6"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
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
export default QuizQuestions;
