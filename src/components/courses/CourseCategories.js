import { Link } from "react-router-dom";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "../exports";

function CourseCategory() {
  const [categoryData, setCategoryeData] = useState([]);

  useEffect(() => {
    document.title = "SS | Course Categories";

    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/course_categories/").then((res) => {
        setCategoryeData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container className="mt-6">
      <div className="container-xxl py-5">
        {/* Start category */}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Course Categories
            </h6>
            <h1 className="mb-5 fs-6 text-muted ">Our Schools</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}
            {categoryData &&
              categoryData.map((row, index) => (
                <div className="col-md-3 mb-4">
                  {" "}
                  <div className="card">
                    {" "}
                    <div className="card-body">
                      <h6 className="card-title">
                        <Link to={"/courses/" + row.id + '/'+ row.title}>
                          {row.title}
                        </Link>
                      </h6>
                      <p className="card-text text-dark"> {row.description}</p>
                      <small className="text-dark">
                        Total Courses:
                        <span className="badge bg-info">
                          {row.total_category_courses}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            {/* course col end */}
          </div>
        </div>
        {/* end Latest Courses */}
      </div>
    </Container>
  );
}

export default CourseCategory;
