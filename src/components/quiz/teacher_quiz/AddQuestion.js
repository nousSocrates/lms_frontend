import { useEffect, useState } from "react"; //for hooking
import { Link } from "react-router-dom";
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function AddQuestion() {
  const [questionData, setQuestionData] = useState({
    quiz: "",
    question: "",
    choice_A: "",
    choice_B: "",
    choice_C: "",
    choice_D: "",
    correct_choice: "",
  });

  useEffect(() => {
    document.title = "SS | Add Question";
  });

  //change element value
  const handleChange = (event) => {
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  //Question Upload fxn

  const { quiz_id } = useParams();

  const questionFormUpload = () => {
    const _formData = new FormData();
    _formData.append("quiz", quiz_id);
    _formData.append("question", questionData.question);
    _formData.append("choice_A", questionData.choice_A);
    _formData.append("choice_B", questionData.choice_B);
    _formData.append("choice_C", questionData.choice_C);
    _formData.append("choice_D", questionData.choice_D);
    _formData.append("correct_choice", questionData.correct_choice);

    try {
      axios
        .post(baseUrl + "/quiz_questions/" + quiz_id, _formData, {})
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Question has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });

            window.location.reload();
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
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Add Question </h5>{" "}
            <span>
              <Link
                to={"/quiz_questions/" + quiz_id}
                className=" btn btn-success btn-sm float-end me-3"
              >
                See all
              </Link>
            </span>
            <div className="card-body">
              <form className="bg-secondary border-round text-dark  text-align-start p-3">
                <div className="mb-3">
                  <label for="question" className="form-label float-start">
                    Question
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="question"
                    name="question"
                    className="form-control"
                  ></input>
                </div>
                <div className="bg-light p-2">
                  <div className="mb-3">
                    <label for="choice_A" className="form-label float-start">
                      Choice A
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="choice_A"
                      name="choice_A"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label for="choice_B" className="form-label float-start">
                      Choice B
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="choice_B"
                      name="choice_B"
                      className="form-control"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label for="choice_C" className="form-label float-start">
                      Choice C
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="choice_C"
                      name="choice_C"
                      className="form-control"
                    ></input>
                  </div>

                  <div className="mb-3">
                    <label for="choice_D" className="form-label float-start">
                      Choice D
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="choice_D"
                      name="choice_D"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    for="correct_choice"
                    className="form-label float-start"
                  >
                    Correct answer
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="correct_choice"
                    name="correct_choice"
                    className="form-control"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={questionFormUpload}
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

export default AddQuestion;
