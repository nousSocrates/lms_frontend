import { Link, useNavigate } from "react-router-dom"; // for linking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";

import { baseUrl } from "../exports";

function TeacherOTP() {
  const [teacherOTP, setTeacherOTP] = useState({
    otp_code: "",
  });
  useEffect(() => {
    document.title = "SS |Teacher Verification ";
  });
  const [errorMessage, setErrorMessage] = useState("");
  //change element value
  const handleChange = (event) => {
    setTeacherOTP({
      ...teacherOTP,
      [event.target.name]: event.target.value,
    });
  };

  //verify account fxn
  const { teacher_id } = useParams();
  const navigate = useNavigate();
  const submitForm = () => {
    // console.log(teacherOTP);
    const teacherOTPFormData = new FormData();
    teacherOTPFormData.append("otp_code", teacherOTP.otp_code);

    try {
      axios
        .post(baseUrl + "/verify_teacher/" + teacher_id, teacherOTPFormData)
        .then((res) => {
          if (res.data.bool === true) {
            localStorage.setItem("teacherLoginStatus", true);
            localStorage.setItem("teacher_id", res.data.teacher_id);
            navigate("/teacher_dashboard");
          } else {
            setErrorMessage(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    navigate("/teacher_dashboard");
  }
  //end of login form fxn

  return (
    <Container>
      <div className="row ">
        <div className="col-6 offset-3">
          <div className="card bg-dark">
            <h6 className=" card-header bg-primary fs-6 fw-lighter ">
              Enter the 6 digit code send to your email
            </h6>
            <div className="card-body">
              {errorMessage && (
                <p className="text-danger fs-6 fw-light">{errorMessage}</p>
              )}
              <input
                onChange={handleChange}
                type="number"
                name="otp_code"
                value={teacherOTP.otp_code}
                className=" p-1 mx-5 my-0"
                placeholder="6-digits code"
                required
              />
            </div>
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-sm btn-outline-success float-end me-2"
          >
            Verify
          </button>
        </div>
      </div>
    </Container>
  );
}
export default TeacherOTP;
