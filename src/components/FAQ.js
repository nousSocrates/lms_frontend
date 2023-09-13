import { Link } from "react-router-dom";
import { Container } from "../componentcss/styledcss/Container.styled";
import { useEffect, useState } from "react"; //for hooking titles
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api";

function FAQ() {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    document.title = "SS | Frequent Questions";

    //axios fetch courses when page loads
    try {
      axios.get(baseUrl + "/faq/").then((res) => {
        setFaqData(res.data);
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
              FAQs
            </h6>
            <h6 className="mb-2  text-muted ">Frequently Asked Quesions</h6>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}

            <div className="accordion" id="FAQAccordion">
              {faqData &&
                faqData.map((row, index) => (
                  <div className="accordion-item">
                    <h6 className="accordion-header" id="accordionQuestion">
                      <button
                        type="button"
                        className="accordion-button  "
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {index + 1 + ". " + row.question}
                      </button>
                    </h6>
                    {index === 0 && (
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show "
                        aria-labelledby="accordionQuestion"
                        data-bs-parent="FAQAccordion"
                      >
                        <div className="accordion-body fs-6 text-muted">
                          {row.answer}
                        </div>
                      </div>
                    )}
                    {index > 0 && (
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="accordionQuestion"
                        data-bs-parent="FAQAccordion"
                      >
                        <div className="accordion-body">{row.answer}</div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
           
            {/* course col end */}
          </div>
        </div>
      </div>
      {/* <aside id="sidenav" class="ljmu-sidenav animated fadeInLeft">
        <div class="sidenav-container">
          <div class="sidebar-account-info py-4 px-3 bg-cyan">
            <div class="text-lg fw-600 mb-2">
              <a
                href="https://sis-ljmu.unicaf.org/students/profile"
                class="text-white"
              >
                Phelix Ouma
              </a>
            </div>
            <div class="mb-1 fw-300">
              <span class="badge bg-white text-dark-blue">Inquiry</span>
            </div>
            <div class="">
              <a
                data-toggle="dynamicModal"
                class="fw-600 text-white"
                data-modalsize="modal-lg"
                title="Balance Details"
                href="https://sis-ljmu.unicaf.org/students/ajax_balance_details"
              >
                £
                <span class="balance-container" data-balance="0.00">
                  0.00
                </span>
                <small>GBP</small>
              </a>
            </div>
          </div>
          <nav class="sidenav-nav py-3">
            <ul class="nav flex-column">
              <li class="nav-item active">
                <a
                  title="My page"
                  class="nav-link d-flex align-items-center"
                  href="/students/index"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-home"></i>
                    My page
                  </div>
                </a>
              </li>
              <li class="nav-item has-submenu">
                <a
                  title="Account"
                  class="nav-link d-flex align-items-center"
                  href="/#"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-user-circle"></i>
                    Account
                  </div>
                  <span class="nav-caret">
                    <i class="far fa-xs fa-chevron-right"></i>
                  </span>
                </a>
                <ul class="submenu" style="">
                  <li class="">
                    <a
                      title="Profile"
                      href="https://sis-ljmu.unicaf.org/students/profile"
                    >
                      Profile
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Application"
                      href="https://sis-ljmu.unicaf.org/students/edit_application"
                    >
                      Application
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Documents"
                      href="https://sis-ljmu.unicaf.org/students/documents"
                    >
                      Documents
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Transcript"
                      href="https://sis-ljmu.unicaf.org/students/transcripts"
                    >
                      Transcript
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Change password"
                      href="https://sis-ljmu.unicaf.org/pmanager/changepassword"
                    >
                      Change password
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item has-submenu">
                <a
                  title="Finance"
                  class="nav-link d-flex align-items-center"
                  href="/#"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-wallet"></i>
                    Finance
                  </div>
                  <span class="nav-caret">
                    <i class="far fa-xs fa-chevron-right"></i>
                  </span>
                </a>
                <ul class="submenu" style="">
                  <li class="">
                    <a
                      title="Payment plan"
                      href="https://sis-ljmu.unicaf.org/students/paymentplan"
                    >
                      Payment plan
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Make payment"
                      href="https://sis-ljmu.unicaf.org/students/deposit"
                    >
                      Make payment
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="Account statement"
                      href="https://sis-ljmu.unicaf.org/students/statement"
                    >
                      Account statement
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item has-submenu">
                <a
                  title="Modules"
                  class="nav-link d-flex align-items-center"
                  href="/modules/index"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-tasks"></i>
                    Modules
                  </div>
                  <span class="nav-caret">
                    <i class="far fa-xs fa-chevron-right"></i>
                  </span>
                </a>
                <ul class="submenu" >
                  <li class="">
                    <a
                      title="Modules"
                      href="https://sis-ljmu.unicaf.org/modules/index"
                    >
                      Modules
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="My Pre-Registrations"
                      href="https://sis-ljmu.unicaf.org/offer_preregistrations/index"
                    >
                      My Pre-Registrations
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="My Enrolments"
                      href="https://sis-ljmu.unicaf.org/offer_group_enrolment/index"
                    >
                      My Enrolments
                    </a>
                  </li>
                  <li class="">
                    <a
                      title="My Resubmissions"
                      href="https://sis-ljmu.unicaf.org/resits/index"
                    >
                      My Resubmissions
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item has-submenu">
                <a
                  title="Feedbacks"
                  class="nav-link d-flex align-items-center"
                  href="/#"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-comment-alt"></i>
                    Feedbacks
                  </div>
                  <span class="nav-caret">
                    <i class="far fa-xs fa-chevron-right"></i>
                  </span>
                </a>
                <ul class="submenu" style="">
                  <li class="">
                    <a
                      title="Suggestion Box"
                      href="https://sis-ljmu.unicaf.org/students/suggestions"
                    >
                      Suggestion Box
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a
                  title="Help"
                  class="nav-link d-flex align-items-center"
                  href="/help/index"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-question-circle"></i>
                    Help
                  </div>
                </a>
              </li>
              <li class="nav-item">
                <a
                  title="Logout"
                  class="nav-link d-flex align-items-center"
                  href="/students/logout"
                >
                  <div class="nav-link-label flex-grow-1">
                    <i class="sidenav-icon fad fa-sign-out"></i>
                    Logout
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside> */}
    </Container>
  );
}

export default FAQ;
