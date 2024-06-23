// // import { PayPalButtons } from "@paypal/react-paypal-js";
// // import toast from "react-hot-toast";


// const PayPalForm = () => {
    
//   //styles
//   const soon_txt ={
//     "font-family": ' "Courier New", Courier',
//     "-webkit-background-clip": "text",
//     background: "linear-gradient(to top, #ffe838, #fd57bf)",
//     border: "2px solid green",
//     "border-radius":"10px",
//     padding:"50px",
//     margin:"8rem",

//   }

//     return (
//         <div className="card mt-5">

//             <p style={soon_txt}><marquee className="fs-1 fw-1">Our developers are working to upgrade this page. It will be functional soon.</marquee></p>
//             {/* <img src="https://images.unsplash.com/photo-1594498257673-9f36b767286c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" alt="Airtable product" style={{ width: '100%' }} />
//             <div className="card-details">
//                 <h1>Airtable Product</h1>
//                 <p className="price">$10.00</p>
//                 <p>Some information about the product</p>
//                 <PayPalButtons
//                     style={{ layout: "horizontal" }}
//                     createOrder={(data, actions) => {
//                         return actions.order.create({
//                             purchase_units: [
//                                 {
//                                     amount: {
//                                         value: "10.00"
//                                     },
//                                     custom_id: "e-book-1234"  // the name or slug of the thing you're selling
//                                 },
//                             ],
//                         });
//                     }}
//                     onApprove={(data, actions) => {
//                         return actions.order.capture().then(function (details) {
//                             toast.success('Payment completed. Thank you, ' + details.payer.name.given_name)
//                         });
//                     }}
//                     onCancel={() => toast(
//                         "You cancelled the payment. Try again by clicking the PayPal button", {
//                         duration: 6000,
//                     })}
//                     onError={(err) => {
//                         toast.error(
//                             "There was an error processing your payment. If this error please contact support.", {
//                             duration: 6000,
//                         });
//                     }}
//                 />
//             </div> */}
//         </div>
//     )
// }
// export default PayPalForm

import React, { useEffect, useState } from 'react';



const PayPalForm = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      margin:"50%",
      padding: windowWidth > 768 ? '200px' : '100px',
      backgroundColor: windowWidth > 768 ? 'lightblue' : 'lightcoral',
    },
  };

  return (
    <div style={styles.container}>
      <p>Resize the window to see the effect!</p>
    </div>
  );
};

export default PayPalForm;