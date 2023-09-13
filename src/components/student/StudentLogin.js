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

function StudentLogin() {
  const [studentLoginData, setStudentLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //change element value
  const handleChange = (event) => {
    setStudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  //login form fxn
  const loginForm = () => {
    // console.log(studentLoginData);
    const studentLoginFormData = new FormData();
    studentLoginFormData.append("username", studentLoginData.username);
    studentLoginFormData.append("password", studentLoginData.password);
    try {
      axios
        .post(baseUrl + "/student_login", studentLoginFormData)
        .then((res) => {
          if (res.data.bool === true) {
            if (res.data.login_via_otp === true) {
              navigate("/verify_student/" + res.data.student_id);
            } else {
              localStorage.setItem("studentLoginStatus", true);
              localStorage.setItem("student_id", res.data.student_id);
              navigate("/student_portal");
            }
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
    window.location.href = "/student_portal";
  }
  //end of login form fxn

  useEffect(() => {
    document.title = "SS | Student login";
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
            <h2>LOGIN</h2>

            {errorMessage && (
              <p className="text-danger fs-6 fw-light">{errorMessage}</p>
            )}
            <Form method="POST" autocomplete="off">
              <input
                onChange={handleChange}
                type="username"
                name="username"
                value={studentLoginData.username}
                className="input-box"
                placeholder="Username"
                required
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={studentLoginData.password}
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
                <p>
                  Forgot Password?
                  <Link to="/student_forgot_password_email">
                    Reset password
                  </Link>
                </p>
                <p>
                  You don't have an account?
                  <Link to="/student_register">Register</Link>
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
export default StudentLogin;
