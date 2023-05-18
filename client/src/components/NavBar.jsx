import React, { useEffect } from "react";
import { useRef } from "react";
import NavDropDown from "./navDropDown";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAllSwSEvents } from "../features/SWS/swsSlice";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";

function NavBar({ style }) {
 const dispatch = useDispatch();
 const { sws } = useSelector((state) => state.sws);

 useEffect(() => {
  dispatch(getAllSwSEvents());
 }, []);

 const navRef = useRef();
 const showNavbar = () => {
  navRef.current.classList.toggle("responsive_nav");
 };
 return (
  <header style={{ ...style, height: "120px" }}>
   <img className="logo" src={logo} alt="logo"></img>

   <nav ref={navRef}>
    <a href="/">Home</a>
    <a href="/Departments">Departments</a>
    <a href="/Events">Events</a>
    <p className="navbar-dropdown">
     <label htmlFor="sws">Start-up Weekend</label>

     <select id="sws">
      <option> </option>
      {sws?.length > 0
       ? sws.map((ele, index) => {
          return <NavDropDown value={ele} key={index} />;
         })
       : ""}
     </select>
    </p>

    <button className="nav-btn nav-close-btn" onClick={showNavbar}>
     <FaTimes />
    </button>
    <a href="/ContactUs">Contact us</a>
   </nav>
   <button style={{ width: "20px" }} className="open" onClick={showNavbar}>
    <FaBars style={{ width: "50px", height: "50px" }} />
   </button>
  </header>
 );
}

export default NavBar;
