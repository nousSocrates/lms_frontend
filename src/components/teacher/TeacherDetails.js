import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking titles
import { Link } from "react-router-dom"; // for linking
import { Container } from "../../componentcss/styledcss/Container.styled";
import "../../componentcss/course_detail.css"; //for css
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function TeacherDetail() {
  const [teacherData, setTeacherData] = useState([]);
  const [teacherCourseData, setTeacherCourseData] = useState([]);
  const [skillListData, setSkillListData] = useState([]);

  let { teacher_id } = useParams();

  useEffect(() => {
    document.title = "SS | Teacher details";

    try {
      axios.get(baseUrl + "/teacher/" + teacher_id).then((res) => {
        setTeacherData(res.data);
        setTeacherCourseData(res.data.teacher_courses);
        setSkillListData(res.data.skill_list);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <h5 className="mt-10">Teacher Details Page{teacher_id} </h5>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-4">
            <img
              src={teacherData.profile_picture}
              className="h-100 p-3"
              alt="Profile"
            />
          </div>
          <div className="col-lg-8">
            <h3>{teacherData.surname + " " + teacherData.first_name}</h3>
            <p>
              {teacherData.about}

              <br />
            </p>
            <p className="fw-bold">
              Skills:
              {skillListData.map((skill, index) => (
                <Link
                  to={
                    "/teacher_skill_courses/" +
                    skill.trim() +
                    "/" +
                    teacherData.id
                  }
                  className="badge bg-warning text-decoration-none ms-1"
                >
                  {skill}
                </Link>
              ))}
            </p>
            <p className="fw-bold">
              Recent Course: <Link to="/course_detail/1"> REACTJS </Link>
            </p>

            <span className=" p-1">
              {teacherData.facebook_url && (
                <Link to={teacherData.facebook_url} className="me-2">
                  <i className="bi bi-facebook"></i>
                </Link>
              )}
              {teacherData.twitter_url && (
                <Link to={teacherData.twitter_url} className="me-2">
                  <i className="bi bi-twitter"></i>
                </Link>
              )}
              {teacherData.youtube_url && (
                <Link to={teacherData.youtube_url} className="me-2">
                  <i className="bi bi-youtube"></i>
                </Link>
              )}
              {teacherData.linkedin_url && (
                <Link to={teacherData.linkedin_url} className="me-2">
                  <i className="bi bi-linkedin"></i>
                </Link>
              )}
              {teacherData.pinterest_url && (
                <Link to={teacherData.pinerest_url} className="me-2">
                  <i className="bi bi-pinterest"></i>
                </Link>
              )}
              {teacherData.instagram_url && (
                <Link to={teacherData.instagram_url} className="me-2">
                  <i className="bi bi-instagram"></i>
                </Link>
              )}
              {teacherData.github_url && (
                <Link to={teacherData.github_url} className="me-2">
                  <i className="bi bi-github"></i>
                </Link>
              )}

              {teacherData.whatsapp_url && (
                <Link to={teacherData.whatsapp_url} className="me-2">
                  <i className="bi bi-whatsapp"></i>
                </Link>
              )}
              {teacherData.website_url && (
                <Link to={teacherData.website_url} className="me-2">
                  <i className="bi bi-globe"></i>
                </Link>
              )}
            </span>
          </div>
        </div>

        {/* Course List*/}
        <div className="card bg-secondary mt-4">
          <div className="card-header bg-success ">
            <h3 className="text-light ">My Course List</h3>
          </div>
          <ul className="container list-group list-group-flash">
            {teacherCourseData.map((course, index) => (
              <li className="list-group-item list-group-item-action">
                <div className="course_videos">
                  <Link to={"/course_details/" + course.id}>
                    {course.course_title}
                  </Link>
                  <span className="course_time">
                    <span className="me-5 mt-3">10hrs 40mins</span>
                    <Link to={"/course_details/" + course.id}>
                      <button className="btn btn-sm btn-success ">
                        Explore
                      </button>
                    </Link>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default TeacherDetail;
