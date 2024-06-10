import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";

import { baseUrl } from "../exports";

function AddCourse() {
  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState({
    course_category: "",
    course_title: "",
    course_description: "",
    featured_image: "",
    course_techs: "",
  });

  useEffect(() => {
    document.title = "SS | Add Course";
    //axios fetch categories when page loads
    try {
      axios.get(baseUrl + "/course_categories").then((res) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(categories);
  //change element value
  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };
  //change file value
  const handleFileChange = (event) => {
    // fpr image and video files
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };
  //courseUpload fxn
  //const { teacher_id } = useParams();
  const teacher_id = localStorage.getItem("teacher_id");
  const courseFormUpload = () => {
    //const teacher_id = localStorage.getItem["teacher_id"];
    const _formData = new FormData();
    _formData.append("course_category", courseData.course_category);
    _formData.append("teacher", teacher_id);
    _formData.append("course_title", courseData.course_title);
    _formData.append("course_description", courseData.course_description);
    _formData.append(
      "featured_image",
      courseData.featured_image,
      courseData.featured_image.name
    );
    _formData.append("course_techs", courseData.course_techs);

    try {
      axios
        .post(baseUrl + "/courses/", _formData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = "/add_course"; //clears data and refresh page
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Add Course</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
                <div className="mb-3">
                  <label
                    for="course_category"
                    className="form-label float-start"
                  >
                    Select Category
                  </label>
                  <select
                    type="text"
                    onChange={handleChange}
                    name="course_category"
                    id="course_category"
                    className="form-select"
                  >
                    {/* loop categories */}
                    {categories.map((course_category, index) => {
                      return (
                        <option key={index} value={course_category.id}>
                          {course_category.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label for="course_title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    name="course_title"
                    type="text"
                    id="course_title"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    for="course_description"
                    className="form-label float-start"
                  >
                    Description
                  </label>
                  <input
                    onChange={handleChange}
                    name="course_description"
                    type="text"
                    id="course_description"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    for="featured_image"
                    className="form-label float-start"
                  >
                    Featured Image
                  </label>
                  <input
                    onChange={handleFileChange}
                    name="featured_image"
                    type="file"
                    id="featured_image"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="course_techs" className="form-label float-start">
                    Course Technologies
                  </label>
                  <input
                    onChange={handleChange}
                    name="course_techs"
                    type="text"
                    id="course_techs"
                    className="form-control"
                    placeholder="notesworthy, php, django etc"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={courseFormUpload}
                  className="btn btn-primary float-end "
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default AddCourse;
