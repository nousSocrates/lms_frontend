import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; //for hooking titles
import { Container } from "../componentcss/styledcss/Container.styled";
import axios from "axios"; // used in fetching http request to the server

import { baseUrl } from "./exports";

function Pages() {
  const [pageData, setPageData] = useState([]);
  let { page_id, page_slug } = useParams();

  useEffect(() => {
    //axios fetch page data when page loads
    try {
      axios.get(baseUrl + "/pages/" + page_id + "/" + page_slug).then((res) => {
        setPageData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [page_id]);

  return (
    <Container className="mt-6">
      <h2>{pageData.title}</h2>
      <p>{pageData.content}</p>
    </Container>
  );
}

export default Pages;
