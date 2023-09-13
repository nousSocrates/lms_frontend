import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherProfile() {
  const [teacherData, setTeacherData] = useState({
    prev_profile_picture: "",
    profile_picture: "",
    surname: "",
    first_name: "",
    phone_number: "",
    qualification: "",
    about: "",
    email: "",
    skills: "",
    status: "",
    login_via_otp: "",

    //socials
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    github_url: "",
    youtube_url: "",
    twitter_url: "",
    website_url: "",
  });
  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    document.title = "SS | Update Profile";

    //fetch current teacher data

    try {
      axios.get(baseUrl + "/teacher/" + teacher_id).then((res) => {
        setTeacherData({
          prev_profile_picture: res.data.profile_picture,
          profile_picture: "",
          surname: res.data.surname,
          first_name: res.data.first_name,
          phone_number: res.data.phone_number,
          qualification: res.data.qualification,
          about: res.data.about,
          email: res.data.email,
          skills: res.data.skills,
          login_via_otp: res.data.login_via_otp,
          //socials
          facebook_url: res.data.facebook_url,
          instagram_url: res.data.instagram_url,
          linkedin_url: res.data.linkedin_url,
          github_url: res.data.github_url,
          youtube_url: res.data.youtube_url,
          twitter_url: res.data.twitter_url,
          website_url: res.data.website_url,
          whatsapp_url: res.data.whatsapp_url,
          pinterest_url: res.data.pinterest_url,
        });
        console.log(teacherData);
      });
    } catch (error) {
      console.log(error);
    }

    //end
  }, []);

  //change element value
  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(teacherData);
  //end change value

  //change file value for vids and img
  const handleFileChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.files[0],
    });
  };

  //update form
  const teacherUpdateForm = () => {
    const teacherFormData = new FormData();
    teacherFormData.append("surname", teacherData.surname);
    teacherFormData.append("first_name", teacherData.first_name);
    teacherFormData.append("phone_number", teacherData.phone_number);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("about", teacherData.about);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("login_via_otp", teacherData.login_via_otp);
    //socials
    teacherFormData.append("facebook_url", teacherData.facebook_url);
    teacherFormData.append("instagram_url", teacherData.instagram_url);
    teacherFormData.append("linkedin_url", teacherData.linkedin_url);
    teacherFormData.append("github_url", teacherData.github_url);
    teacherFormData.append("youtube_url", teacherData.youtube_url);
    teacherFormData.append("twitter_url", teacherData.twitter_url);
    teacherFormData.append("website_url", teacherData.website_url);
    teacherFormData.append("whatsapp_url", teacherData.whatsapp_url);
    teacherFormData.append("pinterest_url", teacherData.pinterest_url);

    if (teacherData.profile_picture !== "") {
      teacherFormData.append(
        "profile_picture",
        teacherData.profile_picture,
        teacherData.profile_picture.name
      );
    }

    try {
      axios
        .put(baseUrl + "/teacher/" + teacher_id + "/", teacherFormData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((response) => {
          if (response.status === 200) {
            //Sweet alert confirm delete
            Swal.fire({
              title: "Your details are now updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setTeacherData({ status: "error" });
    }
  };
  //end
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  if (teacherLoginStatus !== "true") {
    window.location.href = "/teacher_login";
  }
  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>

        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header text-dark">Teacher Profile</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label
                  for="profile_picture"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Profile Photo
                </label>
                {teacherData.prev_profile_picture && (
                  <img
                    src={teacherData.prev_profile_picture}
                    className="rounded m-2 ms-4 w-25 float-start"
                    alt="previous photo"
                  ></img>
                )}
                <input
                  onChange={handleFileChange}
                  name="profile_picture"
                  type="file"
                  id="profile_picture"
                  className="form-control"
                ></input>
              </div>

              <div className="mb-3 row">
                <label
                  for="surname"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Surname
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="surname"
                    id="surname"
                    value={teacherData.surname}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="first_name"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  First name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="first_name"
                    name="first_name"
                    value={teacherData.first_name}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="qualification"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Qualification
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={teacherData.qualification}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="skills"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Skills
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="skills"
                    name="skills"
                    value={teacherData.skills}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="about"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  About
                </label>
                <div className="col-sm-9">
                  <textarea
                    onChange={handleChange}
                    type="text"
                    id="about"
                    name="about"
                    value={teacherData.about}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="phone_number"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Phone number
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="number"
                    id="phone_number"
                    name="phone_number"
                    value={teacherData.phone_number}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="email"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Email
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="email"
                    value={teacherData.email}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="login_via_otp"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Login via OTP Code
                </label>
                <div className="col-sm-9">
                  <input
                    type="check-box"
                    onChange={handleChange}
                    id="login_via_otp"
                    name="login_via_otp"
                    value={teacherData.login_via_otp}
                    className="form-control"
                  />
                </div>
              </div>
              <hr className="text-dark" />
              <h4 className="mb-3 text-muted text-start">Social Accounts</h4>
              {/* socials */}
              <div className="mb-3 row">
                <label
                  for="github_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Github
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="github_url"
                    name="github_url"
                    value={teacherData.github_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="linkedin_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  LinkedIn
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="linkedin_url"
                    name="linkedin_url"
                    value={teacherData.linkedin_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="youtube_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Youtube
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="youtube_url"
                    name="youtube_url"
                    value={teacherData.youtube_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="facebook_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Facebook
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="facebook_url"
                    name="facebook_url"
                    value={teacherData.facebook_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="website_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Website
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="website_url"
                    name="website_url"
                    value={teacherData.website_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="pinterest_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Pinterst
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="pinterest_url"
                    name="pinterest_url"
                    value={teacherData.pinterest_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="whatsapp_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Whatapp Link
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="whatsapp_url"
                    name="whatsapp_url"
                    value={teacherData.whatsapp_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="twitter_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Twitter
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="twitter_url"
                    name="twitter_url"
                    value={teacherData.twitter_url}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  for="instagram_url"
                  className="col-sm-3 text-start col-form-label text-dark"
                >
                  Instagram
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    onChange={handleChange}
                    id="instagram_url"
                    name="instagram_url"
                    value={teacherData.instagram_url}
                    className="form-control"
                  />
                </div>
              </div>
              {/* end of socials */}
              <hr className="text-dark" />
              <button
                type="button"
                onClick={teacherUpdateForm}
                className="btn btn-primary float-end"
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default TeacherProfile;
