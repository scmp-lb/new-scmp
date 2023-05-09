import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
function NavDropDown({ value }) {
  useEffect(() => {
    console.log(value._id, "ajannaa");
  }, []);

  return (
    <div style={{ display: "block" }}>
      <Link className="drop" to={`/StartUpWeekend/${value._id}`}>
        {value.title}
      </Link>
    </div>
  );
}

export default NavDropDown;
