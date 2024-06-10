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

import { baseUrl } from "../exports";
import { ss_text, ss_forms } from "../exports";

function TeacherRegister() {
  useEffect(() => {
    document.title = "SS | Teacher Register";
  });

  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    surname: "",
    first_name: "",
    phone_number: "",
    email: "",
    password: "",
    status: "",
    otp_code: "",
  });
  //change element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(teacherData);
  //end change value

  //submit form
  const submitForm = () => {
    const otp_code = Math.floor(100000 + Math.random() * 900000);
    const teacherFormData = new FormData();
    teacherFormData.append("surname", teacherData.surname);
    teacherFormData.append("first_name", teacherData.first_name);
    teacherFormData.append("phone_number", teacherData.phone_number);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("otp_code", otp_code);

    try {
      axios
        .post(baseUrl + "/teacher/", teacherFormData)
        .then((response) => {
          navigate("/verify_teacher/" + response.data.id);
          //window.location.href = "/verify_teacher/" + response.data.id;

          // setTeacherData({
          //   surname: "",
          //   first_name: "",
          //   phone_number: "",
          //   email: "",
          //   password: "",
          //   status: "success",
          // });
        });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };
  //end
  //CSS
  const ss_text = {
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
            <h2 className="text-muted">REGISTER</h2>
            <Form method="POST" autocomplete="off" novalidate>
              {teacherData.status === "success" && (
                <p className="text-success fs-2">
                  Your are now registered, Please login
                </p>
              )}
              {teacherData.status === "error" && (
                <p className="text-danger">Sorry, Something went wrong!</p>
              )}
              <input
                onChange={handleChange}
                type="text"
                name="surname"
                value={teacherData.surname}
                className="input-box"
                placeholder="Surname"
                required
              />
              <input
                onChange={handleChange}
                type="text"
                name="first_name"
                value={teacherData.first_name}
                className="input-box"
                placeholder="First name"
                required
              />
              <input
                onChange={handleChange}
                type="number"
                name="phone_number"
                value={teacherData.phone_number}
                className="input-box"
                placeholder="Phone number"
              />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={teacherData.email}
                className="input-box"
                placeholder="Email"
                required
              />
              <input
                onChange={handleChange}
                name="password"
                value={teacherData.password}
                className="input-box"
                placeholder="Password"
                required
              />
              {/* <input
                onChange={handleChange}
                // type="password"
                name="confirm_password"
                value={teacherData.confirm_password}
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
              <div className="auth-wrap card">
                <p className="card text-info bg-dark">
                  You already have an account?{" "}
                  <Link to="/teacher_login" className=""> Login</Link>
                </p>
              </div>
              <span style={ss_text}> &copy;Socrates Schools</span>
            </Form>
          </CardFront>
        </InnerBox>
      </Card>
    </FormContainer>
  );
}
export default TeacherRegister;
