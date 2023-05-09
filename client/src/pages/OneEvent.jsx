import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { BiArrowBack } from "react-icons/bi";
import { useParams, useLocation } from "react-router-dom";
import { getEventById } from "../features/oneEvent/oneEventSlice";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick-theme.css";

function OneEvent() {
  const { event } = useSelector((state) => state.event);
  const params = useParams();
  const dispatch = useDispatch();
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    prevArrow: <div />,
    nextArrow: <div />,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    dispatch(getEventById(params.id));
    console.log(params.id);
    console.log(event);
  }, [params.id]);

  return (
    <div className="Spec-Event">
      <a className="back" href="/Events">
        <BiArrowBack /> Back
      </a>
      <div className="One-Event">
        <Slider className="singleImage" {...settings}>
          {event?.images?.map((image) => (
            <div className="image" key={image}>
              <img src={image.url} alt="Carousel image" />
            </div>
          ))}
        </Slider>
        <div className="event-text">
          {" "}
          <h1>{event.title}</h1>
          <h2>&nbsp;{event.date}</h2>
          <p style={{ whiteSpace: "pre-line" }} className="desc">
            {event.description}
          </p>
          {event.videoLink1 && (
            <p>
              session one: &nbsp;&nbsp;
              <a href={event.videoLink1}>{event.videoLink1}</a>
            </p>
          )}
          {event.videoLink2 && (
            <p>
              session two: &nbsp;&nbsp;
              <a href={event.videoLink1}>{event.videoLink1}</a>
            </p>
          )}
          {event.videoLink3 && (
            <p>
              session three: &nbsp;&nbsp;
              <a href={event.videoLink1}>{event.videoLink1}</a>
            </p>
          )}
          {event.videoLink4 && (
            <p>
              session four: &nbsp;&nbsp;
              <a href={event.videoLink1}>{event.videoLink1}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneEvent;
