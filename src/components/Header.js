import { Link } from "react-router-dom"; // for linking
import { useState } from "react"; //for hooking
function Header() {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  const [searchString, setSearchString] = useState({
    search: "",
  });

  //change element value
  const handleChange = (event) => {
    setSearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };

  const searchCourse = () => {
    if (searchString.search !== "") {
      window.location.href = "/search/" + searchString.search;
    }
  };
  const logo_text = {
    background: "linear-gradient(to top, #ffe838, #fd57bf)",
    "font-family": ' "Courier New", Courier',
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "user-select": "none",
  };

  return (
    // Navbar Start -->
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow fixed-top p-0">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 d-flex">
          <i className="fa fa-1x fa-graduation-cap text-success"></i>
          <p
            className="mt-1 fs-5 border-bottom border-success"
            style={logo_text}
          >
            Socrates Schools
          </p>
        </h2>
      </Link>
      <form className="d-flex ms-3">
        <input
          name="search"
          className="form-control p-1 h-25"
          type="search"
          placeholder="Search course"
          onChange={handleChange}
          aria-label="Search"
        />
        <span className="ms-1 h-25">
          <button
            type="button"
            onClick={searchCourse}
            className="btn btn-outline-light btn-sm h-25"
          >
            <i className="fa fa-search m-1 text-success "></i>
          </button>
        </span>
      </form>
      <Link to="/mpesa" className="ms-5 text-decoration-none">
        <button
          type="button"
          className="btn btn-sm btn-outline-success mt-0"
          style={logo_text}
        >
          <i className="fa fa-dollar "></i>Donate
        </button>
      </Link>

      <button
        type="button"
        className="btn btn-sm navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* toggler */}
      {/* <div className="menu-toggler">
        <div className="bar half start"></div>
        <div className="bar"></div>
        <div className="bar half end"></div>
      </div> */}
      {/*end toggler */}

      <div className="collapse navbar-collapse me-8" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/about" className="nav-item nav-link">
            About
          </Link>
          <Link to="/course_categories" className="nav-item nav-link">
            Schools
          </Link>
          <Link to="/contact" className="nav-item nav-link">
            Contact
          </Link>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              to="#"
              id="navbarDropdown"
              role="button"
            >
              Teacher
            </Link>
            <ul
              className="dropdown-menu  fade-down m-0"
              aria-labelledby="navbarDropdown"
            >
              {teacherLoginStatus !== "true" && (
                <>
                  <li>
                    <Link to="/teacher_login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/teacher_register" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {teacherLoginStatus === "true" && (
                <>
                  <li>
                    <Link to="/teacher_dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/teacher_logout" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
          <div className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Student
            </Link>
            <ul
              className="dropdown-menu  fade-down m-0"
              aria-labelledby="navbarDropdown"
            >
              {studentLoginStatus !== "true" && (
                <>
                  <li>
                    <Link to="/student_login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/student_register" className="dropdown-item">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {studentLoginStatus === "true" && (
                <>
                  <li>
                    <Link to="/student_portal" className="dropdown-item">
                      Portal
                    </Link>
                  </li>
                  <li>
                    <Link to="/student_logout" className="dropdown-item">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
    // Navbar End -->
  );
}

export default Header;
