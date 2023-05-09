import React from "react";
//import image from "../../assets/images/Image.png"
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Assesment_Card = ({ info, value, employerId }) => {
  const user = sessionStorage.getItem("LoggedIn");
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
    }
    return years;
  };
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
  return (
    <div className="assess-card">
      <div
        className="managerlogo"
        onClick={() => {
          user === "Employer" &&
            navigate("/employee-details", {
              state: {
                from: info,
              },
            });
        }}>
        <img
          src={pic}
          alt="manager-logo"></img>
        <ProgressBar value={value} />
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
        <span>{info.salary}</span>
        <span
          style={{
            background: "#D7F2BC 0% 0% no-repeat padding-box",
            borderRadius: "9px",
            width: "50%",
            marginTop: ".5rem",
            padding: ".5rem",
            textAlign: "center",
            color: "#66BC11",
            fontWeight: "bold",
          }}>
          {info.designation}
        </span>
      </div>
      <div className="cardFooter">
        <Link
          style={
            hasOneMonthPassed(
              findRatedAtDate(info.ratings, employerId),
              findAssessmentDate(info.ratings, employerId)
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
              hasOneMonthPassed(
                findRatedAtDate(info.ratings, employerId),
                findAssessmentDate(info.ratings, employerId)
              )
                ? { color: "#d2dee8", backgroundColor: "#eef8ff" }
                : {}
            }>
            {hasOneMonthPassed(
              findRatedAtDate(info.ratings, employerId),
              findAssessmentDate(info.ratings, employerId)
            )
              ? "Assessment Done"
              : "Assess Employee"}
          </button>
        </Link>
        {hasOneMonthPassed(
          findRatedAtDate(info.ratings, employerId),
          findAssessmentDate(info.ratings, employerId)
        ) ? (
          <Link
            className="w-100 mt-3 btn"
            to={{
              pathname: "/ViewAssessment",
            }}
            state={{ from: info }}>
            <button className="allow">View Assesment</button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Assesment_Card;
