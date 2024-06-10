import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import StudentSideBar from ".//StudentSideBar";
import StudentTeacherChats from "./StudentTeacherChats";
import { Container } from "../../componentcss/styledcss/Container.styled";


import { baseUrl } from "../exports";

function MyTeachers() {
  const [teacherData, setTeacherData] = useState([]);

  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | My Tutors";
    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/fetch_my_teachers/" + student_id).then((res) => {
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  //======================== CHAT BOX ==================================================
  const [messageData, setMessageData] = useState({
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //change element value
  const handleChange = (event) => {
    setMessageData({
      ...messageData,
      [event.target.name]: event.target.value,
    });
  };
  //message post to one student
  const messageFormPost = (teacher_id) => {
    const _formData = new FormData();
    _formData.append("message", messageData.message);
    _formData.append("sender", "student");

    try {
      axios
        .post(
          baseUrl + "/student_post_message/" + student_id + "/" + teacher_id,
          _formData
        )
        .then((res) => {
          if (res.data.bool === true) {
            setMessageData({
              message: "",
            });
            setSuccessMessage(res.data.message);
            setErrorMessage("");
          } else {
            setErrorMessage(res.data.message);
            setSuccessMessage("");
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
          <div className="card ">
            <h5 className="card-header bg-success text-warning">My tutors</h5>
            <div className="card-body">
              <table className="table table-striped">
                <thead className="alert alert-success">
                  <tr>
                    <th className="text-start">Name</th>
                    <th className="text-start">Phone</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* data mapping */}
                  {teacherData.map(
                    (
                      row,
                      index // notice the row, data fetched one level down
                    ) => (
                      <tr>
                        <td>
                          <Link
                            to={"/teacher_details/" + row.teacher.id}
                            className="text-start text-success fw-light"
                          >
                            {index +
                              1 +
                              ".  Teacher  " +
                              row.teacher.first_name}
                          </Link>
                        </td>
                        <td>
                          <span className="float-start text-muted  fw-light">
                            {row.teacher.phone_number}
                          </span>
                        </td>
                        <td className="d-flex justify-content-start ">
                          <button
                            type="button"
                            className="btn btn-outline-info btn-sm fw-lighter p-1"
                            data-bs-toggle="modal"
                            data-bs-target={"#msgModal" + index}
                          >
                            <i className="fa fa-comment"></i>
                          </button>
                          {/* <!-- To one student Message Modal --> */}
                          <div
                            className="modal fade"
                            id={"msgModal" + index}
                            tabindex="-1"
                            aria-labelledby="msgModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
                              <div className="modal-content">
                                <div className="modal-header bg-success">
                                  <h3
                                    className="modal-title fs-3 "
                                    id="msgModalLabel"
                                  >
                                    <p className="text-warning">
                                      {"Teacher " + row.teacher.first_name}
                                    </p>
                                  </h3>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-md-4 border-end">
                                      {/* Backend messages */}
                                      {successMessage && (
                                        <p className="text-success fs-6 fw-light">
                                          {successMessage}
                                        </p>
                                      )}
                                      {errorMessage && (
                                        <p className="text-danger fs-6 fw-light">
                                          {errorMessage}
                                        </p>
                                      )}
                                      {/* end */}
                                      <form>
                                        <div className="mb-2">
                                          <label
                                            for="message"
                                            className="form-label float-start"
                                          >
                                            Message
                                          </label>
                                          <textarea
                                            name="message"
                                            onChange={handleChange}
                                            value={messageData.message}
                                            className="form-control"
                                            rows="6"
                                          ></textarea>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            messageFormPost(row.teacher.id)
                                          }
                                          className="btn btn-sm btn-success float-end me-2"
                                        >
                                          Post
                                        </button>
                                      </form>
                                    </div>
                                    <div className="col-md-8 mb-1 col-12">
                                      <StudentTeacherChats
                                        teacher_id={row.teacher.id}
                                        student_id={student_id}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default MyTeachers;
