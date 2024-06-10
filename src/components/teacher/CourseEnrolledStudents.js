import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function CourseEnrolledStudents() {
  const [studentData, setStudentData] = useState([]);

  let { course_id } = useParams();
  //console.log("Teacher ID =" + teacher_id);

  useEffect(() => {
    document.title = "SS | Course Enrolled Students";
    //axios fetch courses when page loads
    try {
      axios
        .get(baseUrl + "/fetch_course_enrolled_students/" + course_id)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData);

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark ">Enrolled Students</h5>
            <div className="card-body">
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="  text-uppercase fw-bold text-start px-2 fs-6 ">
                      Name
                    </th>
                    <th className=" text-uppercase text-start fw-bold px-2 fs-6">
                      Phone
                    </th>
                    <th className=" text-uppercase text-start px-2 fw-bold fs-6">
                      Email
                    </th>
                    <th className=" text-uppercase text-start fw-bold px-2 fs-6">
                      School
                    </th>
                    <th className=" text-uppercase text-start fw-bold px-2 fs-6">
                      County
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {studentData.map(
                    (
                      row,
                      index // notice the row, data fetched one level down
                    ) => (
                      <tr>
                        <td className="text-uppercase py-1 fs-6 text-start">
                          {index + 1 + ". " + row.student.full_name}
                        </td>
                        <td className="py-1 fs-6 text-start">
                          {row.student.phone_number}
                        </td>

                        <td className="py-1 w-25 fs-6 text-start">
                          {row.student.email}
                        </td>
                        <td className="py-1 fs-6 text-start">
                          {row.student.school}
                        </td>

                        <td className="py-1 fs-6 text-start">
                          {row.student.county}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default CourseEnrolledStudents;
