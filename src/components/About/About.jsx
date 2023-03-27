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
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequ.
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
              <h5 className="card-title mt-3">Voluptate velit esse cillum.</h5>
              <p className="card-text text-color-light">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni.
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
              <h5 className="card-title mt-3">Voluptate velit esse cillum.</h5>
              <p className="card-text  text-color-light">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni.
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
              <h5 className="card-title mt-3">Voluptate velit esse cillum.</h5>
              <p className="card-text text-color-light">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center my-5">
        <div className="col-md-6">
          <img src={Team} alt="" />
        </div>
        <div className="col-md-6">
          <h2>About Us</h2>
          <h3 className="text-heading">
            <span className="text-color-green">voluptate velit</span> esse
            cillum auptate
          </h3>
          <p className="text-color-light">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
