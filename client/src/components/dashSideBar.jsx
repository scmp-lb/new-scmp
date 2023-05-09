import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { ProtectedRoute } from "./protectedRoute";

function DashSideBar() {
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    localStorage.removeItem("tokenjjjjhjdgdjfgg");
    window.location.reload(true);
  };

  return (
    <div>
      <ul className="menu">
        <img src={logo} width={100} height={100}></img>
        <h3>DASHBOARD</h3>

        <li className="menu__item">
          <Link to="/EventsDash">Events</Link>
        </li>
        <li className="menu__item">
          <Link to="/DepartmentDash">Departments</Link>
        </li>
        <li className="menu__item">
          <Link to="/SWSDash">SWS</Link>
        </li>
        <button className="Logout" onClick={handleLogout}>
          Logout
        </button>
      </ul>
    </div>
  );
}

export default DashSideBar;
