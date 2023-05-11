import React, { useEffect, useState } from "react";
//import image from "../../assets/images/Image.png"
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Assesment_Card = ({ info, employerId }) => {
  const [count, setCount] = useState(0);
  const [avgRatings, setAvgRatings] = useState({});
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
    score /= ratingsOfEmployer.length;
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
  function getRatingsByEmployerId(ratings, employerId) {
    return ratings.filter((rating) => rating.ratedById === employerId);
  }
  useEffect(() => {
    const fetchOfferDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      const data2 = info.ratings;
      calculateRatings(getRatingsByEmployerId(data2, userDatas.id));
    };

    if (count < 5) {
      fetchOfferDetails();
      setCount((prevCount) => prevCount + 1);
    }
  }, [info, count]);

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
        <ProgressBar value={avgRatings.score} />
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
              findRatedAtDate(info.lastRatings, employerId),
              findAssessmentDate(info.lastRatings, employerId)
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
                findRatedAtDate(info.lastRatings, employerId),
                findAssessmentDate(info.lastRatings, employerId)
              )
                ? { color: "#d2dee8", backgroundColor: "#eef8ff" }
                : {}
            }>
            {hasOneMonthPassed(
              findRatedAtDate(info.lastRatings, employerId),
              findAssessmentDate(info.lastRatings, employerId)
            )
              ? "Assessment Done"
              : "Assess Employee"}
          </button>
        </Link>
        {hasOneMonthPassed(
          findRatedAtDate(info.lastRatings, employerId),
          findAssessmentDate(info.lastRatings, employerId)
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
