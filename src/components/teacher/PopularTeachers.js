import { Link } from "react-router-dom";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function PopularTeachers() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    axios.get(baseUrl + "/teacher/").then((response) => {
      setTeacher(response.data);
    });
  }, []);
  console.log(teacher);
  return (
    <Container className="mt-6">
      {/* Team Start --> */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Team
            </h6>
            <h1 className="m-2 ">Experienced Teachers</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* team col start */}
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <Link to="/teacher_details/2">
                    <img
                      className="img-fluid"
                      src="static/pixels/felo.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="text-center p-3 pb-0">
                  <h3 className="mb-0 text-dark">nousSocrates, SSO</h3>
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
                    Degree
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-book text-primary me-2"></i> 7 Courses
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>30 Students
                  </small>
                </div>
              </div>
            </div>

            {/* end col */}

            {/* team col start */}
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <Link to="/teacher_details/2">
                    <img
                      className="img-fluid"
                      src="static/pixels/betMoi.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="text-center p-3 pb-0">
                  <h3 className="mb-0 text-dark">Mr Bett, Moi Girls</h3>
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
                    Degree
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-book text-primary me-2"></i> 7 Courses
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>30 Students
                  </small>
                </div>
              </div>
            </div>

            {/* end col */}
            {/* team col start */}
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <Link to="/teacher_details/2">
                    <img
                      className="img-fluid"
                      src="static/pixels/mozart.jpg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="text-center p-3 pb-0">
                  <h3 className="mb-0 text-dark">Mozart, ABRSM</h3>
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
                    Degree
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-book text-primary me-2"></i> 7 Courses
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>30 Students
                  </small>
                </div>
              </div>
            </div>

            {/* end col */}
          </div>
          {/* pagination start */}
          <nav aria-label="Page navigation " className="mt-5">
            <ul className="pagination justify-content-center ">
              <li className="page-item">
                <Link className="page-link" to="">
                  Previous
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
          {/* pagination end*/}
        </div>
      </div>
      {/* Team End --> */}
    </Container>
  );
}

export default PopularTeachers;
