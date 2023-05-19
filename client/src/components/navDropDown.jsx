import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavDropDown({ value, closeMenu, setIsOpen }) {
 const navigate = useNavigate();

 useEffect(() => {}, [navigate]);

 return (
  <p
   style={{ paddingTop: "10px", paddingBottom: 0 }}
   onClick={() => {
    navigate(`/StartUpWeekend/${value._id}`);
    closeMenu();
    setIsOpen();
   }}
  >
   {value.title}
  </p>
 );
}

export default NavDropDown;
