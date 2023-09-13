import { Container } from "../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import { useEffect } from "react"; //for hooking titles
function About() {
  useEffect(() => {
    document.title = "SS | About";
  });
  return (
    <Container className="mt-6">
      <section className="about mt-5" id="about">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3 mt-4">
            About Us
          </h6>
          <h1 className="mb-5 fs-6 text-muted ">Socrates Schools</h1>
        </div>

        <div className="row container">
          <div
            className=" col-lg-5 profile-img"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img src="static/pixels/socratespurple.png" alt="" />
            <div className="social-media">
              <ul className="list-inline me-5 mt-2 badge">
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
                    <i className="bi bi-twitter"></i>
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
              </ul>
            </div>
          </div>
          <div className=" col-lg-7 " data-aos="fade-left" data-aos-delay="400">
            <h5 className="mb-2 text-success fs-6 fw-6 ">
              Welcome to Socrates Schools
            </h5>
            <p className="text-secondary">
              We are a dedicated, resourceful and goal-driven professional
              educators with a solid commitment to the intellectual, spiritual
              and social growth and development of every learner. <br />
              We have exceptional ability to establish cooperative and
              professional relationships with parents, staff and
              administrations, with diverse experience and strong track record
              fostering learner-centered curriculum and student creativity.
            </p>
            <div className="row gy-2 gx-4 mb-4">
              <div className="col-sm-6">
                <p className="mb-0 text-warning">
                  <i className="fa fa-arrow-right text-primary me-2"></i>
                  Skilled Instructors
                </p>
              </div>
              <div className="col-sm-6 text-info">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>
                  Online Classes
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0 text-primary">
                  <i className="fa fa-arrow-right text-primary me-2"></i>
                  International Certificate
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0 text-success">
                  <i className="fa fa-arrow-right text-primary me-2"></i>
                  24/7 Client Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about */}
    </Container>
  );
}

export default About;
