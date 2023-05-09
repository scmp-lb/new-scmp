import React, { useEffect, useState } from "react";
import AOS from "aos";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import {
 deleteEvent,
 editEvent,
 getEvents,
} from "../features/events/eventSlice";

function OneEvent({ value, src, className }) {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const [title, setTitle] = useState(value.title);
 const [subTitle, setSubTitle] = useState(value.subtitle);
 const [description, setDescription] = useState(value.description);
 const [date, setDate] = useState(value.date);
 const [images, setImages] = useState([]);
 const [videoLink1, setVideoLink1] = useState("");
 const [videoLink2, setVideoLink2] = useState("");
 const [videoLink3, setVideoLink3] = useState("");
 const [videoLink4, setVideoLink4] = useState("");
 const [showDelete, setShowDelete] = useState(false);
 const [showEdit, setShowEdit] = useState(false);

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
  AOS.init();
  AOS.refresh();
  dispatch(getEvents());
 }, [dispatch]);

 /* NAVIGATE FUNCTION BASED ON THE ID */
 const handleClick = () => {
  navigate(`/OneEvent/${value._id}`);
 };

 /* ONSUBMIT EDIT FUNCTION */
 /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
 const onSubmit = async (e) => {
  e.preventDefault();

  var formData = new FormData();
  formData.set("description", description);
  formData.set("title", title);
  formData.set("subtitle", subTitle);
  formData.set("date", date);
  formData.set("videoLink1", videoLink1);
  formData.set("videoLink2", videoLink2);
  formData.set("videoLink3", videoLink3);
  formData.set("videoLink4", videoLink4);

  images.forEach((image) => {
   formData.append("images", image);
  });

  dispatch(editEvent({ id: value._id, eventData: formData }));
  setShowEdit(false);
 };

 /* DELETE FUNCTION */
 const handleDelete = async () => {
  dispatch(deleteEvent(value._id));
  setShowDelete(false);
 };

 return (
  <div className={className}>
   {showEdit && (
    <div className="edit-form">
     <form className="form" onSubmit={onSubmit}>
      <div className="Input">
       <input
        type="text"
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
       <input
        type="text"
        defaultValue={value.subtitle}
        placeholder="SubTitle"
        name="SubTitle"
        required
        onChange={(event) => {
         setSubTitle(event.target.value);
        }}
       />
      </div>
      <div className="Input">
       <input
        type="text"
        placeholder="Description"
        name="Description"
        defaultValue={value.description}
        onChange={(event) => {
         setDescription(event.target.value);
        }}
        required
       />
      </div>
      {value.videoLink1 && (
       <div className="Input">
        <label>video link 1</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         pattern="https://.*"
         defaultValue={value.videoLink1}
         onChange={(event) => {
          setVideoLink1(event.target.value);
         }}
        />
       </div>
      )}

      {value.videoLink2 && (
       <div className="Input">
        <label>video link 2</label>
        <input
         type="url"
         id="link"
         name="link"
         defaultValue={value.videoLink2}
         placeholder="https://example.com"
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink2(event.target.value);
         }}
        />
       </div>
      )}

      {value.videoLink3 && (
       <div className="Input">
        <label>video link 3</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         defaultValue={value.videoLink3}
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink3(event.target.value);
         }}
        />
       </div>
      )}

      {value.videoLink4 && (
       <div className="Input">
        <label>video link 4</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         defaultValue={value.videoLink4}
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink4(event.target.value);
         }}
        />
       </div>
      )}
      {value.date && (
       <div className="Input">
        <input
         type="text"
         placeholder="Date"
         name="Date"
         defaultValue={value.date}
         onChange={(event) => {
          setDate(event.target.value);
         }}
         required
        />
       </div>
      )}

      <div className="Input">
       <input
        type="file"
        id="image"
        multiple
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

   <div data-aos="fade-up" className="event-card">
    {/* <Slider
     style={{
      display: `${currentLocation === "/Events" ? "none" : "block"}`,
     }}
     className="singleImageDash"
     {...settings}
    >
     {value?.images.map((image) => (
      <div className="image" key={image}>
       <img
        style={{
         display: `${currentLocation === "/Events" ? "none" : "block"}`,
        }}
        src={image.url}
        alt="Carousel image"
       />
      </div>
     ))}
    </Slider>     */}
    <div className="overlay">
     <img
      style={{
       display: `${currentLocation === "/EventsDash" ? "none" : "block"}`,
      }}
      src={src}
      alt="image"
     ></img>
    </div>
    <h2>{value.title}</h2>
    <p>{value.subtitle}</p>
    <p
     className="description"
     style={{
      display: `${currentLocation === "/Events" ? "none" : "block"}`,
     }}
    >
     {value.description}
    </p>
    {value.videoLink1 ? (
     <p
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
     >
      {" "}
      Session one:{" "}
      <a
       href={value.videoLink1}
       style={{
        display: `${currentLocation === "/Events" ? "none" : "block"}`,
       }}
      >
       {value.videoLink1}
      </a>
     </p>
    ) : (
     ""
    )}
    {value.videoLink2 ? (
     <p
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
     >
      {" "}
      Session two:{" "}
      <a
       href={value.videoLink2}
       style={{
        display: `${currentLocation === "/Events" ? "none" : "block"}`,
       }}
      >
       {value.videoLink2}
      </a>
     </p>
    ) : (
     ""
    )}
    {value.videoLink3 ? (
     <p
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
     >
      {" "}
      Session three:{" "}
      <a
       href={value.videoLink3}
       style={{
        display: `${currentLocation === "/Events" ? "none" : "block"}`,
       }}
      >
       {value.videoLink3}
      </a>
     </p>
    ) : (
     ""
    )}
    {value.videoLink4 ? (
     <p
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
     >
      {" "}
      Session four:{" "}
      <a
       href={value.videoLink4}
       style={{
        display: `${currentLocation === "/Events" ? "none" : "block"}`,
       }}
      >
       {value.videoLink4}
      </a>
     </p>
    ) : (
     ""
    )}
    <p
     style={{
      display: `${currentLocation === "/Events" ? "none" : "block"}`,
     }}
    >
     Date:&nbsp;{value.date}
    </p>
    <div className="crud-buttons">
     <button
      className="read-more"
      style={{
       display: `${currentLocation === "/EventsDash" ? "none" : "block"}`,
      }}
      onClick={handleClick}
     >
      Read More
     </button>
     <button
      className="edit"
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
      onClick={() => setShowEdit(true)}
     >
      Edit
     </button>
     <button
      className="Delete"
      style={{
       display: `${currentLocation === "/Events" ? "none" : "block"}`,
      }}
      onClick={() => setShowDelete(true)}
     >
      Delete{" "}
     </button>
    </div>
   </div>
  </div>
 );
}

export default OneEvent;
