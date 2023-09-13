import { useEffect, useState } from "react"; //for hooking
import { Link } from "react-router-dom";
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000/api";

function AddQuiz() {
  const [quizData, setQuizData] = useState({
    title: "",
    detail: "",
  });

  useEffect(() => {
    document.title = "SS | Add Quiz";
  });
  //change element value
  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };

  //courseUpload fxn
  const teacher_id = localStorage.getItem("teacher_id");
  const quizFormUpload = () => {
    //const teacher_id = localStorage.getItem["teacher_id"];
    const _formData = new FormData();
    _formData.append("teacher", teacher_id);
    _formData.append("title", quizData.title);
    _formData.append("detail", quizData.detail);
    try {
      axios.post(baseUrl + "/quiz/", _formData, {}).then((res) => {
        console.log(res.data);
        window.location.href = "/add_quiz"; //clears data and refresh page
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Add Quiz</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
                <div className="mb-3">
                  <label for="title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    id="title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="detail" className="form-label float-start">
                    Description
                  </label>
                  <input
                    onChange={handleChange}
                    name="detail"
                    type="text"
                    id="detail"
                    className="form-control"
                  />
                </div>
                <button
                  type="button"
                  onClick={quizFormUpload}
                  className="btn btn-primary float-end "
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
export default AddQuiz;
