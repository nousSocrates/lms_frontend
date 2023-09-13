import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function EditQuiz() {
  const [quizData, setQuizData] = useState({
    title: "",
    detail: "",
  });
  const teacher_id = localStorage.getItem("teacher_id");
  const { quiz_id } = useParams();
  useEffect(() => {
    document.title = "SS | Edit Quiz";

    //fetch current quiz data
    try {
      axios.get(baseUrl + "/teacher_quiz_details/" + quiz_id).then((res) => {
        setQuizData({
          title: res.data.title,
          detail: res.data.detail,
        });
        console.log(quizData);
      });
    } catch (error) {
      console.log(error);
    }

    //end
  }, []);
  // console.log(categories);
  //change element value
  const handleChange = (event) => {
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
  };
  //quizUpdate fxn
 
  const quizFormUpdate = () => {
    const _formData = new FormData();
    _formData.append("teacher", teacher_id);
    _formData.append("title", quizData.title);
    _formData.append("detail", quizData.detail);

    try {
      axios
        .put(baseUrl + "/teacher_quiz_details/" + quiz_id, _formData, {})
        .then((res) => {
          if (res.status === 200) {
            //Sweet alert confirm delete
            Swal.fire({
              title: "Your quiz is now updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          // window.location.href = "/add_course"; //clears data and refresh page
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
            <h5 className="card-header text-dark">Edit Quiz</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
             
                <div className="mb-3">
                  <label for="title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    value={quizData.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    id="title"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    for="detail"
                    className="form-label float-start"
                  >
                    Description
                  </label>
                  <input
                    value={quizData.detail}
                    onChange={handleChange}
                    name="detail"
                    type="text"
                    id="detail"
                    className="form-control"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={quizFormUpdate}
                  className="btn btn-primary float-end "
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default EditQuiz;
