import { Container } from "../../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


function MpesaAPI() {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    phone_number: "",
  });
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
        setPaymentDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
   }, []);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an Axios POST request to your backend endpoint
      const response = await axios.post("/api/lipa_na_mpesa", paymentDetails);

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error submitting payment:", error);
    }
  };

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
            <form onSubmit={handleSubmit} className="border p-2">
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={paymentDetails.amount}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phone_number"
                  value={paymentDetails.phone_number}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-sm  m-auto mt-3  btn-outline-success text-warning"
              >
                Pay with M-Pesa
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MpesaAPI;
