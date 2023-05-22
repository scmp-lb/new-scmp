import React, { useEffect, useState } from "react";
import OneEvent from "../components/event";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../features/events/eventSlice";
import { useLocation } from "react-router-dom";
import Loader from "../components/loader";

function Event() {
 const dispatch = useDispatch();
 const { events, isLoading } = useSelector((state) => state.events);

 const { pathname } = useLocation();

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [pathname]);

 useEffect(() => {
  dispatch(getEvents());
 }, [dispatch]);

 return (
  <>
   {isLoading ? (
    <div
     style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "100vh",
     }}
    >
     <Loader />
    </div>
   ) : (
    <div className="Events">
     {/* <img className="hero" src={Hero} alt=" Hero Image"></img> */}
     <h1 className="test">EVENTS</h1>
     <div className="event-cards">
      {Object.keys(events).length > 0
       ? events?.event?.map((ele, index) => {
          return (
           <div key={ele._id}>
            <OneEvent
             className="oneEvent"
             src={ele?.images[0]?.url}
             value={ele}
             key={ele._id}
            />
           </div>
          );
         })
       : ""}
     </div>
    </div>
   )}
  </>
 );
}
export default Event;
