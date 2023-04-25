import React, { useEffect, useState } from "react";
import { MdArrowBackIos, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import ViewFile from "../../../assets/images/view-doc.svg";
import UrlLink from "../../../assets/images/link.svg";
import CompanyLogo from "../../../assets/images/company-logo.png";
import ProgressBar from "../../../components/ProgressBar";
import "./EmployeeDetails.css";

import { useLocation, useNavigate } from "react-router-dom";
import { readEmployeeRatings } from "../../../DataBase/Employee/employee";

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state;
  const employee = from;
  const [employeeRatings, setEmployeeRatings] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});
  // console.log("info", from);

  const calculateRatings = (ratings) => {
    let avgCommunication = 0;
    let avgAttitude = 0;
    let avgAbilityToLearn = 0;
    let avgPunctuality = 0;
    let avgCommitment = 0;
    let avgTrustWorthiness = 0;
    let avgSkill = 0;
    let avgTeamPlayer = 0;
    let total = 0;
    let colleagueScore = 0;
    let score = 0;
    let ratingsOfEmployee = ratings.filter((rate) => {
      return rate?.ratedByRole === "Employee";
    });
    let ratingsOfEmployer = ratings.filter((rate) => {
      return rate?.ratedByRole === "Employer";
    });
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgCommunication += +element.communication;
      avgAttitude += +element.attitude;
      avgAbilityToLearn += +element.abilityToLearn;
      avgPunctuality += +element.punctuality;
      avgCommitment += +element.commitment;
      avgTrustWorthiness += +element.trustworthiness;
      avgSkill += +element.skill;
      avgTeamPlayer += +element.teamPlayer;
    }
    avgCommunication /= ratings.length;
    avgAttitude /= ratings.length;
    avgAbilityToLearn /= ratings.length;
    avgPunctuality /= ratings.length;
    avgCommitment /= ratings.length;
    avgTrustWorthiness /= ratings.length;
    avgSkill /= ratings.length;
    avgTeamPlayer /= ratings.length;
    total =
      avgCommunication +
      avgAttitude +
      avgAbilityToLearn +
      avgPunctuality +
      avgCommitment +
      avgTrustWorthiness +
      avgSkill +
      avgTeamPlayer;
    total = total / 8;

    for (let index = 0; index < ratingsOfEmployer.length; index++) {
      const element = ratingsOfEmployer[index];
      let temp =
        +element.communication +
        +element.attitude +
        +element.abilityToLearn +
        +element.punctuality +
        +element.commitment +
        +element.trustworthiness +
        +element.skill +
        +element.teamPlayer;
      temp /= 8;
      score += temp;
    }
    for (let index = 0; index < ratingsOfEmployee.length; index++) {
      const element = ratingsOfEmployee[index];
      let temp =
        +element.communication +
        +element.attitude +
        +element.abilityToLearn +
        +element.punctuality +
        +element.commitment +
        +element.trustworthiness +
        +element.skill +
        +element.teamPlayer;
      temp /= 8;
      colleagueScore += temp;
    }
    score /= ratingsOfEmployer.length;
    colleagueScore /= ratingsOfEmployee.length;
    setAvgRatings({
      avgCommunication: Math.ceil(avgCommunication),
      avgAttitude: Math.ceil(avgAttitude),
      avgAbilityToLearn: Math.ceil(avgAbilityToLearn),
      avgPunctuality: Math.ceil(avgPunctuality),
      avgCommitment: Math.ceil(avgCommitment),
      avgTrustWorthiness: Math.ceil(avgTrustWorthiness),
      avgSkill: Math.ceil(avgSkill),
      avgTeamPlayer: Math.ceil(avgTeamPlayer),
      total: Math.ceil(total),
      score: Math.ceil(score),
      colleagueScore: Math.ceil(colleagueScore),
    });
  };

  useEffect(() => {
    const fetchOfferDetails = async () => {
      const data2 = await readEmployeeRatings(employee.id);
      calculateRatings(data2);
      setEmployeeRatings(data2);
    };
    fetchOfferDetails();
  }, [employee.id]);

  function text(percentage) {
    if (percentage < 10) {
      return "Worst";
    } else if (percentage >= 10 && percentage < 30) {
      return "Poor";
    } else if (percentage >= 30 && percentage < 55) {
      return "Good";
    } else if (percentage >= 55 && percentage < 80) {
      return "Very Good";
    } else {
      return "Great";
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="row d-flex justify-content-between align-items-center my-3">
          <div className="col-6 d-flex justify-content-start align-items-center">
            <div
              className="back me-3"
              onClick={() => {
                navigate("/");
              }}
            >
              <MdArrowBackIos size={22} className="backIcon" />
            </div>
            <span className="employeeDetailsText">Employee Details</span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn">
              <img src={ViewFile} alt="" className="viewIcon" />
              <a
                className="text-color-green fw-bold"
                href={employee.resume}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                View Resume
              </a>
            </button>
            <a
              className="btn portfolio-btn"
              href={`https://${employee.portfolioLink}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={UrlLink} alt="" className="linkIcon" />
              <span className=" fw-bold">Portfolio</span>
            </a>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center mb-5">
          <div className="col-8 d-flex align-items-start">
            <div className="employeeImg">
              <img src={employee?.profileImage} alt="" className="empImg" />
            </div>
            <div className="employeeDetails">
              <h3>{employee?.employeeName}</h3>
              <p>
                {employee?.designation + " at The " + employee?.companyName}
              </p>
              <p>
                {employee?.employeeState + ", " + employee?.employeeCountry}
              </p>
            </div>
          </div>

          <div className="col-4 d-flex justify-content-center align-items-center empDetailsProgress">
            <div class="circle-wrap">
              {avgRatings?.colleagueScore > 0 ? (
                <>
                  <ProgressBar
                    value={avgRatings?.colleagueScore || 0}
                    color={"#D50000"}
                  />
                  <p>Colleague Score</p>
                </>
              ) : (
                <p className="fw-bold">N/A</p>
              )}
            </div>
            <div class="circle-wrap">
              {avgRatings?.score > 0 ? (
                <>
                  <ProgressBar value={avgRatings?.score || 0} />
                  <p>Score</p>
                </>
              ) : (
                <p className="fw-bold">N/A</p>
              )}
            </div>
          </div>
        </div>

        {/* skills section  starts */}
        <div className="d-flex justify-content-center align-items-center skillsContainer">
          {/*
            <div className="arrowLeft" >
              <LeftOutlined
                style={{
                  fontSize: "22px",
                  color: "#8E8E8E",
                }}
              />
              </div>
            */}

          <div className="inside-skills">
            {employee?.skills?.map((skill) => {
              return (
                <div className="skills">
                  <p className="title">{skill.skillName}</p>
                  <ProgressBar value={skill.value} />
                </div>
              );
            })}
          </div>

          {/*
            <div className="arrowRight">
              <RightOutlined
                style={{
                  fontSize: "22px",
                  color: "#8E8E8E",
                }}
              />
            </div>
            */}
        </div>
        {/* skills section ends */}

        <div className="row d-flex align-items-center">
          <div className="col-12">
            <h1>Current Company</h1>
          </div>
          <div className="col">
            <div className="companyLogo">
              <img src={employee?.companyLogo} alt="logo" className="logo" />
            </div>
          </div>
          <div className="col-md-10">
            <h1 className="fw-bold font-size-39">{employee?.companyName}</h1>
            <div className="fw-bold font-size-25">2022</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row d-flex justify-content-center align-items-center progressBars">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgCommunication && (
                    <ProgressBar value={avgRatings.avgCommunication || 0} />
                  )}
                </div>
                <p>Communitcation</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgAttitude && (
                    <ProgressBar value={avgRatings.avgAttitude || 0} />
                  )}
                </div>
                <p>Attitude</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgAbilityToLearn && (
                    <ProgressBar value={avgRatings.avgAbilityToLearn || 0} />
                  )}
                </div>
                <p>Ability To Learn</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgPunctuality && (
                    <ProgressBar value={avgRatings.avgPunctuality || 0} />
                  )}
                </div>
                <p>Punctuality</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgCommitment && (
                    <ProgressBar value={avgRatings.avgCommitment || 0} />
                  )}
                </div>
                <p>Commitment</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgTrustWorthiness && (
                    <ProgressBar value={avgRatings.avgTrustWorthiness || 0} />
                  )}
                </div>
                <p>Trustworthiness</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgSkill && (
                    <ProgressBar value={avgRatings.avgSkill || 0} />
                  )}
                </div>
                <p>Skill</p>
              </div>
              <div className="col-md-3 mb-3">
                <div class="circle-wrap">
                  {avgRatings.avgTeamPlayer && (
                    <ProgressBar value={avgRatings.avgTeamPlayer || 0} />
                  )}
                </div>
                <p>Team Player</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 align-items-center d-flex flex-column">
            <p className="mb-0">Total</p>

            <div class="circle-wrap">
              {avgRatings.total && (
                <ProgressBar value={avgRatings.total || 0} />
              )}
            </div>
          </div>
        </div>
        <div className="row employerResult">
          <div>
            <p>
              <FaQuoteLeft size={30} className="quoteLeft" />
              This employee is marked as a{" "}
              <span className="text-color-green">
                {text(avgRatings?.total)} employee{" "}
              </span>{" "}
              by <strong>The Madras Branding Company</strong>
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
