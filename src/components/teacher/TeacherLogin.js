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

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //change element value
  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };
  const navigate = useNavigate();
  //login form fxn
  const loginForm = () => {
    // console.log(teacherLoginData);
    const teacherLoginFormData = new FormData();
    teacherLoginFormData.append("email", teacherLoginData.email);
    teacherLoginFormData.append("password", teacherLoginData.password);
    try {
      axios
        .post(baseUrl + "/teacher_login", teacherLoginFormData)
        .then((res) => {
          if (res.data.bool === true) {
            if (res.data.login_via_otp === true) {
              navigate("/verify_teacher/" + res.data.teacher_id);
            } else {
              localStorage.setItem("teacherLoginStatus", true);
              localStorage.setItem("teacher_id", res.data.teacher_id);
              navigate("/teacher_dashboard");
            }
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
    window.location.href = "/teacher_dashboard";
  }
  //end of login form fxn

  useEffect(() => {
    document.title = "SS | Teacher login";
  });
  //CSS
  const logo_text = {
    "background": "linear-gradient(to top, #ffe838, #fd57bf)",
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
            <h2 className="text-muted">LOGIN</h2>
            {errorMessage && (
              <p className="text-danger fs-6 fw-light">{errorMessage}</p>
            )}
            <Form method="POST" autocomplete="off">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={teacherLoginData.email}
                className="input-box"
                placeholder="Email"
                required
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={teacherLoginData.password}
                className="input-box"
                placeholder="Password"
                required
              />
              <input type="checkbox" />
              <span>Remember me</span>
              <div className="btn">
                <button onClick={loginForm} className="login-btn">
                  Login
                </button>
              </div>
              <div className="auth-wrap">
              <p className="card text-info bg-dark">
                  Forgot Password?
                  <Link to="/teacher_forgot_password_email">Reset password</Link>
                </p>
                <p className="card text-info bg-dark">
                  You don't have an account?
                  <Link to="/teacher_register">Register</Link>
                </p>
              </div>
              <span style={logo_text}> &copy;Socrates Schools</span>
            </Form>
          </CardFront>
        </InnerBox>
      </Card>
    </FormContainer>
  );
}
export default TeacherLogin;
