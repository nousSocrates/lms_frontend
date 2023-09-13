import { Link } from "react-router-dom";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api/courses/";
function LatestCourses() {
  const [courseData, setCourseData] = useState([]);

  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();

  //axios fetch courses when page loads
  useEffect(() => {
    fetchData(baseUrl);
  }, []);

  //Pagination Handler
  const paginationHandler = (url) => {
    fetchData(url);
  };
  function fetchData(url) {
    try {
      axios.get(url).then((res) => {
        setNextUrl(res.data.next);
        setPreviousUrl(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }

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
            <h1 className="m-2 ">Latest Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}
            {courseData &&
              courseData.map((course, index) => (
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="course-item bg-light">
                    <div className="position-relative overflow-hidden">
                      <Link to={"/course_details/" + course.id}>
                        <img
                          className="img-fluid"
                          src={course.featured_image}
                          alt={course.course_title}
                        />
                      </Link>
                      <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                        <a
                          href="#"
                          className="flex-shrink-0 btn btn-sm btn-info px-3 border-end"
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
                      <h3 className="mb-0 text-success">KSHS 4500</h3>
                      <div className="mb-3">
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small className="fa fa-star text-primary"></small>
                        <small>(123)</small>
                      </div>
                      <h5 className="mb-4">
                        <Link to={"/course_details/" + course.id}>
                          {course.course_title}
                        </Link>
                      </h5>
                    </div>
                    <div className="d-flex border-top text-dark">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-user-tie text-primary me-2"></i>John
                        Doe
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
            {/* course col end */}
          </div>
          {/* pagination start */}
          <nav aria-label="Page navigation " className="mt-5">
            <ul className="pagination justify-content-center ">
              {previousUrl && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginationHandler(previousUrl)}
                  >
                    <i className=" bi bi-arrow-left"></i> Previous
                  </button>
                </li>
              )}
              {/* <li className="page-item">
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
              </li> */}
              {nextUrl && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => paginationHandler(nextUrl)}
                  >
                    Next<i className=" bi bi-arrow-right"></i>
                  </button>
                </li>
              )}
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

export default LatestCourses;
