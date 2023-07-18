import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/HeaderForSWSIII2023.png";

function UpcomingEvents() {
 const [images, setImages] = useState([]);
 let Images = [image1];
 const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
 };

 useEffect(() => {
  AOS.init();
  AOS.refresh();
  setImages(Images);
 }, []);

 return (
  <div className="upcoming-events">
   <h3 data-aos="fade-up" className="event">
    SWS-2023-III
   </h3>
   <a href="/StartUpWeekend/6491a5378dd92db897cd6d37">
    Click To Know More About <span>&nbsp;SWS 2023-III&nbsp;!</span>
   </a>
   <Slider className="singleImage" {...settings}>
    {images.map((image) => (
     <div className="image" key={image}>
      <img src={image} alt="Carousel image" />
     </div>
    ))}
   </Slider>
  </div>
 );
}

export default UpcomingEvents;
