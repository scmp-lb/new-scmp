import React, { useEffect, useState } from "react";
import { useRef } from "react";
import NavDropDown from "./navDropDown";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAllSwSEvents } from "../features/SWS/swsSlice";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";

function NavBar({ style }) {
 const dispatch = useDispatch();
 const { sws } = useSelector((state) => state.sws);
 const [isOpen, setIsOpen] = useState(false);
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
    <div className="navbar-dropdown">
     <h1 style={{ fontSize: "44px" }} onClick={() => setIsOpen(!isOpen)}>
      Start-up Weekend
     </h1>
     {isOpen && (
      <div id="sws">
       {sws?.length > 0
        ? sws.map((ele, index) => {
           return (
            <NavDropDown
             value={ele}
             key={index}
             closeMenu={showNavbar}
             setIsOpen={() => setIsOpen(false)}
            />
           );
          })
        : ""}
      </div>
     )}
    </div>

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
