import React, { useState, useRef, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Result = () => {
  return <p>Your message has been sent!</p>;
};
function ContactUs() {
  //States of form values

  const form = useRef(null);
  const [name, setName] = useState("");
  const [result, showResult] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_s1bwofx",
        "template_wt7sncd",
        form.current,
        "09eGNrd_5gZl5tKEk"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setName("");
    setEmail("");
    setMessage("");
    setNumber("");
    showResult(true);
  };
  return (
    <div className="Contact-Us">
      {/* <img className="hero" src={Hero} alt=" Hero Image"></img> */}

      <h1>CONTACT US</h1>

      <div className="Contact-form">
        <div className="form-left">
          {" "}
          <p>
            {" "}
            <FaPhone style={{ fontSize: 22 }} />
            &nbsp;&nbsp;+961 1 822041
          </p>
          <p>
            {" "}
            <MdEmail style={{ fontSize: 22 }} />
            &nbsp;&nbsp;info@scmp-lb.com
          </p>
          <p>
            {" "}
            <FaMapMarkerAlt style={{ fontSize: 22 }} />
            &nbsp;&nbsp;Beirut, Bir Hassan<br></br>
            Next to the Kuwaiti Embassy<br></br>
            Gardenia Building, 4th Floor
          </p>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1656.5941129894795!2d35.49273614997609!3d33.859039684681264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1702c79cb21f%3A0x459cc940d0a40f0a!2sScientific%20Center%20for%20Manufacturing%20and%20Production!5e0!3m2!1sen!2slb!4v1681975769944!5m2!1sen!2slb"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="form-right">
          <h2>Don't Hesitate to Contact Us for any Inquires !</h2>

          <form ref={form} onSubmit={sendEmail}>
            <div className="Input">
              <input
                type="text"
                value={name}
                placeholder="Name"
                name="name"
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="Input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                name="number"
                onChange={(event) => setNumber(event.target.value)}
                required
              />
            </div>
            <div className="Input">
              <textarea
                type="text"
                value={message}
                name="message"
                placeholder="Message"
                required
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button type="submit">Send</button>
            <div className="row">{result ? <Result /> : null}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
