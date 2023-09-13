import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import TeacherStudentChats from "./TeacherStudentChats";
import { Container } from "../../componentcss/styledcss/Container.styled";

const baseUrl = "http://127.0.0.1:8000/api";

function MyStudents() {
  const [studentData, setStudentData] = useState([]);

  const teacher_id = localStorage.getItem("teacher_id");
  console.log("Teacher ID =" + teacher_id);
  useEffect(() => {
    document.title = "SS | My Students";
    //axios fetch enrolled students when page loads
    try {
      axios
        .get(baseUrl + "/fetch_teacher_enrolled_students/" + teacher_id)
        .then((res) => {
          setStudentData(res.data);
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
  const messageFormPost = (student_id) => {
    const _formData = new FormData();
    _formData.append("message", messageData.message);
    _formData.append("sender", "teacher");

    try {
      axios
        .post(
          baseUrl + "/teacher_post_message/" + teacher_id + "/" + student_id,
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

  //======================== Message to ALL ==================================================
  const [groupMessageData, setGroupMessageData] = useState({
    message: "",
  });
  const [groupSuccessMessage, setGroupSuccessMessage] = useState("");
  const [groupErrorMessage, setGroupErrorMessage] = useState("");
  //change element value
  const groupHandleChange = (event) => {
    setGroupMessageData({
      ...groupMessageData,
      [event.target.name]: event.target.value,
    });
  };
  //message post to All
  const groupMessageFormSend = () => {
    const _formData = new FormData();
    _formData.append("message", groupMessageData.message);
    _formData.append("sender", "teacher");

    try {
      axios
        .post(baseUrl + "/teacher_post_message_to_all/" + teacher_id, _formData)
        .then((res) => {
          if (res.data.bool === true) {
            setGroupMessageData({
              message: "",
            });
            setGroupSuccessMessage(res.data.message);
            setGroupErrorMessage("");
          } else {
            setGroupErrorMessage(res.data.message);
            setGroupSuccessMessage("");
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
            <h5 className="card-header text-dark">
              My Students{" "}
              <button
                type="button"
                title="Send message to all"
                className="btn btn-sm float-end btn-primary text-warning"
                data-bs-toggle="modal"
                data-bs-target="#groupMessageModal"
              >
                Send message to all
              </button>
            </h5>

            {/* message to all modal */}
            <div
              className="modal fade"
              id="groupMessageModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staicBackdroLabel"
              aria-hidden="ture"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-success">
                    <h5 className="modal-title text-warning">
                      Send Message to all students
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
                    {/* Backend messages */}
                    {groupSuccessMessage && (
                      <p className="text-success fs-6 fw-light">
                        {groupSuccessMessage}
                      </p>
                    )}
                    {groupErrorMessage && (
                      <p className="text-danger fs-6 fw-light">
                        {groupErrorMessage}
                      </p>
                    )}
                    {/* end */}
                    <form>
                      <div className="mb-2">
                        <label
                          for="message"
                          className="form-label float-start text-dark "
                        >
                          Message
                        </label>
                        <textarea
                          name="message"
                          onChange={groupHandleChange}
                          value={groupMessageData.message}
                          className="form-control"
                          rows="6"
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={groupMessageFormSend}
                        className="btn btn-sm btn-success float-end me-2"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="  text-uppercase fw-bold text-start px-2 fs-6 ">
                      Name
                    </th>
                    <th className=" text-uppercase text-start fw-bold px-2 fs-6">
                      Phone
                    </th>
                    <th className=" text-uppercase text-start px-2 fw-bold fs-6">
                      Email
                    </th>

                    <th className=" text-uppercase text-start px-2 fw-bold fs-6">
                      Assignment
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {studentData.map(
                    (
                      row,
                      index // notice the row, data fetched one level down
                    ) => (
                      <tr>
                        <td className="text-uppercase py-1 fs-6 text-start">
                          {index + 1 + ". " + row.student.full_name}
                        </td>
                        <td className="py-1 fs-6 text-start">
                          {row.student.phone_number}
                        </td>

                        <td className="py-1 w-25 fs-6 text-start">
                          {row.student.email}
                        </td>

                        <td className="d-flex justify-content-start ">
                          <button className=" btn btn-outline-success btn-sm ">
                            <Link
                              to={
                                "/teacher_view_assignment/" +
                                row.student.id +
                                "/" +
                                teacher_id
                              }
                              className=" fw-lighter"
                            >
                              view
                            </Link>
                          </button>
                          <button className="btn btn-outline-warning btn-sm ms-1">
                            <Link
                              to={
                                "/add_assignment/" +
                                row.student.id +
                                "/" +
                                teacher_id
                              }
                              className="text-success fw-lighter"
                            >
                              Add
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm ms-1"
                            data-bs-toggle="modal"
                            data-bs-target={"#msgModal" + index}
                          >
                            <i className="fa fa-comment text-info"></i>
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
                                      {row.student.username}{" "}
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
                                            messageFormPost(row.student.id)
                                          }
                                          className="btn btn-sm btn-success float-end me-2"
                                        >
                                          Post
                                        </button>
                                      </form>
                                    </div>
                                    <div className="col-md-8 mb-1 col-12">
                                      <TeacherStudentChats
                                        teacher_id={teacher_id}
                                        student_id={row.student.id}
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
export default MyStudents;
