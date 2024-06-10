import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../../exports";

// CHILD COMPONENT TP AssignQuiz component
function CheckQuizStatusForStudent(props) {
  const [quizData, setQuizData] = useState([]);
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    //axios fetch quize assogned status when page loads
    try {
      axios
        .get(
          baseUrl +
            "/fetch_quiz_attempted_status/" +
            props.quiz +
            "/" +
            props.student
        )
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <td className="d-flex justify-content-center ">
    {quizData.bool === false && (
      <Link
      to={'/take_quiz/'+ props.quiz}
        className="btn btn-primary btn-sm fw-light"
      >
        <i className="bi bi-pencil-square text-danger me-1" />
        Take Quiz
      </Link>
    )}
    {quizData.bool === true && (
      <span className="btn btn-success fw-light btn-sm">Attempted</span>
    )}
  </td>
  );
}

export default CheckQuizStatusForStudent;
