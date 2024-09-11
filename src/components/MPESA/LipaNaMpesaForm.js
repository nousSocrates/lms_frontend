import { Container } from "../../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import React, { useState} from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import { paymentUrl } from "../exports";

const LipaNaMpesaForm = () => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  // const [error, setError] = useState('');
  const [Amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(paymentUrl+"/payments/lipa/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PhoneNumber, Amount }),
      });
    // Check if the response status is not OK (200-299)
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Check if the response is in JSON format
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response from the server");
    }
      const data = await response.json();

      // Handle the response from the Lipa Na M-Pesa API
      console.log("Payment initiation response:", data);
      Swal.fire({
        title: "Thanks!",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-center",
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
  
      // Display an error message to the user
      Swal.fire({
        title: "Error",
        // text: "An error occurred while initiating the payment. Please try again later.",
        text: error,
        icon: "error",
        confirmButtonText: "Cancel",
      });
    }
    
  };

  //styles
  const form_field ={
    "font-family": ' "Courier New", Courier',
    "-webkit-background-clip": "text",
    background: "linear-gradient(to top, #ffe838, #fd57bf)",
    border: "2px solid green",
    "min-width":"275px",
    "max-width":"500px",
    "border-radius":"10px",
    padding:"30px",


  }

  return (
    <Container className="mt-6">
      <div className="container-xxl py-5">
    
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Lipa Na Mpesa
            </h6>
            <h6 className="mb-2  text-success ">Thank you for supporting us</h6>
          </div>
          <div className="row g-4 justify-content-center">
            <form onSubmit={handleSubmit} style={form_field} className="fs-4">
              <label htmlFor="PhoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{9}"
              />
              {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
              <label htmlFor="Amount">Amount (KES):</label>
              <input
                type="number"
                id="Amount"
                name="Amount"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-sm btn-success text-light float-end me-2 fs-5"
              >Donate
              </button> 
              <hr className="text-success mt-4"/>

              <p className="text-secondary text-start fs-3 mt-5">You can also donate via
                <Link to="/paypal" className="text-decoration-none">
                  <button className="btn btn-sm btn-primary text-light float-end fs-5 me-2">PayPal</button>
                </Link>
             </p>
            </form>
          </div>
     
        </div>
      </div>
    </Container>
  );
};

export default LipaNaMpesaForm;
