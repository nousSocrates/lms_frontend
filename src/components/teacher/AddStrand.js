import { useEffect, useState } from "react"; //for hooking
import axios from "axios"; // used in fetching http request to the server
import TeacherSideBar from "./TeacherSideBar";
import { Container } from "../../componentcss/styledcss/Container.styled";
import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom"; // for linking
import Swal from "sweetalert2";

import { baseUrl } from "../exports";

function AddStrand() {
  const [strandData, setStrandData] = useState({
    strand_title: "",
    strand_description: "",
    strand_video: "",
    strand_remarks: "",
  });
  const [videoDuration, setVideoDuration] = useState();
  useEffect(() => {
    document.title = "SS | Add Strand";
  });
  //const { videoDuration, setVideoDuration } = useState();

  //change element value
  const handleChange = (event) => {
    setStrandData({
      ...strandData,
      [event.target.name]: event.target.value,
    });
  };
  //change file value
  const handleFileChange = (event) => {
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement("video");
    video.preload = "metadata";
    video.onloadeddata = function () {
      window.URL.revokeObjectURL(video.src);
      setVideoDuration(video.duration);
      alert("Duration: " + video.duration + " Seconds");
    };
    video.src = URL.createObjectURL(event.target.files[0]);
    setStrandData({
      ...strandData,
      [event.target.name]: event.target.files[0],
    });
  };

  //strandUpload fxn

  const { course_id } = useParams();
  //const {navigate } = useNavigate();

  const strandFormUpload = () => {
    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("strand_title", strandData.strand_title);
    _formData.append("strand_description", strandData.strand_description);
    _formData.append(
      "strand_video",
      strandData.strand_video,
      strandData.strand_video.name
    );
    _formData.append("strand_remarks", strandData.strand_remarks);

    try {
      axios
        .post(baseUrl + "/course_strands/" + course_id, _formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          //console.log(res.data);
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: "Strand has been added",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-center",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            //navigate("/course_strands/" + course_id);
             window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="row">
        <aside className="col-md-3">
          <TeacherSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-dark">Add Strand</h5>
            <div className="card-body">
              <form className="text-dark text-align-start">
                <div className="mb-3">
                  <label for="strand_title" className="form-label float-start">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="strand_title"
                    name="strand_title"
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
                  ></input>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label float-start">
                    Remarks
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="strand_remarks"
                    name="strand_remarks"
                    className="form-control"
                    placeholder="This video is..."
                  ></input>
                </div>
                <button
                  type="button"
                  onClick={strandFormUpload}
                  className="btn btn-primary float-end "
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default AddStrand;
