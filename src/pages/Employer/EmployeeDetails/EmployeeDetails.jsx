import React, { useEffect, useState } from "react";
import { MdArrowBackIos, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import ViewFile from "../../../assets/images/view-doc.svg";
import UrlLink from "../../../assets/images/link.svg";
import Employee1 from "../../../assets/images/person-1.png";
import CompanyLogo from "../../../assets/images/company-logo.png";
import ProgressBar from "../../../components/ProgressBar";
import "./EmployeeDetails.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const EmployeeDetails = () => {
  const location = useLocation();
  const { from } = location.state;
  const employeeId = from;
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState([]);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      // const data = await readEmployee(employeeId);
      // const data2 = await readEmployeeRatings(employeeId);
      // setEmployeeDetail(data);
      // setEmployeeRatings(data2)
    };
    fetchOfferDetails();
  }, []);
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

          <div className="col-4 d-flex justify-content-center align-items-center empDetailsProgress">
            <div class="circle-wrap">
              <ProgressBar value={75} />
            </div>
            <div class="circle-wrap">
              <ProgressBar value={50} />
            </div>
          </div>
        </div>

        {/* skills section  starts */}
        <div className="d-flex justify-content-center align-items-center skillsContainer">
          <div className="arrowLeft">
            <LeftOutlined
              style={{
                fontSize: "22px",
                color: "#8E8E8E",
              }}
            />
          </div>
          <div className="skills">
            <p className="title">Photoshop</p>
            <ProgressBar value={75} />
          </div>
          <div className="skills">
            <p className="title">Illustrator</p>
            <ProgressBar value={75} />
          </div>
          <div className="skills">
            <p className="title">Premiere Pro</p>
            <ProgressBar value={75} />
          </div>
          <div className="skills">
            <p className="title">After Effects</p>
            <ProgressBar value={75} />
          </div>
          <div className="skills">
            <p className="title">Photoshop</p>
            <ProgressBar value={75} />
          </div>
          <div className="arrowRight">
            <RightOutlined
              style={{
                fontSize: "22px",
                color: "#8E8E8E",
              }}
            />
          </div>
        </div>
        {/* skills section ends */}

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
        <div className="row d-flex justify-content-center align-items-center progressBars">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Communitcation</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Attitude</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Ability To Learn</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Punctuality</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Commitment</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Trustworthiness</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Skill</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  <ProgressBar value={75} />
                </div>
                <p>Team Player</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 align-items-center d-flex flex-column">
            <p className="mb-0">Total</p>

            <div class="circle-wrap">
              <ProgressBar value={75} />
            </div>
          </div>
        </div>
        <div className="row employerResult">
          <div>
            <p>
              <FaQuoteLeft size={30} className="quoteLeft" />
              This employee is marked as a{" "}
              <span className="text-color-green">good employee </span> by{" "}
              <strong>The Madras Branding Company</strong>
            </p>
          </div>
        </div>
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
            <div className="divider my-3"></div>
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

export default EmployeeDetails;
