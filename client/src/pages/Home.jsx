import React, { useEffect } from "react";
import Hero from "../assets/imagescmp.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLaptopCode } from "react-icons/fa";
import { AiOutlineBulb } from "react-icons/ai";
import UPCOMING from "../components/upcomingEvents";
import { MdExplore } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import Image from "../assets/images/scmp.png";
import { useLocation } from "react-router-dom";

function Home() {
 const { pathname } = useLocation();

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [pathname]);

 useEffect(() => {
  AOS.init();
  AOS.refresh();
 }, []);
 return (
  <div className="Home-page">
   <div className="hero-section">
    <img className="hero" src={Hero} alt="Hero Image"></img>

    <h1>
     SCIENTIFIC CENTER FOR<br></br> MANUFACTURING AND PRODUCTION
    </h1>
   </div>

   <div className="upcoming-events">
    <h2 style={{ opacity: "0.9" }} data-aos="fade-up">
     RECENT <span>EVENTS</span>
    </h2>

    <UPCOMING />
   </div>
   <div className="about-us">
    <h2 style={{ opacity: "0.9" }} data-aos="fade-up">
     ABOUT <span>US</span>
    </h2>

    <div className="About-us-cont">
     <div className="About-us-image">
      <img src={Image}></img>
     </div>
     <div className="About-us-text">
      <h3 style={{ marginBottom: 10 }}>
       SCIENTIFIC CENTER FOR &nbsp;<span>MANUFACTURING&nbsp;</span> AND&nbsp;{" "}
       <span>PRODUCTION</span>
      </h3>
      <p>
       SCMP works on studying needs as inputs, prioritizing them, and working
       within a specific time plan to produce studies and spatial planning which
       includes three items: standing situation, desired situation, and the
       proposed roadmap. Three types of outputs emerge from this spatial
       planning. First, the feasibility studies that turn into productive
       projects based on the partnership of three parties (the local capital,
       the center that provides all the required scientific services, the source
       of technology). Second, investment priorities according to which SCMP
       will enlarge existing small businesses. Last, new innovative ideas that
       are being used in a scientific, technical and financial greenhouse
       towards emerging companies.
      </p>
     </div>
    </div>
   </div>
   <div className="Offer-container">
    <div className="Offer">
     <h2 style={{ opacity: "0.9" }} data-aos="fade-up">
      WHAT WE <span>OFFER</span>
     </h2>
    </div>
    <div className="card-container">
     <div className="card">
      <div className="icon">
       {" "}
       <FaLaptopCode />
      </div>{" "}
      <h3>Technology</h3>
     </div>
     <div className="card">
      <div className="icon">
       {" "}
       <MdExplore />
      </div>{" "}
      <h3>Research</h3>
     </div>
     <div className="card">
      <div className="icon">
       {" "}
       <IoIosCash />
      </div>{" "}
      <h3>Investment Funding</h3>
     </div>
     <div className="card">
      <div className="icon">
       {" "}
       <AiOutlineBulb />
      </div>{" "}
      <h3>Incubate Ideas</h3>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Home;
