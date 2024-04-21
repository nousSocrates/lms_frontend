import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api";

function Footer() {
  const [pagesData, setPagesData] = useState([]);

  useEffect(() => {
    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/pages/").then((res) => {
        setPagesData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="footer">
      <Link to="#" className="up float-end me-5 mb-5" id="up">
        <i className="fas fa-chevron-up"></i>
      </Link>

      <div className="container">
        <footer className="py-1 my-1">
          <ul className="nav justify-content-center border-bottom pb-1">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 fs-6 fw-light text-muted">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link px-2 fs-6 fw-light text-muted"
              >
                About us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link px-2 fs-6 fw-light text-muted"
              >
                Contact us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/faqs"
                className="nav-link px-2 fs-6 fw-light text-muted"
              >
                FAQs
              </Link>
            </li>

            {pagesData &&
              pagesData.map((row, index) => (
                <li className="nav-item">
                  <Link
                    to={"/page/" + row.id + row.url}
                    className="nav-link px-2 fs-6 fw-light text-muted"
                  >
                    {row.title}
                  </Link>
                </li>
              ))}
          </ul>
          <div>
            <ul className="list-inline socials ">
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
                <i className="fas fa-times twitter-x-icon"></i>
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
              <li className="list-inline-item">
                <a href="https://www.instagram.com/noussocrates/">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.pinterest.com/phelouma/">
                  <i className="bi bi-pinterest"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://github.com/nousSocrates">
                  <i className="bi bi-github"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="fw-light fs-6">
            &copy;April 2023, Inc<br></br>SOCRATES SCHOOLS<br></br>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
