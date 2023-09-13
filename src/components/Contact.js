import { Container } from "../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api/contact/";
function Contact() {
  const [contactUsData, setContactUsData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    subject: "",
    message: "",
    status: "",
  });
  useEffect(() => {
    document.title = "SS | Contact us";
  });
  //change element value
  const handleChange = (event) => {
    setContactUsData({
      ...contactUsData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(contactUsData);
  //end change value

  //submit form
  const submitForm = () => {
    const contactUsFormData = new FormData();

    contactUsFormData.append("full_name", contactUsData.full_name);
    contactUsFormData.append("phone_number", contactUsData.phone_number);
    contactUsFormData.append("email", contactUsData.email);
    contactUsFormData.append("subject", contactUsData.subject);
    contactUsFormData.append("message", contactUsData.message);

    try {
      axios.post(baseUrl, contactUsFormData).then((response) => {
        setContactUsData({
          full_name: "",
          phone_number: "",
          email: "",
          subject: "",
          message: "",
          status: "success",
        });
      });
    } catch (error) {
      console.log(error);
      setContactUsData({ status: "error" });
    }
  };
  //end
  return (
    <Container>
      {/* <!--CONTACT  --> */}
      <section className="contact" id="contact">
        <div className="container ">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3 mt-4">
              Contact Us
            </h6>
            <h1 className="mb-5 fs-6 text-muted ">Let's work together</h1>
          </div>

          <div className="row">
            <div className="col-lg-5 text-muted p-3">
              <div className="text-start my-3 fs-6 fw-lighter">
                <i className="icon fas fa-map-marker-alt text-danger me-1"></i>
                Koyonzo via Mumias, Kenya
              </div>
              <div className="text-start my-3 fs-6 fw-light">
                <i className="icon fas fa-envelope text-info me-1"></i>
                socratesedu817@gmail.com
              </div>
              <div className="text-start my-3 fs-6 fw-light">
                <i className="icon fas fa-phone text-success me-1"></i>+254 704
                588 581
              </div>
              <div className="text-start my-3 fs-6 fw-light">
                <i className="icon fas fa-clock me-1"></i> 24/7
              </div>
            </div>
            <div
              className="col-lg-7 bg-dark card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* <!-- <form action="" onsubmit="sendEmail(); reset(); return false;" method="post"> --> */}
              <form
                // action="https://formspree.io/f/mrgdeaqp"
                // method="POST"
                className="p-1 mt-2 "
              >
                <input
                  type="text"
                  className="text-box p-2 text-muted"
                  id="full_name"
                  name="full_name"
                  onChange={handleChange}
                  value={contactUsData.full_name}
                  placeholder="Full name"
                  required
                />
                <input
                  type="email"
                  className="text-box p-2 text-muted"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={contactUsData.email}
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  className="text-box p-2 text-muted"
                  name="phone_number"
                  onChange={handleChange}
                  value={contactUsData.phone_number}
                  placeholder="Phone number"
                  required
                />
                <input
                  type="text"
                  className="text-box p-2 text-muted"
                  name="subject"
                  onChange={handleChange}
                  value={contactUsData.subject}
                  placeholder="Subject"
                  required
                />
                <textarea
                  name="message"
                  value={contactUsData.message}
                  onChange={handleChange}
                  id="message"
                  rows="5"
                  placeholder="Your Meassage"
                  required
                ></textarea>
                {contactUsData.status === "success" && (
                  <p className="text-success text-center fs-5">
                    Thank you for contacting us.
                  </p>
                )}
                {contactUsData.status === "error" && (
                  <p className="text-danger text-center fs-6">
                    Sorry, server problem!
                  </p>
                )}
                <button
                  onClick={submitForm}
                  type="button"
                  className="btn btn-sm btn-outline-success float-end me-4 mb-3"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Contact;
