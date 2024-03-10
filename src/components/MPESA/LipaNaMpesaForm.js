import { Container } from "../../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const LipaNaMpesaForm = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();

      // Handle the response from the Lipa Na M-Pesa API
      console.log("Payment initiation response:", data);

      // Redirect or show confirmation based on the API response
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle error scenarios
    }
  };
  //styles
  const lmp_form = {
    "font-family": ' "Courier New", Courier',
    "-webkit-background-clip": "text",
    background: "linear-gradient(to top, #ffe838, #fd57bf)",
    "min-width": "50%",
    "max-wdth": "60%",
    border: "3px solid green",
    "border-radius": "3%",
    padding: "1.5rem",
  };
  return (
    <Container className="mt-6">
      <div className="container-xxl py-5">
        {/* Start category */}
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              PAYMENTS
            </h6>
            <h6 className="mb-2  text-muted ">Lipa na Mpesa</h6>
          </div>
          <div className="row g-4 justify-content-center">
            {/* course col start */}

            <form onSubmit={handleSubmit} style={lmp_form}>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{9}"
              />

              <label htmlFor="amount">Amount (KES):</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-sm btn-outline-danger text-primary float-end me-2"
              >
                Submit Payment
              </button>
            </form>

            {/* course col end */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LipaNaMpesaForm;
