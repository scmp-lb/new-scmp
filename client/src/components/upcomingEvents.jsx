import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/5.webp";
import image2 from "../assets/images/6.webp";
import image3 from "../assets/images/8.webp";

function UpcomingEvents() {
  const [images, setImages] = useState([]);
  let Images = [image1, image2, image3];
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
      <h4 data-aos="fade-up" className="event">
        SWS-2023-I
      </h4>
      <a href="/StartUpWeekend/6440e841ee8f22d2bb41ae79">
        Click To Know More About <span>&nbsp;SWS 2023&nbsp;!</span>
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
