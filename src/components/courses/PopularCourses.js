import { Link } from "react-router-dom";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function PopularCourses() {
  const [popularCourseData, setPopularCourseData] = useState([]);
  useEffect(() => {
    document.title = "SS | Popular Courses";
    //fetch popular courses
    try {
      axios.get(baseUrl + "/popular_courses/?all").then((res) => {
        setPopularCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Container className="mt-6">
      {/* Courses Start */}

      <div className="container-xxl py-5">
        {/* Start Latest Courses */}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="m-2 ">Popular Course</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* col 1 popular course */}
            {popularCourseData &&
              popularCourseData.map((row, index) => (
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="course-item bg-light">
                    <div className="position-relative overflow-hidden">
                      <Link to={"/course_details/" + row.course.id}>
                        <img
                          className="img-fluid"
                          src={row.course.featured_image}
                          alt={row.course.course_title}
                        />
                      </Link>
                      <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                        <a
                          href="#"
                          className="flex-shrink-0 btn btn-sm btn-info fw-light border-end"
                        >
                          Read More
                        </a>
                        <a
                          href="#"
                          className="flex-shrink-0 btn btn-sm btn-success px-3"
                        >
                          Join Now
                        </a>
                      </div>
                    </div>
                    <div className="text-center p-3 pb-0">
                      <h4 className="mb-2">
                        <Link
                          to={"/course_details/" + row.course.id}
                          className="text-decoration-none fw-bolder "
                        >
                          {row.course.course_title}
                        </Link>
                      </h4>

                      <div className="mb-3 bg-dark p-1">
                        <small className="fa fa-star text-danger"></small>
                        <small className="fa fa-star text-danger"></small>
                        <small className="fa fa-star text-danger"></small>
                        <small className="fa fa-star text-danger"></small>
                        <small className="fa fa-star text-danger"></small>
                        <span className="text-warning">{row.rating}/5</span>
                      </div>
                      <h6 className="mb-0  text-warning bg-success">
                        <span className="text-decoration-line-through text-dark me-2">
                          KSHS 4500
                        </span>
                        KSHS 2000
                      </h6>
                    </div>
                    <div className="d-flex border-top text-dark">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-user-tie text-primary me-2"></i>
                        John Doe
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-clock text-primary me-2"></i>1.49
                        Hrs
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-user text-primary me-2"></i>30
                        Students
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            {/* end col popular courses */}
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
        {/* end Latest Courses */}
      </div>

      {/* Courses End  */}
    </Container>
  );
}

export default PopularCourses;
