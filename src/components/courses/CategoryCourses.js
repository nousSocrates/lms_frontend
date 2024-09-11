import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; //hooking
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function CategoryCourses() {
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();

  const { category_id, category_slug } = useParams();
  useEffect(() => {
    document.title = "SS |Category Courses";
    fetchData(baseUrl + "/courses/?course_category=" + category_id);
  }, []);
  //Pagination Handler
  const paginationHandler = (url) => {
    fetchData(url);
  };

  function fetchData(url) {
    //axios fetch courses when page loads
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
        {/* Start category */}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Category Courses
            </h6>
            <h3 className="m-2 ">{category_slug}</h3>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}
            {courseData &&
              courseData.map((row, index) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="course-item bg-light">
                    <div className="position-relative overflow-hidden">
                      <Link to={"/course_details/" + row.id}>
                        <img
                          className="img-fluid"
                          src={row.featured_image}
                          alt={row.course_title}
                        />
                      </Link>
                      <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                        <Link
                          to={"/course_details/" + row.id}
                          className="flex-shrink-0 btn btn-sm btn-info fw-light border-end"
                        >
                          Read More
                        </Link>
                        <Link
                          href="#"
                          className="flex-shrink-0 btn btn-sm btn-success px-3"
                        >
                          Join Now
                        </Link>
                      </div>
                    </div>
                    <div className="text-center p-3 pb-0">
                      <h4 className="mb-2">
                        <Link
                          to={"/course_details/" + row.id}
                          className="text-decoration-none fw-bolder "
                        >
                          {row.course_title}
                        </Link>
                      </h4>
                      <h6 className="mb-0  text-warning bg-success py-2">
                        <span className="text-decoration-line-through text-dark me-2">
                          KSHS {row.prev_price}
                        </span>
                        KSHS {row.current_price}
                      </h6>
                    </div>
                    <div className="d-flex border-top text-dark">
                      {teacherData &&
                        teacherData.map((row, index) => (
                          <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-user-tie text-primary me-2"></i>{" "}
                            {row.surname + " " + row.first_name}
                          </small>
                        ))}

                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-clock text-primary me-2"></i>
                        {row.duration}
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-user text-primary me-2"></i>
                        {24 + row.total_enrolled_students + " "}
                        Students
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            {/* course col end */}{" "}
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

export default CategoryCourses;
