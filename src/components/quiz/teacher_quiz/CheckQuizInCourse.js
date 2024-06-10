import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../../exports";

// CHILD COMPONENT TP AssignQuiz component
function CheckQuizInCourse(props) {
  const [quizData, setQuizData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    //axios fetch quize assogned status when page loads
    try {
      axios
        .get(
          baseUrl +
            "/fetch_quiz_assigned_status/" +
            props.quiz +
            "/" +
            props.course
        )
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //Assign Quiz to course
  const handleAssignQuiz = (quiz_id) => {
    const _formData = new FormData();
    _formData.append("teacher", teacher_id);
    _formData.append("course", props.course);
    _formData.append("quiz", props.quiz);
    try {
      axios
        .post(baseUrl + "/quiz_assigned_course/", _formData, {
          headers: { "content-type": "multipart/form-data" },
        })
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
    <td className="d-flex justify-content-center ">
      {quizData.bool === false && (
        <span
          onClick={() => handleAssignQuiz(props.quiz)}
          className="btn btn-primary btn-sm fw-light p-1"
        >
          <i className="bi bi-pencil-square text-warning me-1" />
          Assign Quiz
        </span>
      )}
      {quizData.bool === true && (
        <>
          <Link className="btn  btn-sm btn-secondary fw-light ">Assigned</Link>
          <Link
            to={"/quiz_candidates/" + props.quiz}
            className="btn btn-sm btn-info fw-light ms-1"
          >
            See Candidates
          </Link>
        </>
      )}
    </td>
  );
}

export default CheckQuizInCourse;
