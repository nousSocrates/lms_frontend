import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "../teacher/TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";

import { baseUrl } from "../exports";

function CourseStrands() {
  const [strandData, setStrandData] = useState([]);
  const [totalStrands, setTotalStrands] = useState([0]);
  const { strand_id } = useParams();
  const { course_id } = useParams();

  useEffect(() => {
    document.title = "SS | Course Strands";
    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/course_strands/" + course_id).then((res) => {
        setStrandData(res.data);
        setTotalStrands(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(courseData);

  //Sweet alert confirm delete
  const Swal = require("sweetalert2"); //from installed sweetalert
  const handleDeleteStrand = (strand_id) => {
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
        try {
          axios.delete(baseUrl + "/strands/" + strand_id).then((res) => {
            Swal.fire("Deleted!", "Your strand has been deleted.", "success");

            try {
              axios
                .get(baseUrl + "/course_strands/" + course_id)
                .then((res) => {
                  setStrandData(res.data);
                  setTotalStrands(res.data.length);
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (error) {
          Swal.fire("Error!", "Your strand has not deleted.", "danger");
        }
      } else {
        Swal.fire("Error!", "Your strand has not deleted.", "danger");
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
            <h5 className="card-header text-dark ">
              Course ***TITLE*** Strands ({totalStrands}){" "}
              <Link
                to={"/add_strand/" + course_id}
                className=" btn btn-success btn-sm float-end"
              >
                Add Strand
              </Link>
            </h5>
            <div className="card-body">
              {" "}
              <table className="table table-triped table-sm">
                <thead className="table-success">
                  <tr>
                    <th className="text-uppercase fw-bold p-3 fs-5">Title</th>
                    <th className="text-uppercase fw-bold p-3 fs-5">Video</th>
                    <th className="text-uppercase fw-bold p-3 fs-5">Remarks</th>
                    <th className="text-uppercase fw-bold p-3 fs-5">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* data mapping */}
                  {strandData.map((strand, index) => (
                    <tr>
                      <td>
                        <Link to={"/edit_strand/" + strand.id}>
                          {strand.strand_title}
                        </Link>
                      </td>
                      <td>
                        <video controls width="250">
                          <source
                            src={strand.strand_video.url}
                            type="video/mp4"
                          />
                          <source
                            src={strand.strand_video.url}
                            type="video/webm"
                          />
                          <p className="text-danger">
                            Sorry, your browser does not support embedded videos
                          </p>
                        </video>
                      </td>
                      <td>{strand.strand_remarks}</td>
                      <td className="d-flex justify-content-center ">
                        {/* edit button */}
                        <Link
                          to={"/edit_strand/" + strand.id}
                          className=" btn btn-info btn-sm "
                        >
                          <i className="bi bi-pencil-square text-white"></i>
                        </Link>
                        {/* delete button */}
                        <button
                          onClick={() => handleDeleteStrand(strand.id)}
                          className="btn btn-danger btn-sm ms-1 fs-6"
                        >
                          <i className="bi bi-trash"></i>
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
export default CourseStrands;
