import React from "react";
import BannerImage from "../../assets/images/banner.png";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="container" id="banner">
      <div className="row align-items-center d-flex">
        <div className="col-md-6 ">
          <h1 className="banner-heading">
            <span className="text-color-green">Revolutionize Your Recruitment </span>
          </h1>
          <p className="banner-text mt-3">
            Navigate the hiring process with confidence using ClearHire. Our platform offers detailed track records of potential recruits, helping you make informed decisions and hire the right candidate every time.

          </p>
          <div
            className="row justify-content-start align-items-start mt-3"
            id="banner-btn"
          >
            <div className="col-md-3 col-5">
              <a href="/#login" className="btn" id="login-btn" type="submit">
                Login
              </a>
            </div>
            <div className="col-md-3 col-5 buttonbtn">
              <Link to={"/signup-options"} className="btn" id="signup-btn">
                Signup
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="banner-image">
            <img src={BannerImage} alt="" className="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
