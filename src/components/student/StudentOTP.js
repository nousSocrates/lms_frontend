import { useParams , useNavigate } from "react-router-dom"; // for linking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import { Container } from "../../componentcss/styledcss/Container.styled";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentOTP() {
  const [studentOTP, setStudentOTP] = useState({
    otp_code: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //change element value
  const handleChange = (event) => {
    setStudentOTP({
      ...studentOTP,
      [event.target.name]: event.target.value,
    });
  };

  //verify account fxn
  const { student_id } = useParams();
  const  navigate  = useNavigate();
  const submitForm = () => {
    // console.log(studentOTP);
    const studentOTPFormData = new FormData();
    studentOTPFormData.append("otp_code", studentOTP.otp_code);

    try {
      axios
        .post(baseUrl + "/verify_student/" + student_id, studentOTPFormData)
        .then((res) => {
          if (res.data.bool === true) {
            localStorage.setItem("studentLoginStatus", true);
            localStorage.setItem("student_id", res.data.student_id);
            navigate("/student_portal");
          } else {
            setErrorMessage(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");
  if (studentLoginStatus === "true") {
    navigate("/student_portal");
  }
  //end of login form fxn

  useEffect(() => {
    document.title = "SS | Student Verify ";
  });
  return (
    <Container>
      <div className="row ">
        <div className="col-6 offset-3">
          <div className="card bg-dark">
            <h6 className=" card-header bg-primary fs-6 fw-lighter ">
              Enter the 4 digit code send to your email
            </h6>
            <div className="card-body">
              {errorMessage && (
                <p className="text-danger fs-6 fw-light">{errorMessage}</p>
              )}
              <input
                onChange={handleChange}
                type="number"
                name="otp_code"
                value={studentOTP.otp_code}
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
export default StudentOTP;
