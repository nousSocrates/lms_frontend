import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";

function EditCourse() {
  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState({
    course_category: "",
    course_title: "",
    course_description: "",
    prev_featured_image: "",
    featured_image: "",
    course_techs: "",
  });
  const { course_id } = useParams();
  useEffect(() => {
    document.title = "SS | Edit Course";
    //axios fetch categories when page loads
    try {
      axios.get(baseUrl + "/course_categories").then((res) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    //fetch current course data

    try {
      axios
        .get(baseUrl + "/teacher_course_details/" + course_id)
        .then((res) => {
          setCourseData({
            course_category: res.data.course_category,
            course_title: res.data.course_title,
            course_description: res.data.course_description,
            prev_featured_image: res.data.featured_image,
            featured_image: "",
            course_techs: res.data.course_techs,
          });
          console.log(courseData);
        });
    } catch (error) {
      console.log(error);
    }

    //end
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
  //courseUpdate fxn
  const teacher_id = localStorage.getItem("teacher_id");
  const courseFormUpdate = () => {
    const _formData = new FormData();
    _formData.append("course_category", courseData.course_category);
    _formData.append("teacher", teacher_id);
    _formData.append("course_title", courseData.course_title);
    _formData.append("course_description", courseData.course_description);
    if (courseData.featured_image !== "") {
      _formData.append(
        "featured_image",
        courseData.featured_image,
        courseData.featured_image.name
      );
    }

    _formData.append("course_techs", courseData.course_techs);

    try {
      axios
        .put(baseUrl + "/teacher_course_details/" + course_id, _formData, {
          headers: {
            "content-type": "multipart/form-data", //allows posting of img and video data to db
          },
        })
        .then((res) => {
          if (res.status === 200) {
            //Sweet alert confirm delete
            Swal.fire({
              title: "Your course is now updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
          // window.location.href = "/add_course"; //clears data and refresh page
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
            <h5 className="card-header text-dark">Edit Course</h5>
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
                    value={courseData.course_category}
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
                    value={courseData.course_title}
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
                    value={courseData.course_description}
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
                  {courseData.prev_featured_image && (
                    <img
                      src={courseData.prev_featured_image}
                      className="rounded m-2 ms-4 w-25 float-start"
                      alt="previous_image"
                    ></img>
                  )}
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
                    value={courseData.course_techs}
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
                  onClick={courseFormUpdate}
                  className="btn btn-primary float-end "
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default EditCourse;
