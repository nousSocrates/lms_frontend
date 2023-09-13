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
import "../../componentcss/register.css"; //for css

function StudentRegister() {
  useEffect(() => {
    document.title = "SS | Student Register";
  });

  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    full_name: "",
    username: "",
    phone_number: "",
    interest: "",
    email: "",
    password: "",
    status: "",
    otp_code: "",
  });
  //change element value
  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(studentData);
  //end change value

  //submit form
  const submitForm = () => {
    const otp_code = Math.floor(1000 + Math.random() * 9000);
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("username", studentData.username);
    studentFormData.append("phone_number", studentData.phone_number);
    studentFormData.append("interest", studentData.interest);
    studentFormData.append("email", studentData.email);
    studentFormData.append("password", studentData.password);
    studentFormData.append("otp_code", otp_code);

    try {
      axios
        .post("http://127.0.0.1:8000/api/student/", studentFormData)
        .then((response) => {
          navigate("/verify_student/" + response.data.id);
          //   setStudentData({
          //     full_name: "",
          //     username: "",
          //     phone_number: "",
          //     interest: "",
          //     email: "",
          //     password: "",
          //     status: "success",
          //   });
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: "error" });
    }
  };
  //end
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
            <h2>REGISTER</h2>
            <Form method="POST" autocomplete="off" novalidate>
              {studentData.status === "success" && (
                <p className="text-success">
                  Your are now registered, Please login
                </p>
              )}
              {studentData.status === "error" && (
                <p className="text-danger">Sorry, Invalid credentials</p>
              )}

              <input
                onChange={handleChange}
                type="text"
                name="full_name"
                value={studentData.full_name}
                className="input-box"
                placeholder="Full name"
                required
              />
              <input
                onChange={handleChange}
                type="text"
                name="username"
                value={studentData.username}
                className="input-box"
                placeholder="Username"
                required
              />
              <input
                onChange={handleChange}
                type="text"
                name="phone_number"
                value={studentData.phone_number}
                className="input-box"
                placeholder="Phone number"
              />
              <input
                onChange={handleChange}
                type="text"
                name="interest"
                value={studentData.interest}
                className="input-box"
                placeholder="Interest"
                required
              />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={studentData.email}
                className="input-box"
                placeholder="Email"
                required
              />
              <input
                onChange={handleChange}
                name="password"
                value={studentData.password}
                className="input-box"
                placeholder="Password"
                required
              />
              {/* <input
                onChange={handleChange}
                // type="password"
                name="confirm_password"
                value={studentData.confirm_password}
                className="input-box"
                placeholder="Confirm password"
                required
              /> */}
              <div className="btn">
                <button
                  onClick={submitForm}
                  type="submit"
                  className="submit-btn"
                >
                  Submit
                </button>
              </div>
              <div className="auth-wrap">
                <p>
                  You already have an account?{" "}
                  <Link to="/student_login"> Login</Link>
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
export default StudentRegister;
