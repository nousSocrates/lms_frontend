import { Container } from "../../componentcss/styledcss/Container.styled";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MpesaAPI() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your M-Pesa API endpoint
    const apiUrl = "https://api.example.com/mpesa";

    // Replace with your M-Pesa API credentials
    const apiKey = "your-api-key";
    const apiSecret = "your-api-secret";

    // Create a basic authentication header
    const headers = {
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <Container>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              MPESA
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div className=" bg-primary container  py-3">
              <h6 className="mb-2 fw-bold fs-6 text-warning ">
                PAYBILL:4101811
              </h6>
              <h6 className="mb-2 fw-light fs-6 text-warning">
                Socrates Schools Online
              </h6>
              <label>Enter your Phone nummber</label>
              <br />
              <input className="mt-3" placeholder="Start with 2547" />
              <br />
                <button
                  type="button"
                  title="Submit to authorize payment"
                  className="btn btn-sm  me-5 float-end  btn-outline-success text-warning"
                >
                  Submit
                </button>
             
            </div>

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MpesaAPI;
