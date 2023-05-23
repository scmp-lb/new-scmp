import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLaptopCode } from "react-icons/fa";
import { AiOutlineBulb } from "react-icons/ai";
import UPCOMING from "../components/upcomingEvents";
import { MdExplore } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import Image from "../assets/images/scmp.png";
import { useLocation } from "react-router-dom";

// LOGOS IMPORTS
import scmpLogo from "../assets/scmp-logo.png";
import luLogo from "../assets/lu-logo.png";
import aufLogo from "../assets/auf-logo.png";
import swsLogo from "../assets/sws-logo.png";
import ccitLogo from "../assets/ccit-logo.png";

function Home() {
 const { pathname } = useLocation();

 const [innerWidth, setInnerWidth] = useState(window.innerWidth);

 useEffect(() => {
  window.scrollTo(0, 0);
 }, [pathname]);

 useEffect(() => {
  AOS.init();
  AOS.refresh();

  //HANDLE IMAGE RESPONSIVNESS
  const handleWindowResize = () => {
   setInnerWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleWindowResize);

  return () => {
   window.removeEventListener("resize", handleWindowResize);
  };
 }, []);

 return (
  <div className="Home-page">
   <div style={{ paddingTop: "10rem" }}>
    <div
     style={{
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
     }}
    >
     <h3
      style={{
       width: `${innerWidth > 1200 ? "50%" : "80%"}`,
       textAlign: "center",
       lineHeight: "5rem",
       fontSize: `${innerWidth > 1200 ? "1.8rem" : "3.5rem"}`,
       fontWeight: "300",
      }}
     >
      <span style={{ fontWeight: "900" }}>
       SWS 2023-II دعوة لحضور المعرض الثالث لدعم الأفكار{" "}
      </span>{" "}
      <br />
      برعاية غرفة التجارة والصناعة والزراعة في طرابلس وشمال لبنان
      <br />
      وبالتعاون مع الجامعة اللبنانية والوكالة الجامعية الفرنكوفونية
      <br />
      يتشرف المركز العلمي للتصنيع والإنتاج بدعوتكم لحضور
      <br />
      معرضه الثالث الذي سيعقد في غرفة التجارة والصناعة والزراعة في طرابلس
      <br />
      نهار السبت 27 ايار 2023 الساعة 10:00 صباحًا
      <br />
      <span style={{ fontWeight: "900" }}>حضوركم يشرفنا</span>
     </h3>
     <h3
      style={{
       display: "block",
       padding: "5rem 0 5rem 0",
       fontSize: "3rem",
       color: "#ff9900",
      }}
     >
      <a
       style={{ color: "#ff9900", cursor: "pointer", width: "fit-content" }}
       target="_blank"
       href="https://drive.google.com/file/d/1rlkTZ_fFI4oT9ZGq-MLvsvNWQwGORClM/view?usp=sharing"
      >
       برنامج الاحتفال
      </a>
     </h3>
     <div
      style={{
       display: "flex",
       flexDirection: `${innerWidth > 1200 ? "row" : "column"}`,
       alignItems: "center",
       justifyContent: "space-between",
       width: "100%",
       padding: "0 10rem",
       gap: `${innerWidth > 1200 ? "0" : "5rem"}`,
      }}
     >
      <img width={"275px"} src={swsLogo} />
      <img width={"200px"} src={scmpLogo} />
      <img width={"225px"} src={ccitLogo} />
      <img width={"200px"} src={luLogo} />
      <img width={"475px"} src={aufLogo} />
     </div>
    </div>
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
      <img src={Image} />
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
       <FaLaptopCode />
      </div>
      <h3>Technology</h3>
     </div>
     <div className="card">
      <div className="icon">
       <MdExplore />
      </div>
      <h3>Research</h3>
     </div>
     <div className="card">
      <div className="icon">
       <IoIosCash />
      </div>
      <h3>Investment Funding</h3>
     </div>
     <div className="card">
      <div className="icon">
       <AiOutlineBulb />
      </div>
      <h3>Incubate Ideas</h3>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Home;
