import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast, { Toaster } from "react-hot-toast";
import config from "../../config";
import { paymentUrl } from "../exports";

// STYLES
const cardStyle = {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    maxWidth: "300px",
    margin: "auto",
    marginTop: "8%",
    textAlign: "center",
    fontFamily: "arial",
};

const cardTextStyle = {
    color: "#474747",
};

const cardDetailsStyle = {
    background: "linear-gradient(to top, #ffe838, #fd57bf)",
    fontFamily: '"Courier New", Courier',
    WebkitBackgroundClip: "text",
    paddingBottom: "10px",
    paddingLeft: "5px",
    paddingRight: "5px",
};

// Utility function to get CSRF token from cookies (for Django)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const PayPalForm = () => {
    const [amount, setAmount] = useState(""); // Initialize as empty string
    const [isButtonReady, setIsButtonReady] = useState(false); // Control button availability

    // Handle the amount change when the user selects a different value
    const handleAmountChange = (event) => {
        const value = event.target.value === "" ? "" : Number(event.target.value); // Keep empty or convert to number
        setAmount(value); // Update the amount state directly
        console.log("Amount selected:", value); // Debugging log to track selected value
        setIsButtonReady(true); // Enable PayPal button after a valid amount is selected
    };

    // Create the order with PayPal, passing the selected amount
    const createOrder = (data, actions) => {
        console.log("Amount in createOrder:", amount); // Log to ensure amount is being passed
        
        if (!amount || isNaN(amount) || amount <= 0) { // Check if amount is valid
            toast.error("Please select a valid amount."); // Ensure amount is valid
            return; // Prevent order creation if no valid amount is selected
        }

        // Proceed to create the order with the valid amount
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: "USD", 
                    value: amount.toFixed(2) // Ensure amount has two decimal places
                }
            }]
        });
    };

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();

        // Send order details to the Django backend
        console.log("Captured order details:", order); // Log to track captured order

        const response = await fetch(paymentUrl + '/pay_pal/capture_paypal_payment/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                paymentID: order.id, // Use the correct ID from the PayPal order
                payerID: data.payerID, // This is correct, assuming it's returned by PayPal
                amount: amount // Send the dynamic amount to the backend
            })
        });

        if (response.ok) {
            console.log('Payment processed successfully');
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Payment processing failed');
        }
    };

    // Add debugging hooks to ensure the right state
    useEffect(() => {
        console.log(`Updated amount state: ${amount}`);
    }, [amount]);

    return (
        <div>
            <h2>Checkout</h2>
            <PayPalScriptProvider options={{ "client-id": config.REACT_APP_PAYPAL_CLIENT_ID}}> 
                <Toaster />
                <div className="card" style={cardStyle}>
                    <div className="card-details" style={cardDetailsStyle}>
                        <h4 style={cardTextStyle} className="text-dark fs-2">Please Select the Amount</h4>
                        {/* Dropdown for selecting the amount */}
                        <select value={amount} onChange={handleAmountChange} className="bg-secondary text-center fs-5">
                            <option value="">-- Select Amount --</option> {/* No default option */}
                            <option value={1}>1 USD</option>
                            <option value={5}>5 USD</option>
                            <option value={10}>10 USD</option>
                            <option value={20}>20 USD</option>
                            <option value={50}>50 USD</option>
                            <option value={100}>100 USD</option>
                            <option value={500}>500 USD</option>
                            <option value={1000}>1000 USD</option>
                        </select>

                        {/* PayPal button, only enable after valid amount is selected */}
                        {isButtonReady && (
                            <PayPalButtons
                                createOrder={(data, actions) => createOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)}
                                onCancel={() => toast(
                                    "You cancelled the payment. Try again by clicking the PayPal button", {
                                    duration: 6000,
                                })}
                                onError={(err) => {
                                    console.error('PayPal Buttons Error:', err);
                                    toast.error(
                                        "There was an error processing your payment. Please contact support if this persists.", {
                                        duration: 6000,
                                    });
                                }}
                            />
                        )}
                    </div>
                </div>
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalForm;



          