import { useParams } from "react-router-dom"; //hooking
import { useEffect } from "react"; //for hooking titles
import { Link } from "react-router-dom"; // for linking
import { Container } from "../../componentcss/styledcss/Container.styled";
import "../../componentcss/course_detail.css"; //for css

const baseUrl = "http://127.0.0.1:8000/api/";
const getBtn = document.getElementById("get_btn");
const postBtn = document.getElementById("post_btn");

function StudentDetails() {
  useEffect(() => {
    document.title = "SS | Student details";
  });
  let { student_id } = useParams();
  return (
    <Container>
      <h5>Student Detail Page{student_id} </h5>
      <div className="container d-flex bg-success">
        <button className="btn btn-success">Get Data</button>
        <button className="btn btn-success">Post Data</button>
      </div>
    </Container>
  );
}

export default StudentDetails;
