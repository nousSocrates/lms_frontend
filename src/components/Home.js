// HOME COMPONENT

import { Link } from "react-router-dom";
import "../componentcss/home.css";
import { Container } from "../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api";

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [popularCourseData, setPopularCourseData] = useState([]);
  const [popularTeacherData, setPopularTeacherData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);

  //axios fetch courses when page loads
  useEffect(() => {
    document.title = "SS | Home page";
    //fetch couses
    try {
      axios.get(baseUrl + "/courses/").then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
    //fetch popular courses
    try {
      axios.get(baseUrl + "/popular_courses/?popular=1").then((res) => {
        setPopularCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    // fetch popular teachers
    try {
      axios.get(baseUrl + "/popular_teachers/?popular").then((res) => {
        setPopularTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    // fetch popular teachers
    try {
      axios.get(baseUrl + "/popular_teachers/?pop_tchr_courses").then((res) => {
        setPopularTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    // fetch student testimonials
    try {
      axios.get(baseUrl + "/student_testimonial/").then((res) => {
        setTestimonialData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Container>
      {/* Landing Start */}
      <section className="h-50">
        <div className="landing">
          <div className="landing-text">
            <h1 className="fw-light ">Teacher Phelix</h1>
            <p className="fw-light text-secondary fs-5 ">
              Welcome to my website
            </p>
            <hr />
            <div className="social-media">
              <ul className="list-inline badge">
                <li className="list-inline-item">
                  <a href="https://web.facebook.com/phelix.ouma.54">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://wa.link/1uazpw">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://twitter.com/nousphellou">
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/noussocrates/">
                    <i className="bi bi-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.linkedin.com/in/noussocrates-phelix-b5510797/">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.youtube.com/channel/UCXwKDhaGDjWV_horNiDl6kw">
                    <i className="bi bi-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* //  end landing */}

      {/* Courses Start */}

      <div className="container-xxl py-5">
        {/* Start Latest Courses */}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className=" mb-5 fs-6 text-muted ">Latest Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}
            {courseData &&
              courseData.map((row, index) => (
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
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
                      <h6 className="mb-0  text-warning bg-success">
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
          </div>
        </div>

        <Link to="/latest_courses" className="text-primary float-end">
          See All
        </Link>

        {/* end Latest Courses */}
        <hr className="text-success mt-5" />
        {/* Start Popular Courses */}
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center  wow fadeInUp" data-wow-delay="0.1s">
          
            <h1 className=" mb-5 fs-6 text-muted ">Latest Courses</h1>
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

                        <div className="mb-3  p-1">
                          <small className="fa fa-star text-info"></small>
                          <small className="fa fa-star text-info"></small>
                          <small className="fa fa-star text-info"></small>
                          <small className="fa fa-star text-info"></small>
                          <small className="fa fa-star text-info"></small>
                          <span className=" badge bg-success text-warning">
                            {row.rating}/5
                          </span>
                        </div>
                        <h6 className="mb-0  text-warning bg-success">
                          <span className="text-decoration-line-through text-dark me-2">
                            KSHS {row.course.prev_price}
                          </span>
                          KSHS {row.course.current_price}
                        </h6>
                      </div>
                      <div className="d-flex border-top text-dark">
                        {/* {teacherData &&
                        teacherData.map((course, index) => (
                          <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-user-tie text-primary me-2"></i>{" "}
                            {teacherData.surname + " " + teacherData.first_name}
                          </small>
                        ))} */}
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-clock text-primary me-2"></i>
                          {row.course.duration}
                        </small>
                        <small className="flex-fill text-center py-2">
                          <i className="fa fa-user text-primary me-2"></i>
                          {24 + row.course.total_enrolled_students}
                          Students
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              {/* end col popular courses */}
            </div>
          </div>
        </div>
        <Link to="/popular_courses" className="text-primary float-end">
          See All
        </Link>
        <hr className="text-success mt-4" />
      </div>
      {/* Courses End  */}
      {/* Team Start --> */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Team
            </h6>
            <h1 className="mb-5 fs-6 text-muted ">Experienced Teachers</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* team col start */}

            {popularTeacherData &&
              popularTeacherData.map((row, index) => (
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
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
      {/* Start Skills */}
      <section className="skills">
        <div className="container">
          <div className="section-heading">
            <h1>Services</h1>
            <h6 className="fs-6 text-muted">What we are known for</h6>
          </div>
          <div className="my-skills">
            <div className="skill" data-aos="fade-in" data-aos-delay="300">
              <h1>Teaching</h1>
              <div className="icon-container">
                <img id="teacher" src="static/pixels/socratespurple.png" />
              </div>
              <p>
                I am a highly qualified teacher of History, Religious Education
                and Music, with an outstanding track record and teaching
                experience of over five years.
              </p>
            </div>
            <div className="skill" data-aos="fade-in" data-aos-delay="400">
              <h1>Music</h1>
              <div className="icon-container">
                <i className="fas fa-music"></i>
              </div>
              <p>
                This is my passion. I am a qualified and renown choral music
                trainer, music composer and Music Theory teacher. I have taken
                church and student choral teams to the national music festivals
                several times.
              </p>
            </div>
            <div className="skill" data-aos="fade-in" data-aos-delay="100">
              <h1>Web Development</h1>
              <div className="icon-container">
                <i className="fas fa-code"></i>
              </div>
              <p>
                I develop professional websites and applications using different
                technologies and programming languages. For front-end, I use
                html, css, Bootstrap, JS and Jquery, and a blend of sql, php,
                Python and NodeJs for back-end.
              </p>
            </div>
            <div className="skill" data-aos="fade-in" data-aos-delay="200">
              <h1>Web Design</h1>
              <div className="icon-container">
                <i className="fas fa-layer-group"></i>
              </div>
              <p>
                I have a high aesthetic motive to develop RESPONSIVE websites
                and applications that have attractive and navigables interfaces,
                without limiting the content displayed to the users.
              </p>
            </div>
          </div>

          {/* <div className="container skill-wrapper">
            <div className="code-heading">
              <h1>Coding Skills</h1>
            </div>
            <div className="coding-skills">
              <h5>
                <i class="fa-brands fa-html"> </i> HTML
              </h5>
              <div className="progress-bar">
                <div className="html">
                  <span> 90%</span>
                </div>
              </div>
              <h5>
                <i className="fa-brands fa-css"> </i> CSS
              </h5>
              <div className="progress-bar">
                <div className="css">
                  <span> 85%</span>
                </div>
              </div>
              <h5>
                <i className="fa-brands fa-js"> </i> JavaScript
              </h5>
              <div className="progress-bar">
                <div className="js">
                  <span> 68%</span>
                </div>
              </div>
              <h5>
                <i className="fa-brands fa-python"></i> Python
              </h5>
              <div className="progress-bar">
                <div className="python">
                  <span> 80%</span>
                </div>
              </div>
              <h5>
                <i className="fa-brands fa-django"></i> Django
              </h5>
              <div className="progress-bar">
                <div className="django">
                  <span> 78%</span>
                </div>
              </div>
              <h5>
                <i className="fa-brands fa-react"></i> React
              </h5>
              <div className="progress-bar">
                <div className="rxt">
                  <span> 60%</span>
                </div>
              </div>
              <div className="hire">
                <Link to="/contact ">
                  <button className="btn">Hire me</button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* end Skills */}

      {/* // Service Start */}
      <div className="container-xxl py-5 mt-55">
        <div className="container ">
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4  bg-dark text-light">
                  <i className="fa fa-3x fa-home text-success mb-4"></i>
                  <h5 className="mb-3">Home Projects</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3   col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4  bg-dark text-light">
                  <i className="fa fa-3x fa-graduation-cap text-danger mb-4"></i>
                  <h5 className="mb-3">Skilled Instructors</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4  bg-dark text-light">
                  <i className="fa fa-3x fa-globe text-info mb-4"></i>
                  <h5 className="mb-3">Online Classes</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item text-center pt-3">
                <div className="p-4  bg-dark text-light">
                  <i className="fa fa-3x fa-book-open text-warning mb-4"></i>
                  <h5 className="mb-3">Book Library</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //Service End  */}

      {/* Categories Start */}

      <div className="container-xxl py-5 category">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Categories
            </h6>
            <h1 className="mb-5 fs-6 text-muted">Course Categories</h1>
          </div>
          <div className="row g-3">
            <div className="col-lg-7 col-md-6">
              <div className="row g-3">
                <div
                  className="col-lg-12 col-md-12 wow zoomIn"
                  data-wow-delay="0.1s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="static/pixels/coolhome.jpg"
                      alt=""
                    />
                    <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3">
                      <h5 className="m-0">JSS</h5>
                      <small className="text-primary">26 Learning Areas</small>
                    </div>
                  </a>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.3s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="static/pixels/code.png"
                      alt=""
                    />
                    <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3">
                      <h5 className="m-0">Computer Programmining</h5>
                      <small className="text-primary">49 Courses</small>
                    </div>
                  </a>
                </div>
                <div
                  className="col-lg-6 col-md-12 wow zoomIn"
                  data-wow-delay="0.5s"
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src="static/pixels/orchetra.jpg"
                      alt=""
                    />
                    <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3">
                      <h5 className="m-0">ABRSM Music Theory</h5>
                      <small className="text-primary">27 Courses</small>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s">
              <a
                className="position-relative d-block h-100 overflow-hidden"
                href=""
              >
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="static/pixels/madamjulie.png"
                  alt=""
                />
                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3">
                  <h5 className="m-0">KCSE CRE</h5>
                  <small className="text-primary">49 Courses</small>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* end of categories */}

      {/* Testimonial Start --> */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Testimonial
            </h6>
            <h1 className="mb-5 fs-6 text-muted">Student Comments</h1>
            {/* testing Carousel */}
            <div
              id="carouselExampleIndicators"
              className="carousel slide bg-dark text-white py-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {testimonialData &&
                  testimonialData.map((row, index) => (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current="true"
                      // aria-label={row.student.username}
                    ></button>
                  ))}
              </div>
              <div className="carousel-inner">
                {testimonialData &&
                  testimonialData.map((row, i) => (
                    <div
                      className={
                        i === 0
                          ? "carousel-item text-center active"
                          : "carousel-item text-center "
                      }
                    >
                      <figure className="text-center ">
                        <blockquote className="blockquote">
                          <figcaption className=" mt-2 me-5 fw-light text-success fs-6">
                            {row.course.course_title}
                          </figcaption>
                          <i className="fw-light fs-6 text-secondary ms-5 w-75 float-center">
                            "{row.review}..."
                          </i>
                        </blockquote>

                        <cite
                          className=" blockquote-footer text-info ms-5 "
                          title="Source"
                        >
                          {row.student.username}
                        </cite>
                      </figure>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End --> */}
    </Container>
  );
}
export default Home;
