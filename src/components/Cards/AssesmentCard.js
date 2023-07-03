import React, { useState } from "react";
//import image from "../../assets/images/Image.png"
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { addFeedbackToEmployee } from "../../DataBase/Employer/employer";
import { Avatar, Button, Form, Input, Popover } from "antd";
import { MdOutlineFeedback } from "react-icons/md";
import { toast } from "react-toastify";
const Assesment_Card = ({ info, employerId }) => {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob.seconds * 1000);
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  };

  function hasOneMonthPassedOne(date) {
    if (date === "null") {
      return false;
    }
    const specificDate = new Date(date.split("/").reverse().join("/"));
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    return diffInMs <= oneMonthInMs;
  }

  function hasOneMonthPassed(date, date2) {
    if (date === "null" || date2 === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const specificDate2 = new Date(date2);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    const diffInMs2 = currentDate - specificDate2;
    return diffInMs <= oneMonthInMs && diffInMs2 <= oneMonthInMs;
  }
  function hasThreeMonthsPassed(date, date2) {
    if (date === "null" || date2 === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const specificDate2 = new Date(date2);
    const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // Assuming three months have 90 days
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    const diffInMs2 = currentDate - specificDate2;
    return diffInMs <= threeMonthsInMs && diffInMs2 <= threeMonthsInMs;
  }
  function hasSixMonthsPassed(date, date2) {
    if (date === "null" || date2 === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const specificDate2 = new Date(date2);
    const sixMonthsInMs = 6 * 30 * 24 * 60 * 60 * 1000; // Assuming six months have 180 days
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    const diffInMs2 = currentDate - specificDate2;
    return diffInMs <= sixMonthsInMs && diffInMs2 <= sixMonthsInMs;
  }
  function hasOneYearPassed(date, date2) {
    if (date === "null" || date2 === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const specificDate2 = new Date(date2);
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // Assuming a year has 365 days
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    const diffInMs2 = currentDate - specificDate2;
    return diffInMs <= oneYearInMs && diffInMs2 <= oneYearInMs;
  }

  function duration(date1, date2) {
    const type = userDatas.data.assessmentType;
    if (type === "Monthly") {
      return hasOneMonthPassed(date1, date2);
    } else if (type === "Once in 3 months") {
      return hasThreeMonthsPassed(date1, date2);
    } else if (type === "Twice a year") {
      return hasSixMonthsPassed(date1, date2);
    } else if (type === "Annualy") {
      return hasOneYearPassed(date1, date2);
    }
  }

  function findRatedAtDate(ratingsArray, desiredId) {
    if (ratingsArray !== undefined) {
      for (let i = 0; i < ratingsArray.length; i++) {
        if (ratingsArray[i].ratedById === desiredId) {
          return ratingsArray[i].ratedAtDate;
        } else {
        }
      }
    }
    return "null";
  }
  function findAssessmentDate(ratingsArray, desiredId) {
    if (ratingsArray !== undefined) {
      for (let i = 0; i < ratingsArray.length; i++) {
        if (ratingsArray[i].ratedById === desiredId) {
          return ratingsArray[i].assessmentDate;
        } else {
        }
      }
    }
    return "null";
  }

  const calculateRatings = (ratings) => {
    let score = 0;
    let ratingsOfEmployer = ratings
      ? ratings?.filter((rate) => {
          return rate?.ratedByRole === "Employer";
        })
      : "";

    for (let index = 0; index < ratingsOfEmployer?.length; index++) {
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
    score /= ratingsOfEmployer?.length;
    return Math.ceil(score);
  };
  function getRatingsByEmployerId(ratings, employerId) {
    return ratings?.filter((rating) => rating.ratedById === employerId);
  }

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const addFeedback = () => {
    if (feedback !== "") {
      addFeedbackToEmployee(info, feedback, userDatas).then(() => {
        setFeedback("");
      });
      toast.success("Feedback sent successfully !");
    } else {
      toast.error("Please add the feedback !");
    }
  };

  const feedbackComponent = (
    <Form style={{ width: "250px", height: "auto" }}>
      <Form.Item>
        <Input.TextArea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Your feedback"
        />
      </Form.Item>
      <Button
        onClick={addFeedback}
        type="primary"
        htmlType="submit"
        style={{ background: "#00823B" }}
      >
        Send Feedback
      </Button>
    </Form>
  );
  return (
    <div className="assess-card">
      <div
        className="managerlogo"
        // onClick={() => {
        //   user === "Employer" &&
        //     navigate("/employee-details", {
        //       state: {
        //         from: info,
        //       },
        //     });
        // }}
      >
        {!isImageLoaded && (
          <Avatar
            onClick={() => {
              user === "Employer" &&
                navigate("/employee-details", {
                  state: {
                    from: info,
                  },
                });
            }}
            style={{ marginBottom: "1rem" }}
            size={64}
            icon={<UserOutlined />}
          />
        )}
        <img
          onClick={() => {
            user === "Employer" &&
              navigate("/employee-details", {
                state: {
                  from: info,
                },
              });
          }}
          src={info?.profileImage || pic}
          alt="manager-logo"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}></img>
        {user === "Employer" && (
          <div className="d-flex justify-content-center align-items-center">
            <Popover
              trigger="click"
              placement="left"
              content={feedbackComponent}
              title="Employee's Feedback">
              <Button
                className="d-flex align-items-center me-3"
                icon={
                  <MdOutlineFeedback
                    size={18}
                    className="me-1"
                  />
                }>
                {" "}
                Feedback
              </Button>
            </Popover>
            <ProgressBar
              onClick={() => {
                user === "Employer" &&
                  navigate("/employee-details", {
                    state: {
                      from: info,
                    },
                  });
              }}
              value={
                calculateRatings(
                  getRatingsByEmployerId(info?.ratings, userDatas.id)
                ) || 0
              }
            />
          </div>
        )}
      </div>
      <div
        className="headDesc"
        onClick={() => {
          user === "Employer" &&
            navigate("/employee-details", {
              state: {
                from: info,
              },
            });
        }}>
        <span>
          {info.employeeName}, {calculateAge(info.dateOfBirth)}
        </span>
        <span>{info.companyLocation}</span>
        {user === "Employer" && <span>{info.salary} LPA</span>}
        <span
          style={{
            background: "#D7F2BC 0% 0% no-repeat padding-box",
            borderRadius: "9px",
            width: "40%",
            marginTop: ".5rem",
            padding: ".rem",
            textAlign: "center",
            color: "#66BC11",
            fontWeight: "bold",
          }}>
          {info.designation}
        </span>
      </div>
      <div className="cardFooter">
        {user === "Employer" && (
          <Link
            style={
              duration(
                findRatedAtDate(info?.lastRatings, employerId),
                findAssessmentDate(info?.lastRatings, employerId)
              )
                ? {
                    pointerEvents: "none",
                  }
                : {}
            }
            className="w-100 mt-3 btn"
            to={{
              pathname: "/EmployeeAssessment",
            }}
            state={{ from: info }}>
            <button
              className="allow"
              style={
                duration(
                  findRatedAtDate(info?.lastRatings, employerId),
                  findAssessmentDate(info?.lastRatings, employerId)
                )
                  ? { color: "#d2dee8", backgroundColor: "#eef8ff" }
                  : {}
              }>
              {duration(
                findRatedAtDate(info?.lastRatings, employerId),
                findAssessmentDate(info?.lastRatings, employerId)
              )
                ? "Assessment Done"
                : "Assess Employee"}
            </button>
          </Link>
        )}
        {user === "Employee" && (
          <Link
            style={
              hasOneMonthPassedOne(
                findRatedAtDate(info?.lastRatings, userDatas.id)
              )
                ? {
                    pointerEvents: "none",
                  }
                : {}
            }
            className="w-100 mt-3 btn"
            to={{
              pathname: "/EmployeeAssessment",
            }}
            state={{ from: info }}>
            <button
              className="allow"
              style={
                hasOneMonthPassedOne(
                  findRatedAtDate(info?.lastRatings, userDatas.id)
                )
                  ? { color: "#d2dee8", backgroundColor: "#eef8ff" }
                  : {}
              }>
              {hasOneMonthPassedOne(
                findRatedAtDate(info?.lastRatings, userDatas.id)
              )
                ? "Assessment Done"
                : "Assess Employee"}
            </button>
          </Link>
        )}
        {user === "Employer" && (
          <Link
            className="w-100 mt-3 btn"
            to={{
              pathname: "/ViewAssessment",
            }}
            state={{ from: info }}>
            <button className="allow">View Assesment</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Assesment_Card;
