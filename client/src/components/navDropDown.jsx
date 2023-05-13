import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavDropDown({ value }) {
  const navigate = useNavigate();

  useEffect(()=>{},[navigate])

  return (
    <option style={{ display: "block", color:"white" }} onClick={()=>navigate(`/StartUpWeekend/${value._id}`)}>
      {value.title}
    </option>
  );
}

export default NavDropDown;
