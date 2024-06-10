import { Link, useNavigate } from "react-router-dom"; // for linking
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import {
  Card,
  Form,
  FormContainer,
  InnerBox,
  CardFront,
} from "../../componentcss/styledcss/Container.styled";
import "../../componentcss/login.css"; //for css

import { baseUrl } from "../exports";

function TeacherforgotPassword() {
  const [teacherData, setTeacherData] = useState({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //change element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  const navigate = useNavigate();
  //login form fxn
  const loginForm = () => {
    // console.log(teacherData);
    const teacherLoginFormData = new FormData();
    teacherLoginFormData.append("email", teacherData.email);

    try {
      axios
        .post(baseUrl + "/teacher_forgot_password", teacherLoginFormData)
        .then((res) => {
          if (res.data.bool === true) {
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
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus === "true") {
    window.location.href = "/teacher_dashboard";
  }
  //end of login form fxn

  useEffect(() => {
    document.title = "SS | Teacher Forgot Password";
  });
  //CSS
  const logo_text = {
    background: "linear-gradient(to top, #ffe838, #fd57bf)",
    "font-family": ' "Courier New", Courier',
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "user-select": "none",
  };
  return (
    <FormContainer>
      <Card className="card">
        <InnerBox>
          <CardFront>
            <h2 className="text-muted">Forgot Password?</h2>
            {successMessage && (
              <p className="text-success fs-6 fw-light">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-danger fs-6 fw-light">{errorMessage}</p>
            )}
            <Form method="POST" autocomplete="off">
              <label className="float-start text-muted">
                Enter your registered email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={teacherData.email}
                className="input-box"
                placeholder="email"
                required
              />

              <div className="btn">
                <button onClick={loginForm} className="login-btn">
                  Submit
                </button>
              </div>
              <div className="auth-wrap">
                <p className="card text-info bg-dark">
                  You don't have an account?
                  <Link to="/teacher_register">Register</Link>
                </p>
              </div>
              <span style={logo_text} className="border-top py-1"> &copy;Socrates Schools</span>
            </Form>
          </CardFront>
        </InnerBox>
      </Card>
    </FormContainer>
  );
}
export default TeacherforgotPassword;
