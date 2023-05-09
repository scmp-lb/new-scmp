import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSwSEvents } from "../features/SWS/swsSlice";
import NavDropDown from "./navDropDown";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/images/logo.png";

function Nav({ style }) {
 const dispatch = useDispatch();
 const { sws } = useSelector((state) => state.sws);

 useEffect(() => {
  dispatch(getAllSwSEvents());
 }, []);

 return (
  <div style={style} className="Nav-Bar">
   <div>
    <li>
     <img src={logo} alt="logo"></img>
    </li>
   </div>
   <div className="menu-icon">
    <span className="menu-icon__line"></span>
    <span className="menu-icon__line"></span>
    <span className="menu-icon__line"></span>
   </div>
   <ul className="Nav-list">
    <li>
     <Link to="/">Home</Link>
    </li>
    <li>
     <Link to="/Departments">Departments</Link>
    </li>
    <li>
     <Link to="/Events">Events</Link>
    </li>
    <li className="navbar-dropdown">
     <Link to="#">Start-up Weekend</Link>
     <div className="dropdown">
      {sws.length > 0
       ? sws.map((ele, index) => {
          return <NavDropDown value={ele} key={index} />;
         })
       : ""}
     </div>
    </li>
    <li>
     <Link to="/ContactUs">Contact Us</Link>
    </li>
   </ul>
  </div>
 );
}

export default Nav;
