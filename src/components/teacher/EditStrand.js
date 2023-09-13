import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function EditStrand() {
  const [strandData, setStrandData] = useState({
    course: "",
    strand_title: "",
    strand_description: "",
    prev_strand_video: "",
    strand_video: "",
    strand_remarks: "",
  });

  //handle change
  const handleChange = (event) => {
    setStrandData({
      ...strandData,
      [event.target.name]: event.target.value,
    });
  };

  //change file value for vids and img
  const handleFileChange = (event) => {
    setStrandData({
      ...strandData,
      [event.target.name]: event.target.files[0],
    });
  };

  //courseUpdate fxn

  const { strand_id } = useParams();
  const sweetStrandUpdateClick = () => {
    const _formData = new FormData();
    _formData.append("course", strand_id);
    _formData.append("strand_title", strandData.strand_title);
    _formData.append("strand_description", strandData.strand_description);
    if (strandData.strand_video !== "") {
      _formData.append(
        "strand_video",
        strandData.strand_video,
        strandData.strand_video.name
      );
    }
    _formData.append("strand_remarks", strandData.strand_remarks);

    console.log(strandData);

    try {
      axios
        .put(baseUrl + "/strands/" + strand_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            //Sweet alert confirm delete
            Swal.fire({
              title: "Strand updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }

          //window.location.href = "/edit_strand/"; //clears data and refresh page
        });
    } catch (error) {
      console.log(error);
    }
  };

  //axios fetch strand when page loads
  useEffect(() => {
    document.title = "SS | Edit Strand";
    try {
      axios.get(baseUrl + "/strands/" + strand_id).then((res) => {
        setStrandData(res.data);
        setStrandData({
          course: res.data.course,
          strand_title: res.data.strand_title,
          strand_description: res.data.strand_description,
          prev_strand_video: res.data.strand_video,
          strand_video: "",
          strand_remarks: res.data.strand_remarks,
        });
        console.log(strandData);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Edit Strand ({strand_id})</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
                <div className="mb-3">
                  <label for="strand_title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    type="text"
                    value={strandData.strand_title}
                    onChange={handleChange}
                    name="strand_title"
                    id="strand_title"
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label
                    for="strand_description"
                    className="form-label float-start"
                  >
                    Description
                  </label>
                  <input
                    value={strandData.strand_description}
                    onChange={handleChange}
                    type="text"
                    id="strand_description"
                    name="strand_description"
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label for="strand_video" className="form-label float-start">
                    Video
                  </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    id="strand_video"
                    name="strand_video"
                    className="form-control"
                  />
                  {strandData.prev_strand_video && (
                    <video controls width="50%">
                      <source
                        src={strandData.prev_strand_video}
                        type="video/mp4"
                      />
                      <source
                        src={strandData.prev_strand_video}
                        type="video/ogg"
                      />
                      <p className="text-danger">
                        Sorry, your browser does not support embedded videos
                      </p>
                    </video>
                  )}
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label float-start">
                    Remarks
                  </label>
                  <input
                    value={strandData.strand_remarks}
                    onChange={handleChange}
                    type="text"
                    id="strand_remarks"
                    name="strand_remarks"
                    className="form-control"
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={sweetStrandUpdateClick}
                  className="btn btn-primary float-end "
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default EditStrand;
