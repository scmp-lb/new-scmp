import SideBar from "../components/dashSideBar";
import { useSelector, useDispatch } from "react-redux";
import { addSWSEvent, getAllSwSEvents } from "../features/SWS/swsSlice";
import SWSCard from "../components/swsCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SWSDash() {
 const dispatch = useDispatch();

 /* REDUX SWS EVENTS STATE */
 const { sws } = useSelector((state) => state.sws);

 /* DEFINING ALL STATES */
 const [showAdd, setShowAdd] = useState(false);
 const [title, setTitle] = useState("");
 const [link, setLink] = useState("");
 const [linkDesc, setLinkDesc] = useState("");
 const [subTitle, setSubTitle] = useState("");
 const [images, setImages] = useState([]);
 const [FinalProjects, setFinalProjects] = useState("");
 const [SemiFinalProjects, setSemiFinalProjects] = useState("");
 const [sponserImage, setSponserImage] = useState("");
 const [description, setDescription] = useState("");
 const [winnerProjectTitle, setWinnerProjectTitle] = useState("");
 const [winnerProjectDesc, setWinnerProjectDesc] = useState("");

 useEffect(() => {
  dispatch(getAllSwSEvents());
 }, [dispatch]);

 /* ONSUBMIT ADD FUNCTION */
 /* SETTING ALL VALUES IN THE FORMDATA OBJECT */
 const onSubmit = async (e) => {
  e.preventDefault();
  var formData = new FormData();
  formData.set("Description", description);
  formData.set("title", title);
  formData.set("subTitle", subTitle);
  formData.set("FinalProjects", FinalProjects);
  formData.set("SemiFinalProjects", SemiFinalProjects);
  formData.set("link", link);
  formData.set("linkDesc", linkDesc);
  formData.set("sponserImage", sponserImage);
  formData.set("winnerProjectTitle", winnerProjectTitle);
  formData.set("winnerProjectDesc", winnerProjectDesc);
  images.forEach((image) => {
   formData.append("images", image);
  });

  dispatch(addSWSEvent(formData));
  setShowAdd(false);
 };

 const { pathname } = useLocation();

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [pathname]);

 return (
  <div className="Dash">
   <div className="overlay" />
   {showAdd && (
    <div className="add-form">
     <form className="form" onSubmit={onSubmit}>
      <div className="Input">
       <input
        type="text"
        placeholder="Title"
        name="Title"
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
           if (reader.readyState === 2) {
            setImages((oldArray) => [...oldArray, reader.result]);
           }
          };
          reader.readAsDataURL(file);
         });
        }}
       />
       <h5>Winner Project:</h5>
       <input
        type="text"
        value={winnerProjectTitle}
        onChange={(event) => {
         setWinnerProjectTitle(event.target.value);
        }}
        placeholder="Winner Project Title"
       />
       <input
        type="text"
        value={winnerProjectDesc}
        onChange={(event) => {
         setWinnerProjectDesc(event.target.value);
        }}
        placeholder="Winner Project Description"
       />
       <div>
        <input
         type="text"
         value={linkDesc}
         onChange={(event) => {
          setLinkDesc(event.target.value);
         }}
         placeholder="link description"
        />
       </div>
       <div>
        <input
         type="text"
         value={link}
         onChange={(event) => {
          setLink(event.target.value);
         }}
         placeholder="any link"
        />
       </div>

       <div>
        <textarea
         type="text"
         value={SemiFinalProjects}
         style={{ height: "100px" }}
         onChange={(event) => {
          setSemiFinalProjects(event.target.value);
         }}
         placeholder="Semi final SWS Projects"
        ></textarea>
       </div>

       <div>
        <textarea
         type="text"
         value={FinalProjects}
         style={{ height: "100px" }}
         onChange={(event) => {
          setFinalProjects(event.target.value);
         }}
         placeholder="Semi final SWS Projects"
        ></textarea>
       </div>
       <div className="Input">
        <input
         type="file"
         id="image"
         onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () => {
           if (reader.readyState === 2) {
            setSponserImage(reader.result);
           }
          };

          reader.onerror = (err) => console.log(err);
          reader.readAsDataURL(e.target.files[0]);
         }}
        />
       </div>
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
    <h1>SWS Events</h1>
    <button
     onClick={() => {
      setShowAdd(true);
     }}
     className="add-button"
    >
     Add SWS Event
    </button>
    <div className="event-cards">
     {sws?.length > 0
      ? sws?.map((ele) => {
         return <SWSCard key={ele._id} value={ele} />;
        })
      : ""}
    </div>
   </div>
  </div>
 );
}

export default SWSDash;
