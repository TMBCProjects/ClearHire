import React from "react";
import BannerImage from "../../assets/images/banner.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="container" id="banner">
      <div className="row">
        <div className="col-md-6 align-items-center justify-content-center d-flex flex-column">
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
        </div>
        <div className="col-md-6">
          <div className="banner-image">
            <img src={BannerImage} alt="" width={520} height={586} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
