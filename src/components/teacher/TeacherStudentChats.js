import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server

const baseUrl = "http://127.0.0.1:8000/api";

function ChatMessages(props) {
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    document.title = "SS | Assigned Quizes";
    //axios fetch messages when page loads
    try {
      axios
        .get(
          baseUrl +
            "/fetch_messages/" +
            props.teacher_id +
            "/" +
            props.student_id
        )
        .then((res) => {
          setMessageData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // Refresh messages function
  const refreshMessages = () => {
    try {
      axios
        .get(
          baseUrl +
            "/fetch_messages/" +
            props.teacher_id +
            "/" +
            props.student_id
        )
        .then((res) => {
          setMessageData(res.data);
          const objectDiv = document.getElementById("message_list");
          objectDiv.scrollTop = objectDiv.scrollHeight;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const msg_list = {
    height: "500px",
    overflow: "auto",
  };
  return (
    <>
      {" "}
      <p className="bg-light align-items-center">
        {" "}
        <button
          type="button"
          title="Refresh"
          className=" btn btn-sm btn-outline-success bg-info ms-3"
          onClick={refreshMessages}
        >
          <i className="bi bi-arrow-clockwise "></i>
        </button>
      </p>
      <div style={msg_list} id="message_list">
        {messageData.map(
          (
            row,
            index // notice the row, data fetched one level down
          ) => (
            <div className="row mb-4">
              {/* Teacher's messages */}
              {row.sender === "teacher" && (
                <div className="col-7 offset-5">
                  <div className="alert alert-danger mb-1 mt-2">
                    <p className="text-start">{row.message}</p>
                  </div>
                  <small className="text-muted float-end">{row.msg_time}</small>
                </div>
              )}
              {/* Student's messages */}
              {row.sender !== "teacher" && (
                <div className="col-7">
                  <div className="alert alert-success mb-1 mt-2">
                  <p className="text-start">{row.message}</p>
                  </div>
                  <small className="text-muted float-end">{row.msg_time}</small>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ChatMessages;
