import React from "react";
import BannerImage from "../../assets/images/banner.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="container" id="banner">
      <div className="row align-items-center d-flex">
        <div className="col-md-6 ">
          <h1 className="banner-heading">
            Eprehenderit in{" "}
            <span className="text-color-green">voluptate velit </span>esse
            cillum auptate
          </h1>
          <p className="banner-text mt-3">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequ.
          </p>
          <div className="row justify-content-start align-items-start mt-3">
            <div className="col-md-3">
              <button className="btn" id="login-btn">
                Login
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn" id="signup-btn">
                Signup
              </button>
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
