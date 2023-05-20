import React, { useEffect, useState } from "react";
import { MdArrowBackIos, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import ViewFile from "../../../assets/images/view-doc.svg";
import UrlLink from "../../../assets/images/link.svg";
import CompanyLogo from "../../../assets/images/company-logo.png";
import ProgressBar from "../../../components/ProgressBar";
import "./EmployeeDetails.css";

import { useLocation, useNavigate } from "react-router-dom";
import { readEmployee } from "../../../DataBase/Employer/employer";

const ViewEmployeeProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state;
  const employeeDetails = from;
  const [employee, setEmployee] = useState({});
  const [avgRatings, setAvgRatings] = useState({});
  const [prevSkills, setPrevSkills] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      const data2 = await readEmployee(employeeDetails);
      setEmployee(data2);
    };
    fetchDetails();
  }, [employeeDetails]);

  useEffect(() => {
    const fetchDetails = async () => {
      const data2 = employee.ratings;
      calculateRatings(data2);
    };
    fetchDetails();
  }, [employee]);

  const calculateRatings = (ratings) => {
    let colleagueScore = 0;
    let score = 0;
    let ratingsOfEmployee = ratings.filter((rate) => {
      return rate?.ratedByRole === "Employee";
    });
    let ratingsOfEmployer = ratings.filter((rate) => {
      return rate?.ratedByRole === "Employer";
    });
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
      score: Math.ceil(score),
      colleagueScore: Math.ceil(colleagueScore),
    });
  };

  const calculateTotalRatings = (ratings) => {
    let avgCommunication = 0;
    let avgAttitude = 0;
    let avgAbilityToLearn = 0;
    let avgPunctuality = 0;
    let avgCommitment = 0;
    let avgTrustWorthiness = 0;
    let avgSkill = 0;
    let avgTeamPlayer = 0;
    let total = 0;
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
    return Math.ceil(total);
  };

  const calculateCommunicationRatings = (ratings) => {
    let avgCommunication = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgCommunication += +element.communication;
    }
    avgCommunication /= ratings.length;
    return avgCommunication;
  };

  const calculateAttitudeRatings = (ratings) => {
    let avgAttitude = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgAttitude += +element.attitude;
    }
    avgAttitude /= ratings.length;
    return avgAttitude;
  };

  const calculateAbilityToLearnRatings = (ratings) => {
    let avgAbilityToLearn = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgAbilityToLearn += +element.abilityToLearn;
    }
    avgAbilityToLearn /= ratings.length;
    return avgAbilityToLearn;
  };

  const calculatePunctualityRatings = (ratings) => {
    let avgPunctuality = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgPunctuality += +element.punctuality;
    }
    avgPunctuality /= ratings.length;
    return avgPunctuality;
  };
  const calculateCommitmentRatings = (ratings) => {
    let avgCommitment = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgCommitment += +element.commitment;
    }
    avgCommitment /= ratings.length;
    return avgCommitment;
  };
  const calculateTrustworthinessRatings = (ratings) => {
    let avgTrustWorthiness = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgTrustWorthiness += +element.trustworthiness;
    }
    avgTrustWorthiness /= ratings.length;
    return avgTrustWorthiness;
  };
  const calculateSkillRatings = (ratings) => {
    let avgSkill = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgSkill += +element.skill;
    }
    avgSkill /= ratings.length;
    return avgSkill;
  };
  const calculateTeamPlayerRatings = (ratings) => {
    let avgTeamPlayer = 0;
    for (let index = 0; index < ratings.length; index++) {
      const element = ratings[index];
      avgTeamPlayer += +element.teamPlayer;
    }
    avgTeamPlayer /= ratings.length;
    return avgTeamPlayer;
  };
  function getRatingsByEmployerId(ratings, employerId) {
    return ratings.filter((rating) => rating.ratedById === employerId);
  }
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
              }}>
              <MdArrowBackIos
                size={22}
                className="backIcon"
              />
            </div>
            <span className="employeeDetailsText">Employee Details</span>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn">
              <img
                src={ViewFile}
                alt=""
                className="viewIcon"
              />
              <a
                className="text-color-green fw-bold"
                href={employee.resume}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}>
                View Resume
              </a>
            </button>
            <a
              className="btn portfolio-btn"
              href={`https://${employee.portfolioLink}`}
              target="_blank"
              rel="noreferrer">
              <img
                src={UrlLink}
                alt=""
                className="linkIcon"
              />
              <span className=" fw-bold">Portfolio</span>
            </a>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center mb-5">
          <div className="col-md-8 col-12 d-flex align-items-start">
            <div className="employeeImg">
              <img
                src={employee?.profileImage}
                alt=""
                className="empImg"
              />
            </div>
            <div className="employeeDetails">
              <h3>{employee?.employeeName}</h3>
              <p>
                {employee?.designation + " at The " + employee?.companyName}
              </p>
              <p>{employee?.companyLocation}</p>
            </div>
          </div>

          <div className="col-md-4 col-10 d-flex justify-content-center align-items-center empDetailsProgress">
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
          <div className="inside-skills">
            {employee?.skills?.map((skill) => {
              return (
                // <Slider {...settings}>
                <div
                  className="skills"
                  key={skill}>
                  <p className="title">{skill.skillName}</p>
                  <ProgressBar value={skill.value} />
                </div>
                // </Slider>
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
        {employee?.employerIdList
          ?.filter((info) => {
            return info.employerId === employee.currentEmployerId;
          })
          ?.map((info) => {
            return (
              <div>
                <div className="row d-flex align-items-center my-3">
                  <div className="col-12">
                    <h1>Current Company</h1>
                  </div>
                  <div className="col-3">
                    <div className="companyLogo">
                      <img
                        src={info.companyLogo || CompanyLogo}
                        alt=""
                        className="logo"
                      />
                    </div>
                  </div>
                  <div className="col-md-9 col-7">
                    <h1 className="fw-bold font-size-39">{info.companyName}</h1>
                    <div className="fw-bold font-size-25">
                      {new Date(
                        info.dateOfJoining.seconds * 1000
                      ).getFullYear()}
                    </div>
                  </div>
                  <div className="divider my-3"></div>
                </div>
                <div className="row d-flex justify-content-center align-items-center progressBars">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateCommunicationRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateCommunicationRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Communication</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateAttitudeRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateAttitudeRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Attitude</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateAbilityToLearnRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateAbilityToLearnRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Ability To Learn</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculatePunctualityRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculatePunctualityRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Punctuality</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateCommitmentRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateCommitmentRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Commitment</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateTrustworthinessRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateTrustworthinessRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Trustworthiness</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateSkillRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateSkillRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Skill</p>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div class="circle-wrap">
                          {calculateTeamPlayerRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          ) && (
                              <ProgressBar
                                value={
                                  calculateTeamPlayerRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      employee.currentEmployerId
                                    )
                                  ) || 0
                                }
                              />
                            )}
                        </div>
                        <p>Team Player</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 align-items-center d-flex flex-column">
                    <p className="mb-0">Total</p>

                    <div class="circle-wrap">
                      {calculateTotalRatings(
                        getRatingsByEmployerId(
                          employee.ratings,
                          employee.currentEmployerId
                        )
                      ) && (
                          <ProgressBar
                            value={
                              calculateTotalRatings(
                                getRatingsByEmployerId(
                                  employee.ratings,
                                  employee.currentEmployerId
                                )
                              ) || 0
                            }
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="row employerResult">
                  <div>
                    <p>
                      <FaQuoteLeft
                        size={30}
                        className="quoteLeft"
                      />
                      This employee is marked as a{" "}
                      <span className="text-color-green">
                        {text(
                          calculateTotalRatings(
                            getRatingsByEmployerId(
                              employee.ratings,
                              employee.currentEmployerId
                            )
                          )
                        )}{" "}
                        employee{" "}
                      </span>{" "}
                      by <strong>{info.companyName}</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {employee?.employerIdList?.filter((info) => {
        return info.employerId !== employee.currentEmployerId;
      }).length === 0 ? (
        <section className="companies-section"></section>
      ) : (
          <section className="companies-section">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h1>Previous Companies</h1>
                </div>
              </div>
              {employee?.employerIdList
                ?.filter((info) => {
                  return info.employerId !== employee.currentEmployerId;
                })
                ?.sort((a, b) => {
                  return new Date(
                    a.dateOfJoining.seconds * 1000
                  ) - new Date(
                    b.dateOfJoining.seconds * 1000
                  );
                })
                ?.map((info, index) => {
                  return (
                    <div
                      className="row d-flex align-items-center my-3"
                      onClick={() => {
                        setPrevSkills((prevSkills) => ({
                          ...prevSkills,
                          [index]: !prevSkills[index],
                        }));
                      }}
                      style={{ cursor: "pointer", transition: "all 3s ease-in" }}>
                      <div className="col-md-2 col-3">
                        <div className="companyLogo">
                          <img
                            src={info.companyLogo || CompanyLogo}
                            alt=""
                            className="logo"
                          />
                        </div>
                      </div>
                      <div className="col-md-9 col-7">
                        <h1 className="fw-bold font-size-39">
                          {info.companyName}
                        </h1>
                        <div className="fw-bold font-size-25">
                          {new Date(
                            info.dateOfJoining.seconds * 1000
                          ).getFullYear()}
                        </div>
                      </div>
                      <div className="col-md-1 col-1">
                        <div className="back">
                          <MdOutlineKeyboardArrowDown
                            size={35}
                            className="downIcon"
                          />
                        </div>
                      </div>
                      <div style={{ display: prevSkills[index] ? "block" : "none" }} className="divider my-3"></div>
                      {prevSkills[index] && (
                        <div className="prevSkillsContainer">
                          <div className="row d-flex justify-content-center align-items-center progressBars">
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateCommunicationRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,
                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateCommunicationRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,
                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Communication</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateAttitudeRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateAttitudeRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Attitude</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateAbilityToLearnRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateAbilityToLearnRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Ability To Learn</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculatePunctualityRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculatePunctualityRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Punctuality</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateCommitmentRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateCommitmentRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Commitment</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateTrustworthinessRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateTrustworthinessRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Trustworthiness</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateSkillRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateSkillRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Skill</p>
                                </div>
                                <div className="col-md-3 mb-3">
                                  <div class="circle-wrap">
                                    {calculateTeamPlayerRatings(
                                      getRatingsByEmployerId(
                                        employee.ratings,

                                        info.employerId)
                                    ) && (
                                        <ProgressBar
                                          value={
                                            calculateTeamPlayerRatings(
                                              getRatingsByEmployerId(
                                                employee.ratings,

                                                info.employerId)
                                            ) || 0
                                          }
                                        />
                                      )}
                                  </div>
                                  <p>Team Player</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 align-items-center d-flex flex-column">
                              <p className="mb-0">Total</p>

                              <div class="circle-wrap">
                                {calculateTotalRatings(
                                  getRatingsByEmployerId(
                                    employee.ratings,

                                    info.employerId)
                                ) && (
                                    <ProgressBar
                                      value={
                                        calculateTotalRatings(
                                          getRatingsByEmployerId(
                                            employee.ratings,
                                            info.employerId
                                          )
                                        ) || 0
                                      }
                                    />
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="row employerResult">
                            <div>
                              <p>
                                <FaQuoteLeft
                                  size={30}
                                  className="quoteLeft"
                                />
                                This employee is marked as a{" "}
                                <span className="text-color-green">
                                  {text(calculateTotalRatings(
                                    getRatingsByEmployerId(
                                      employee.ratings,
                                      info.employerId
                                    )
                                  ))} employee{" "}
                                </span>{" "}
                                by <strong>{info.companyName}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="divider my-3"></div>
                    </div>
                  );
                })}
            </div>
          </section>
      )}
    </>
  );
};

export default ViewEmployeeProfile;
