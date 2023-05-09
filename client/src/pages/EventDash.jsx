import React, { useEffect, useState } from "react";
import SideBar from "../components/dashSideBar";
import { useSelector, useDispatch } from "react-redux";
import Event from "../components/event";
import { addEvent, getEvents } from "../features/events/eventSlice";
function EventsDash() {
 const dispatch = useDispatch();

 /* REDUX EVENTS STATE */
 const { events } = useSelector((state) => state.events);

 /* DEFINING ALL STATES */
 const [showAdd, setShowAdd] = useState(false);
 const [title, setTitle] = useState("");
 const [subTitle, setSubTitle] = useState("");
 const [date, setDate] = useState("");
 const [videoLink1, setVideoLink1] = useState("");
 const [videoLink2, setVideoLink2] = useState("");
 const [videoLink3, setVideoLink3] = useState("");
 const [videoLink4, setVideoLink4] = useState("");
 const [images, setImages] = useState([]);
 const [description, setDescription] = useState("");

 /*GET EVENTS ON EVERY DISPATCH */
 useEffect(() => {
  dispatch(getEvents());
 }, [dispatch]);

 /* ONSUBMIT ADD FUNCTION */
 /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
 const onSubmit = (e) => {
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

  dispatch(addEvent(formData));
  setShowAdd(false);
 };

 return (
  <div>
   <div className="Dash">
    {showAdd && (
     <div className="add-form">
      <form className="form" onSubmit={onSubmit}>
       <div className="Input">
        <input
         type="text"
         placeholder="Title"
         name="Title"
         required
         onChange={(event) => {
          setTitle(event.target.value);
         }}
        />
       </div>
       <div className="Input">
        <input
         type="text"
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
         onChange={(event) => {
          setDescription(event.target.value);
         }}
         required
        />
       </div>
       <div className="Input">
        <label>video link 1</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink1(event.target.value);
         }}
        />
       </div>
       <div className="Input">
        <label>video link 2</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink2(event.target.value);
         }}
        />
       </div>
       <div className="Input">
        <label>video link 3</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink3(event.target.value);
         }}
        />
       </div>
       <div className="Input">
        <label>video link 4</label>
        <input
         type="url"
         id="link"
         name="link"
         placeholder="https://example.com"
         pattern="https://.*"
         onChange={(event) => {
          setVideoLink4(event.target.value);
         }}
        />
       </div>
       <div className="Input">
        <input
         type="text"
         placeholder="Date"
         name="Date"
         onChange={(event) => {
          setDate(event.target.value);
         }}
         required
        />
       </div>
       <div className="Input">
        <input
         type="file"
         id="image"
         multiple
         accept="image/png image/jpeg image/jpg"
         onChange={(e) => {
          const files = Array.from(e.target.files);

          setImages([]);
          files.forEach((file) => {
           const reader = new FileReader();
           reader.onload = () => {
            console.log(reader.result);
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
        <button type="submit"> Add</button>
        <button onClick={() => setShowAdd(false)}>Cancel</button>
       </div>
      </form>
     </div>
    )}
    <div className="sideBar">
     <SideBar />
    </div>

    <div className="dash">
     <h1>Events</h1>
     <button onClick={() => setShowAdd(true)} className="add-button">
      Add Event
     </button>
     <div className="event-cards">
      {events?.event?.length > 0
       ? events?.event?.map((ele, index) => {
          return (
           <Event
            className="eventDash"
            key={ele?._id}
            src={ele?.images[0]?.url}
            value={ele}
           />
          );
         })
       : ""}
     </div>
    </div>
   </div>
  </div>
 );
}

export default EventsDash;
