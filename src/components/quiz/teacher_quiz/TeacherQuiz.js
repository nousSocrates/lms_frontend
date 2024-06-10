import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../../teacher/TeacherSideBar";
import { Container } from "../../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../../exports";

function TeacherQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState([0]);

  const teacher_id = localStorage.getItem("teacher_id");


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
  }, []);
  // console.log(quizData);

  //Sweet alert confirm delete
  const Swal = require("sweetalert2"); //from installed sweetalert
  const handleDeleteQuiz = (quiz_id) => {
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
          axios.delete(baseUrl + "/quiz/" + quiz_id).then((res) => {
            Swal.fire("Deleted!", "Your quiz has been deleted.", "success");

            try {
              axios
                .get(baseUrl + "/teacher_quiz/" + teacher_id)
                .then((res) => {
                  setQuizData(res.data);
                  setTotalQuiz(res.data.length);
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("Error!", "Your quiz has not deleted.", "danger");
        }
      } else {
        Swal.fire("Error!", "Your quiz has not deleted.", "danger");
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
            <h5 className="card-header text-dark ">My Quiz</h5>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className=" text-uppercase fw-bold  fs-6">Title</th>
                    <th className=" bg-info text-uppercase fw-bold fs-6">
                      Total Questions
                    </th>
                    <th className="bg-danger text-uppercase fw-bold  fs-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {quizData.map((row, index) => (
                    <tr>
                      <td className=" py-2 fs-6 ">
                        <Link
                          to={"/quiz_questions/" + row.id}
                          className="text-start text-success ms-2"
                        >
                          {row.title}
                        </Link>
                      </td>
                      <td className=" py-2 fs-6 ">
                        {totalQuiz}
                      </td>

                      <td className="d-flex justify-content-center ">
                        <button className=" btn btn-info btn-sm ">
                          <Link to={"/edit_quiz/"+ row.id}>
                            <i className="bi bi-pencil-square text-white p-1"></i>
                          </Link>
                        </button>

                        <Link
                          to={"/add_question/" + row.id}
                          className="text-start text-success ms-2"
                        >
                          Add Questions
                        </Link>

                        <button className="btn btn-danger btn-sm ms-2">
                          <Link onClick={()=>handleDeleteQuiz(row.id)}>
                            <i className="bi bi-trash text-white"></i>
                          </Link>
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

export default TeacherQuiz;
