import React from "react";
import { MdArrowBackIos, MdOutlineKeyboardArrowDown } from "react-icons/md";
import ViewFile from "../../../assets/images/view-doc.svg";
import UrlLink from "../../../assets/images/link.svg";
import Employee1 from "../../../assets/images/person-1.png";
import CompanyLogo from "../../../assets/images/company-logo.png";

import "./style.css";

const index = () => {
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center my-3">
          <div className="col-6 d-flex justify-content-start align-items-center">
            <div className="back me-3">
              <MdArrowBackIos size={22} className="backIcon" />
            </div>
            <span className="employeeDetailsText">Employee Details</span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn">
              <img src={ViewFile} alt="" className="viewIcon" />
              <span className="text-color-green fw-bold">View Resume</span>
            </button>
            <button className="btn portfolio-btn">
              <img src={UrlLink} alt="" className="linkIcon" />
              <span className=" fw-bold">Portfolio</span>
            </button>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center mb-5">
          <div className="col-8 d-flex align-items-start">
            <div className="employeeImg">
              <img src={Employee1} alt="" className="empImg" />
            </div>
            <div className="employeeDetails">
              <h3>Govarthini, 24</h3>
              <p>Project Manager at The example company</p>
              <p>Chennai, India</p>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <div className="progressbar">
              <div className="progress-light-orange">
                <div className="progressContent">
                  <p>75%</p>
                </div>
              </div>
            </div>
            <div className="progressbar">
              <div className="progress-green">
                <div className="progressContent">
                  <p>85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-12">
            <h1>Current Company</h1>
          </div>
          <div className="col">
            <div className="companyLogo">
              <img src={CompanyLogo} alt="" className="logo" />
            </div>
          </div>
          <div className="col-md-10">
            <h1 className="fw-bold font-size-39">
              The Madras Branding Company
            </h1>
            <div className="fw-bold font-size-25">2022</div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
      <section className="companies-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Previous Companies</h1>
            </div>
          </div>
          <div className="row d-flex align-items-center my-3">
            <div className="col-md-2">
              <div className="companyLogo">
                <img src={CompanyLogo} alt="" className="logo" />
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="fw-bold font-size-39">
                The Madras Branding Company
              </h1>
              <div className="fw-bold font-size-25">2022</div>
            </div>
            <div className="col-md-1">
              <div className="back">
                <MdOutlineKeyboardArrowDown size={35} className="downIcon" />
              </div>
            </div>
            <div className="divider"></div>
            <div className="col-md-2">
              <div className="companyLogo">
                <img src={CompanyLogo} alt="" className="logo" />
              </div>
            </div>
            <div className="col-md-9">
              <h1 className="fw-bold font-size-39">
                The Madras Branding Company
              </h1>
              <div className="fw-bold font-size-25">2022</div>
            </div>
            <div className="col-md-1">
              <div className="back">
                <MdOutlineKeyboardArrowDown size={35} className="downIcon" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
