import React from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="info">
          {" "}
          <p>
            {" "}
            <FaPhone />
            &nbsp;&nbsp;&nbsp;&nbsp; +961 1 822041
          </p>
          <p>
            {" "}
            <MdEmail size={20} />
            &nbsp;&nbsp;&nbsp;&nbsp;info@scmp-lb.com
          </p>
          <p>
            {" "}
            <FaMapMarkerAlt />
            &nbsp;&nbsp;&nbsp;&nbsp;Beirut, Bir Hassan
          </p>
        </div>
        <div className="links">
          <p>
            {" "}
            <Link to="/">Home</Link>
          </p>
          <p>
            {" "}
            <Link to="/Departments">Departments</Link>
          </p>
          <p>
            {" "}
            <Link to="/Events">Events</Link>
          </p>

          <p>
            {" "}
            <Link to="/ContactUs">Contact Us</Link>
          </p>
        </div>
        <div className="social">
          <p>
            <a
              target="_blank"
              href="https://instagram.com/scmplb?igshid=ZWIzMWE5ZmU3Zg=="
            >
              {" "}
              <FaInstagram />
            </a>
          </p>
          <p>
            <a target="_blank" href="https://www.facebook.com/scmplb">
              {" "}
              <FaFacebook />
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/scmp-lb/mycompany/"
            >
              {" "}
              <FaLinkedin />
            </a>
          </p>
          <p>
            <a target="_blank" href="https://www.youtube.com/@scmpsws1051">
              {" "}
              <FaYoutube />
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023-SCMP All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
