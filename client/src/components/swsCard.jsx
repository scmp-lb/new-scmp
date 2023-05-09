import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import {
  deleteSWSEvent,
  editSWSEvent,
  getAllSwSEvents,
} from "../features/SWS/swsSlice";
function SWSCard({ value }) {
  const dispatch = useDispatch();

  /* DEFINING ALL STATES */
  const [title, setTitle] = useState(value.title);
  const [link, setLink] = useState(value.link);
  const [linkDesc, setLinkDesc] = useState(value.linkDesc);
  const [subTitle, setSubTitle] = useState(value.subTitle);
  const [images, setImages] = useState([]);
  const [projects, setProjects] = useState(value.Projects);
  const [description, setDescription] = useState(value.Description);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [winnerProjectTitle, setWinnerProjectTitle] = useState("");
  const [winnerProjectDesc, setWinnerProjectDesc] = useState("");

  /*SPECIFIES THE ROUTE */
  const currentLocation = window.location.pathname;

  /*CAROUSEL SETTINGS */
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    prevArrow: <div />,
    nextArrow: <div />,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  /* GET EVENTS ON EVERY DISPATCH */
  useEffect(() => {
    dispatch(getAllSwSEvents());
  }, [dispatch]);

  /* ONSUBMIT EDIT FUNCTION */
  /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
  const onSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("Description", description);
    formData.set("title", title);
    formData.set("subTitle", subTitle);
    formData.set("Projects", projects);
    formData.set("linkDesc", linkDesc);
    formData.set("link", link);
    formData.set("winnerProjectTitle", winnerProjectTitle);
    formData.set("winnerProjectDesc", winnerProjectDesc);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(editSWSEvent({ id: value._id, eventData: formData }));
    setShowEdit(false);
  };

  /* DELETE FUNCTION */
  const handleDelete = () => {
    dispatch(deleteSWSEvent(value._id));
    setShowDelete(false);
  };

  return (
    <div>
      {showEdit && (
        <div className="edit-form">
          <form className="form" onSubmit={onSubmit}>
            <div className="Input">
              <p>Title</p>
              <input
                type="text"
                id="Title"
                placeholder="Title"
                name="Title"
                defaultValue={value.title}
                required
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="Input">
              <p>Subtitle</p>
              <input
                type="text"
                defaultValue={value.subTitle}
                placeholder="SubTitle"
                name="SubTitle"
                required
                onChange={(event) => {
                  setSubTitle(event.target.value);
                }}
              />
            </div>
            {value.Description && (
              <div className="Input">
                <p>Description</p>
                <input
                  type="text"
                  placeholder="Description"
                  name="Description"
                  defaultValue={value.Description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
            )}
            {value.linkDesc && (
              <div>
                <p>link Description</p>
                <input
                  type="text"
                  value={linkDesc}
                  defaultValue={value.linkDesc}
                  onChange={(event) => {
                    setLinkDesc(event.target.value);
                  }}
                  placeholder="link description"
                ></input>
              </div>
            )}
            {value.link && (
              <div>
                <p>link</p>{" "}
                <input
                  type="text"
                  value={link}
                  defaultValue={value.link}
                  onChange={(event) => {
                    setLink(event.target.value);
                  }}
                  placeholder="any link"
                ></input>
              </div>
            )}
            {value.winnerProjectTitle && <p>Winner Project:</p>}

            {value.winnerProjectTitle && (
              <div className="Input">
                <p style={{ fontSize: "14PX" }}>Winner Project Title</p>
                <input
                  type="text"
                  placeholder="Winner project title"
                  name="Winner project title"
                  defaultValue={value.winnerProjectTitle}
                  onChange={(event) => {
                    setWinnerProjectTitle(event.target.value);
                  }}
                />
              </div>
            )}
            {value.winnerProjectDesc && (
              <div className="Input">
                <p style={{ fontSize: "14PX" }}>Winner Project Description</p>
                <input
                  type="text"
                  placeholder="Winner project description"
                  name="Winner project description"
                  defaultValue={value.winnerProjectDesc}
                  onChange={(event) => {
                    setWinnerProjectDesc(event.target.value);
                  }}
                />
              </div>
            )}
            {value.Projects && (
              <div className="Input">
                <p>Projects</p>{" "}
                <textarea
                  type="text"
                  placeholder="Projects"
                  name="Projects"
                  defaultValue={value.Projects}
                  onChange={(event) => {
                    setProjects(event.target.value);
                  }}
                />
              </div>
            )}

            <div className="Input">
              <input
                type="file"
                id="image"
                multiple
                accept="image/png image/jpeg image/jpg image/webp"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImages([]);
                  files.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setImages((oldArray) => [...oldArray, reader.result]);
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
              />
            </div>
            <div className="crud-buttons">
              <button type="submit"> Edit</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div data-aos="fade-up" className="event-card">
        <Slider className="singleImageDash" {...settings}>
          {value?.images?.map((image) => (
            <div className="image" key={image}>
              <img src={image.url} alt="Carousel image" />
            </div>
          ))}
        </Slider>
        {showDelete && (
          <div className="delete-popup">
            <form className="form">
              <h3>Are you sure you want to delete !</h3>

              <div>
                <div className="crud-buttons">
                  <button onClick={handleDelete}>Delete</button>
                  <button onClick={() => setShowDelete(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        )}
        <h2>{value?.title}</h2>
        <p>{value?.subTitle}</p>
        <p className="description">{value?.Description}</p>
        <div
          style={{
            display: `${currentLocation === "/swsDash" ? "none" : "block"}`,
          }}
        >
          {" "}
          <p>
            <strong>Projects:</strong>
          </p>
          <p className="projects">{value?.Projects}</p>
        </div>

        <div className="crud-buttons">
          <button className="Edit" onClick={() => setShowEdit(true)}>
            Edit
          </button>
          <button onClick={() => setShowDelete(true)}>Delete </button>
        </div>
      </div>
    </div>
  );
}

export default SWSCard;
