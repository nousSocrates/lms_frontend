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
      <h1>M-Pesa API Data</h1>
      <p></p>
     <pre>{JSON.stringify(data, null, 2)}</pre>
    </Container>
  );
}

export default MpesaAPI;
