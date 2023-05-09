import React, { useState, useLayoutEffect, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import { getSwsEventById } from "../features/OneSWS/oneSWSSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "../assets/images/sponsor.webp";
import image1 from "../assets/images/5.webp";
import image2 from "../assets/images/6.webp";
import image3 from "../assets/images/8.webp";
import { useLocation } from "react-router-dom";

const Images = [image1, image2, image3];
function StartUpWeekend() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  const { oneSWS } = useSelector((state) => state.oneSWS);
  const params = useParams();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    dispatch(getSwsEventById(params.id));
  }, [params.id]);

  return (
    <div className="start-Up">
      <h1>{oneSWS?.sws?.title}</h1>

      <div className="container">
        <h2 style={{ whiteSpace: "pre-line" }} className="tit">
          {oneSWS?.sws?.title}
        </h2>

        <p style={{ whiteSpace: "pre-line" }} className="par">
          {oneSWS?.sws?.subTitle}
        </p>

        <p style={{ whiteSpace: "pre-line" }} className="par">
          {oneSWS?.sws?.Description}
        </p>
        {oneSWS?.sws?.linkDesc && (
          <p>
            {oneSWS.sws.linkDesc}{" "}
            <span>
              {" "}
              {oneSWS?.sws?.link && (
                <a target="_blank" href={oneSWS.sws.link}>
                  &nbsp; Link
                </a>
              )}
            </span>
          </p>
        )}

        <div>
          <Slider className="slider" {...settings}>
            {oneSWS?.sws?.images?.length > 0 &&
              oneSWS?.sws?.images?.map((image) => (
                <div className="image">
                  <img src={image?.url} key={image} alt="Carousel image" />
                </div>
              ))}
          </Slider>
        </div>
        {oneSWS?.sws?.winnerProjectTitle && (
          <div>
            <h2 className="tit">
              Winner Project:&nbsp;&nbsp;
              <p>{oneSWS?.sws?.winnerProjectTitle}</p>
            </h2>
            <p style={{ whiteSpace: "pre-line" }} className="par">
              {" "}
              {oneSWS?.sws?.winnerProjectDesc}
            </p>
          </div>
        )}
        {oneSWS?.sws?.Projects && (
          <div>
            <h2 className="tit">ALL PROJECTS</h2>
            <p style={{ whiteSpace: "pre-line" }} className="Projects">
              {oneSWS?.sws?.Projects}
            </p>
          </div>
        )}

        <img className="sponsored" src={image4} alt=" Hero Image"></img>
      </div>
    </div>
  );
}
export default StartUpWeekend;
