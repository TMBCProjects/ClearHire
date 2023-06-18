import React from "react";
import "./About.css";
import SearchIcon from "../../assets/images/search-icon.svg";
import ChatIcon from "../../assets/images/chat-icon.svg";
import WorkIcon from "../../assets/images/work-icon.svg";
import Team from "../../assets/images/team.png";

const About = () => {
  return (
    <div className="container" id="about">
      <h2 className="heading mb-3">About Us</h2>
      <div className="row d-flex justify-between align-items-start">
        <div className="col-md-6">
          <h3 className="text-heading">
            <span className="text-color-green">voluptate velit</span> esse
            cillum auptate
          </h3>
        </div>
        <div className="col-md-6">
          <p className="about-text text-color-light">
            ClearHire is revolutionizing the hiring landscape by digitizing the preliminary
            employee check process. We're committed to empowering employers with insightful,
            reliable reviews and career histories, ensuring you make the best hiring decisions.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-icon">
              <img src={SearchIcon} alt="" className="img-icon" />
            </div>{" "}
            <div className="card-heading">
              <h5 className="card-title mt-3">Digital Employee Reviews</h5>
              <p className="card-text text-color-light">
                Benefit from the convenience of digital employee reviews. Our platform
                offers comprehensive feedback on potential hires, providing valuable insights
                to guide your recruitment decisions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-icon">
              <img src={ChatIcon} alt="" className="img-icon" />
            </div>{" "}
            <div className="card-heading">
              <h5 className="card-title mt-3">Career Track Records</h5>
              <p className="card-text text-color-light">
                Dive into digital records of career histories. ClearHire provides a seamless
                experience to explore an applicant's professional journey, assisting you to
                strategize your hiring process.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-icon">
              <img src={WorkIcon} alt="" className="img-icon" />
            </div>
            <div className="card-heading">
              <h5 className="card-title mt-3">Simplified Preliminary Checks</h5>
              <p className="card-text text-color-light">
                Say goodbye to tedious paperwork. ClearHire digitizes and simplifies
                the preliminary employee check, helping you to save time and focus on
                selecting the ideal candidate.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center my-5">
        <div className="col-md-6">
          <img src={Team} alt="" className="team-img" />
        </div>
        <div className="col-md-6 about-team">
          <h2>About Us</h2>
          <h3 className="text-heading">
            <span className="text-color-green">voluptate velit</span> esse
            cillum auptate
          </h3>
          <p className="text-color-light">
            At ClearHire, we're changing the face of recruitment by digitizing and simplifying
            the preliminary employee check process. Our goal is to make your hiring decisions
            easier and more strategic. Be part of the digital hiring revolution with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
