import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api";
// CHILD COMPONENT TP AssignQuiz component
function QuizResult(props) {
  const [resultData, setResultData] = useState([]);
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    //axios fetch quize assogned status when page loads
    try {
      axios
        .get(baseUrl + "/fetch_quiz_result/" + props.quiz + "/" + props.student)
        .then((res) => {
          setResultData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="result">
            Quiz Results
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          {" "}
          <table className="table-bordered">
            <thead>
              <tr>
                <th>Total Questions</th>
                <th>Attempted Questions</th>
                <th>Correct Scores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resultData.total_questions}</td>
                <td>{resultData.total_attempted}</td>
                <td>{resultData.total_correct_choices}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
