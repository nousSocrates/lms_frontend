import { Container } from "../../componentcss/styledcss/Container.styled";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MpesaAPI() {
  // const [paymentDetails, setPaymentDetails] = useState({
  //   amount: "",
  //   phone_number: "",
  // });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Replace with your M-Pesa API endpoint
  //   const apiUrl = "https://api.example.com/mpesa";

  //   // Replace with your M-Pesa API credentials
  //   const apiKey = "your-api-key";
  //   const apiSecret = "your-api-secret";

  //   // Create a basic authentication header
  //   const headers = {
  //     Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
  //   };

  //   axios
  //     .get(apiUrl, { headers })
  //     .then((response) => {
  //       setPaymentDetails(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, []);

  // const handleChange = (e) => {
  //   setPaymentDetails({
  //     ...paymentDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Make an Axios POST request to your backend endpoint
  //     const response = await axios.post("/api/lipa_na_mpesa", paymentDetails);

  //     // Handle the response as needed
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error submitting payment:", error);
  //   }
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  var button = document.getElementById("mpesaButton");

  if (button !== null) {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<link rel=stylesheet href="https://cdn.jsdelivr.net/gh/muaad/mpesa_button@master/styles/style.css">'
    );
    const img =
      '<img style="width: 35px; display: inline; margin: -8px;" src= "https://cdn.jsdelivr.net/gh/muaad/mpesa_button@master/images/mpesa.png"/>';



    const btnMarkup =
      '<a href="" id="mpesaBtn" class="mpesaButton">' +
      img +
      '<span style="margin-left: 15px;">Pay with Mpesa</span></a>';


    const phoneInstruction =
      "<strong><em>We will send an Mpesa payment request to this phone number</em></strong>";


    const form =
      '<form>\
        <label for="amount" class="mpesaLabel">Amount</label><input class="mpesaInput" type="text" placeholder="2000" name="phone" id="mpesaAmount"></input><br>\
        <label for="phone" class="mpesaLabel">Phone Number</label><input class="mpesaInput" type="text" placeholder="254722123456" name="phone" id="mpesaPhoneNumber"></input><br>' +
      phoneInstruction +
      '<br><br><button href="" id="mpesaSend" class="mpesaButton" style="width: 100%;">' +
      img +
      '<span style="margin-left: 15px;">Pay</span></button></form>';




    const formMarkup =
      '<div id="mpesaForm"><h3 class="mpesaHeader">Pay With Mpesa</h3>' +
      form +
      "</div>"; 
      
    button.innerHTML = btnMarkup;

    const success =
      '<div style="text-align: center;" class="animate-bottom">\
      <h2>√ Success</h2>\
      <p>An Mpesa payment request will be sent to your phone shortly</p>\
    </div>';


    
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const formDiv = document.createElement("div");
      button.parentNode.insertBefore(formDiv, button.nextSibling);
      formDiv.innerHTML = formMarkup;
      const amountInput = document.getElementById("mpesaAmount");
      const phoneInput = document.getElementById("mpesaPhoneNumber");
      const phone = button.getAttribute("data-phone");
      const amount = button.getAttribute("data-amount");
      const url = button.getAttribute("data-url");
      amountInput.value = amount;
      phoneInput.value = phone;
      button.style.display = "none";

      const payButton = document.getElementById("mpesaSend");
      const loaderDiv = document.createElement("div");
      loaderDiv.setAttribute("id", "loader");
      payButton.parentNode.insertBefore(loaderDiv, payButton.nextSibling);
      const loader = document.getElementById("loader");
      loader.style.display = "none";
      loader.style.margin = "-75px 0 0 -110px";

      payButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        payButton.disabled = true;
        document.getElementById("mpesaPhoneNumber").disabled = true;
        formDiv = document.getElementById("mpesaForm");
        if (url !== undefined) {
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", url, true);
          xhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          xhttp.send(
            "phone=" + phoneInput.value + "&amount=" + amountInput.value
          );
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              formDiv.innerHTML = success;
            } else {
              formDiv.innerHTML =
                'Something went wrong. Contact website developer. Error: "We could not POST to the URL specified!"';
            }
          };
        } else {
          setTimeout(function () {
            formDiv.innerHTML =
              'Something went wrong. Contact website developer. Error: "No URL specified!"';
          }, 3000);
        }
        loader.style.display = "";
      });
    });
  }

  return (
    <Container>
      <div className="card col-7 bg-danger">
        {" "}
        <h1 className="bg-success p-3  mb-2 card-header">LIPA NA MPESA</h1>
        <div className="card-body w-100" id="mpesaButton ">
          <div
            id="mpesaButton"
            data-phone="254722XXXXXX"
            data-amount="3000"
            data-url="https://domain.com/mpesa/payments/request"
          ></div>
        </div>
      </div>

      {/* <div className="container-xxl py-5">
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
      </div> */}
    </Container>
  );
}

export default MpesaAPI;
