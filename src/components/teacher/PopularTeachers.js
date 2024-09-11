import { Link } from "react-router-dom";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function PopularTeachers() {
  const [popularTeacherData, setPopularTeacherData] = useState(null);

  useEffect(() => {
    axios.get(baseUrl + "/teacher/").then((response) => {
      setPopularTeacherData(response.data);
    });
  }, []);

  
  return (
    <Container className="mt-6">
    {/* Team Start --> */}

    <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Team
            </h6>
            <h1 className="mb-5 fs-6 text-muted ">Experienced Facilitators</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* team col start */}

            {popularTeacherData &&
              popularTeacherData.map((row, index) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="course-item bg-light">
                    <div className="position-relative overflow-hidden">
                      <Link to={"/teacher_details/" + row.id}>
                        <img
                          className="img-fluid"
                          src={row.profile_picture}
                          alt={row.first_name}
                        />
                      </Link>
                    </div>
                    <div className="text-center p-3 pb-0">
                      <h5 className="mb-0 text-dark">
                        <Link
                          to={"/teacher_details/" + row.id}
                          className="text-decoration-none text-success"
                        >
                          {row.surname + " " + row.first_name}
                        </Link>
                      </h5>
                      <div className="mb-3">
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                      </div>
                    </div>

                    <div className="d-flex border-top text-dark">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-graduation-cap text-primary me-2"></i>
                        {row.qualification}
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-book text-primary me-1"></i>{" "}
                        <small className="me-1">
                          {2 + row.total_teacher_courses}
                        </small>
                        Courses
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-user text-primary me-1"></i>
                        <small className="me-1">
                          {35 + row.total_teacher_students}
                        </small>
                        Students
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            {/* end col */}
          </div>
        </div>
        <Link to="/popular_teachers" className="text-primary float-end">
          See All
        </Link>
        <hr className="text-success mt-4" />
      </div>

      {/* Team End --> */}
    </Container>
  );
}

export default PopularTeachers;
