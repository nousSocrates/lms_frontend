import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    document.title = "SS | My Courses";
    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/teacher_courses/" + teacher_id).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData);

  //Sweet alert confirm delete
  const Swal = require("sweetalert2"); //from installed sweetalert
  const handleDeleteCourse = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Course has been deleted.", "success");
      }
    });
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark ">My Courses</h5>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="w-25 bg-success text-uppercase fw-bold text-start px-3 fs-6 ">
                      Image
                    </th>
                    <th className=" text-uppercase fw-bold  fs-6">Title</th>
                    <th className=" bg-info text-uppercase fw-bold fs-6">
                      Enrolled
                    </th>
                    <th className=" bg-warning text-uppercase fw-bold fs-6">
                      Rating
                    </th>
                    <th className="bg-danger text-uppercase fw-bold  fs-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {courseData.map((course, index) => (
                    <tr>
                      <td>
                        <Link
                          to={"/course_strands/" + course.id}
                          className="text-start p-1"
                        >
                          <img
                            src={course.featured_image}
                            className="rounded"
                            alt="course.course_title"
                          />
                        </Link>
                      </td>
                      <td className=" py-2 fs-6 ">
                        <Link
                          to={"/course_strands/" + course.id}
                          className="text-start text-success ms-2"
                        >
                          {course.course_title}
                        </Link>
                      </td>

                      <td className="py-2 fs-6">
                        <Link to={"/course_enrolled_students/" + course.id}>
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        {course.course_rating && (
                          <Link to="#" className="text-success">
                            {course.course_rating}/5
                          </Link>
                        )}
                        {!course.course_rating && (
                          <Link to="#" className="text-success">
                            {0}/5
                          </Link>
                        )}
                      </td>
                      <td className="d-flex justify-content-center ">
                        <button
                          className=" btn btn-info btn-sm "
                          title="Edit Course"
                        >
                          <Link to={"/edit_course/" + course.id}>
                            <i className="bi bi-pencil-square text-white"></i>
                          </Link>
                        </button>
                        <button
                          className=" btn btn-success btn-sm ms-1 "
                          title="Lesson Notes"
                        >
                          <Link
                            to={"/course_study_materials/" + course.id}
                            className="text-warning fw-lighter"
                          >
                            Notes
                          </Link>
                        </button>
                        <button
                          className=" btn btn-warning btn-sm ms-1 "
                          title="Course Exams"
                        >
                          <Link
                            to={"/assign_quiz/" + course.id}
                            className="text-successcd  fw-lighter"
                          >
                            Exam
                          </Link>
                        </button>
                        <button
                          onClick={handleDeleteCourse}
                          className="btn btn-danger btn-sm ms-1"
                          title="Delete Course"
                        >
                          <i className="bi bi-trash text-white"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default TeacherCourses;
