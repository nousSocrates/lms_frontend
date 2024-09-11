import { useParams } from "react-router-dom"; //hooking
import { useEffect, useState } from "react"; //for hooking title
import { Link } from "react-router-dom"; // for linking
import { Container } from "../../componentcss/styledcss/Container.styled";
import "../../componentcss/course_detail.css"; //for css
import axios from "axios"; // used in fetching http request to the server
import Swal from "sweetalert2";

import { baseUrl, siteUrl } from "../exports";

function CourseDetails() {
  const [courseData, setCourseData] = useState([]);
  const [strandData, setStrandData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [relatedCoursesData, setRelatedCoursesData] = useState([]);
  const [techListData, setTechListData] = useState([]);
  const [studentLoginStatus, setStudentLoginStatus] = useState();
  const [studentEnrolledStatus, setStudentEnrolledStatus] = useState();
  const [ratingStatus, setRatingStatus] = useState();
  const [favoriteStatus, setFavoriteStatus] = useState();
  const [ratingStars, setRatingStars] = useState(0);
  const [courseViews, setCourseViews] = useState(0);

  let { course_id } = useParams();
  const student_id = localStorage.getItem("student_id");

  useEffect(() => {
    document.title = "SS | Course Details";
    //fetch courses
    try {
      axios.get(baseUrl + "/courses/" + course_id).then((res) => {
        setCourseData(res.data);
        setStrandData(res.data.course_strands);
        setTeacherData(res.data.teacher);
        setRelatedCoursesData(JSON.parse(res.data.related_courses));
        setTechListData(res.data.tech_list);
        if (res.data.course_rating !== "" && res.data.course_rating !== null) {
          setRatingStars(res.data.course_rating);
        }
      });
      //Update view
      axios.get(baseUrl + "/update_views/" + course_id).then((res) =>
        //console.log(res);
        {
          setCourseViews(res.data.views);
        }
      );
    } catch (error) {
      console.log(error);
    }
    //fetch enrolled status
    try {
      axios
        .get(baseUrl + "/fetch_enrolled_status/" + student_id + "/" + course_id)
        .then((res) => {
          //console.log(res);
          if (res.data.bool === true) {
            setStudentEnrolledStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }

    //fetch rating status
    try {
      axios
        .get(baseUrl + "/fetch_rating_status/" + student_id + "/" + course_id)
        .then((res) => {
          //console.log(res);
          if (res.data.bool === true) {
            setRatingStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
    // fetch favorite status
    try {
      axios
        .get(baseUrl + "/fetch_favorite_status/" + student_id + "/" + course_id)
        .then((res) => {
          //console.log(res);
          if (res.data.bool === true) {
            setFavoriteStatus("success");
          } else {
            setFavoriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
      setStudentLoginStatus("success");
    }
  }, []);
  //Student enroll in course
  const EnrollCourse = () => {
    const student_id = localStorage.getItem("student_id");
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", student_id);
    try {
      axios
        .post(baseUrl + "/student_enroll_course/", _formData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "You have successfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setStudentLoginStatus("success");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //mark as favorite fxn
  const markAsFavorite = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", student_id);
    _formData.append("status", true);
    try {
      axios
        .post(baseUrl + "/student_add_favorite_course/", _formData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "This course has been added to your favorite courses",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setFavoriteStatus("success");
          } else {
            setFavoriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // end

  //remove favorite fxn
  const removeFavorite = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", student_id);
    _formData.append("status", false);
    try {
      axios
        .get(
          baseUrl +
            "/student_remove_favorite_course/" +
            course_id +
            "/" +
            student_id,
          _formData,
          {
            headers: {
              "content-type": "multipart/form-data", //allows posting of img and video data to db
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "This course has been removed from your favorite courses",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top",
              timerProgressBar: true,
              showConfirmButton: false,
            });

            setFavoriteStatus("");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  //end
  //Add Rating
  const [ratingData, setRatingData] = useState({
    rating: "",
    review: "",
  });

  //change element value
  const handleChange = (event) => {
    setRatingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };
  //Rating Submit form
  const ratingSubmit = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", student_id);
    _formData.append("rating", ratingData.rating);
    _formData.append("review", ratingData.review);

    try {
      axios
        .post(baseUrl + "/course_rating/" + course_id, _formData)
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Thanks for rating this course",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });

            //window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
    {/* <!--COURSE DETAILS  --> */}
    <section className="contact" id="contact">
      <div className="container mt-3">
  
        <div className="row">
    
          <div className="col-lg-6">
            <img
              src={courseData.featured_image}
              className="h-100 p-3"
              alt={courseData.course_title}
            />
          </div>
          <div className="col-lg-6">
            <h3>{courseData.course_title}</h3>
            <p>{courseData.course_description}</p>
            <div className="">
              <p className="fw-bold text-start">
                Technologies:
                {techListData.map((tech, index) => (
                  <Link
                    to={"/course_categories/" + tech.trim()}
                    className="badge bg-info text-decoration-none ms-1"
                  >
                    {" "}
                    {tech}
                  </Link>
                ))}
              </p>

              <p className="fw-bold text-start">
                Course by:{" "}
                <Link
                  to={"/teacher_details/" + teacherData.id}
                  className="text-success text-decoration-none"
                >
                  {teacherData.surname + " " + teacherData.first_name}
                </Link>
              </p>
              <p className="fw-bold text-start">
                {" "}
                Duration:{" "}
                <span className="text-success">{courseData.duration}</span>
              </p>
              <p className="fw-bold text-start">
                Total Enrolled:
                <span className="text-success">
                  {courseData.total_enrolled_students + 24} students
                </span>
              </p>
              <p className="fw-bold text-start">
                Views:
                <span className="text-success">{courseViews}</span>
              </p>
              <p className="fw-bold text-start mb-3">
                Rating: <span className="text-warning">{ratingStars}/5</span>
                {/* <span className="text-warning">
                  <small className="fa fa-star"></small>
                  <small className="fa fa-star"></small>
                  <small className="fa fa-star"></small>
                  <small className="fa fa-star"></small>
                  <small className="fa fa-star-half"></small>
                </span> */}
                {studentEnrolledStatus === "success" &&
                  studentLoginStatus === "success" && (
                    <>
                      {ratingStatus !== "success" && (
                        <button
                          className="btn btn-success btn-sm ms-5 mt-2"
                          data-bs-toggle="modal"
                          data-bs-target="#ratingModal"
                        >
                          Rate this course
                        </button>
                      )}

                      {ratingStatus === "success" && (
                        <span className="text-success fs-6">
                          {" "}
                          Thanks for your rating
                        </span>
                      )}

                      {/* Modal  */}
                      <div
                        className="modal fade"
                        id="ratingModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            <div className="modal-header bg-success">
                              <h1
                                className="modal-title fs-6"
                                id="exampleModalLabel"
                              >
                                RATING FOR:{" "}
                                <span className="text-warning">
                                  {courseData.course_title}
                                </span>
                              </h1>
                              <button
                                type="button"
                                className="btn btn-close bg-danger"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form className="text-dark">
                                <div className="mb-3">
                                  <label
                                    for="rating"
                                    className="form-label fs-6"
                                  >
                                    Rating stars
                                  </label>
                                  <select
                                    onChange={handleChange}
                                    className="form-control fs-6"
                                    name="rating"
                                  >
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label
                                    for="review"
                                    className="form-label fs-6"
                                  >
                                    Remarks
                                  </label>
                                  <textarea
                                    onChange={handleChange}
                                    className="form-control"
                                    name="review"
                                    rows="4"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer bg-success">
                              <button
                                type="button"
                                onClick={ratingSubmit}
                                className="btn btn-primary"
                              >
                                submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
              </p>
              {studentEnrolledStatus === "success" &&
                studentLoginStatus === "success" && (
                  <p>
                    <span className="text-info fs-6 text-start">
                      We are pleased you are enrolled. Please explore your
                      lessons below.
                    </span>
                  </p>
                )}
              {studentLoginStatus === "success" &&
                studentEnrolledStatus !== "success" && (
                  <p>
                    <button
                      type="button"
                      onClick={EnrollCourse}
                      className="btn btn-success m-auto"
                    >
                      Enroll in this course
                    </button>
                  </p>
                )}

              {studentLoginStatus === "success" &&
                favoriteStatus !== "success" && (
                  <p>
                    <button
                      type="button"
                      onClick={markAsFavorite}
                      className="btn btn-outline-success m-auto"
                      title="Mark as favorite"
                    >
                      <i className="fa fa-heart text-danger"></i>
                    </button>
                  </p>
                )}
              {studentLoginStatus === "success" &&
                favoriteStatus === "success" && (
                  <p>
                    <button
                      type="button"
                      onClick={removeFavorite}
                      className="btn btn-outline-danger "
                      title="Remove from favorite causes"
                    >
                      <i className="fa fa-heart text-info"></i>
                    </button>
                  </p>
                )}

              {studentLoginStatus !== "success" && (
                <p className=" text-success fs-4 m-auto">
                  Interested in this course? Please{" "}
                  <Link to="/student_login" className="text-decoration-none">
                    Login
                  </Link>{" "}
                  to enroll.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Course Videos */}
        {studentEnrolledStatus === "success" &&
          studentLoginStatus === "success" && (
            <div className="card mt-4">
              <div className="card-header">
                <h3 className="text-success"> Course Strands </h3>
              </div>
              <ul className="container-fluid list-group list-group-flash">
                {/* data mapping for course strands */}
                {strandData.map((strand, index) => (
                  <li className="list-group-item">
                    <div className="course_videos">
                      <Link to="/">
                        {index + 1 + ". " + strand.strand_title}
                      </Link>
                      <span className="course_time">
                        <span className="me-5">1hr 40mins</span>
                        <button
                          className="btn btn-sm btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#videoModel1"
                        >
                          <i class="fa-brands fa-youtube"></i>
                        </button>
                      </span>
                    </div>

                    {/* Video Modal  */}
                    <div
                      className="modal fade"
                      id="videoModel1"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Video 1
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div class="ratio ratio-16x9">
                              <iframe
                                src={strand.strand_video}
                                title={strand.strand_title}
                                allowfullscreen
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End video model */}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Related Start --> */}
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container">
            <div className="text-center">
              {/* <h6 className="section-title bg-white text-center text-primary px-3">
                Related Courses
              </h6>
              <h1 className="mb-5 fs-6 text-muted">You may be interested</h1> */}
              {/* Carousel */}
              <div
                id="carouselExampleIndicators"
                className="carousel slide bg- text-white py-5"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {/* {relatedCoursesData &&
                    relatedCoursesData.map((row, index) => (
                      <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current="true"
                        // aria-label={row.student.username}
                      ></button>
                    ))} */}
                </div>
                {/* {relatedCoursesData &&
                  relatedCoursesData.map((row, i) => (
                    <div className="carousel-inner container">
                      <div
                        className={
                          i === 0
                            ? "carousel-item text-center active"
                            : "carousel-item text-center "
                        }
                      >
                        <div
                          className="col-lg-4 col-md-6 wow fadeInUp w-100"
                          data-wow-delay="0.1s"
                        >
                          <div className="course-item">
                            <div className="position-relative overflow-hidden">
                              <Link
                                target="__blank"
                                to={"/course_details/" + row.pk}
                              >
                                <img
                                  src={
                                    siteUrl +
                                    "/media/" +
                                    row.fields.featured_image
                                  }
                                  className="img-fluid"
                                  alt={row.fields.course_title}
                                />
                              </Link>
                              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                <Link
                                  to={"/course_details/" + row.pk}
                                  className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                                >
                                  Read More
                                </Link>
                                <Link
                                  to="#"
                                  className="flex-shrink-0 btn btn-sm btn-primary px-3"
                                >
                                  Join Now
                                </Link>
                              </div>
                            </div>
                            <div className="text-center p-4 pb-0">
                              <h3 className="mb-0">Kshs 3500</h3>
                              <div className="mb-3">
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small className="fa fa-star text-primary"></small>
                                <small>(123)</small>
                              </div>
                              <Link to={"/course_details/" + row.pk}>
                                <h5 className="mb-4">
                                  {row.fields.course_title}
                                </h5>
                              </Link>
                            </div>
                            <div className="d-flex border-top">
                              <small className="flex-fill text-center border-end py-2">
                                <i className="fa fa-user-tie text-primary me-2"></i>
                                John Doe
                              </small>
                              <small className="flex-fill text-center border-end py-2">
                                <i className="fa fa-clock text-primary me-2"></i>
                               {row.fields.duration}
                              </small>
                              <small className="flex-fill text-center py-2">
                                <i className="fa fa-user text-primary me-2"></i>
                                {24 + row.fields.total_enrolled_students}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}
                {/* <button
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
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </Container>
  );
}
export default CourseDetails;
