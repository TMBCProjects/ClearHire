import React from "react";
import pic from "../../assets/images/pic.png";
import ProgressBar from "../ProgressBar";
import "./styles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RecruitmentCard = ({ info, employerId }) => {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const navigate = useNavigate();
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
  const calculateRatings = (ratings) => {
    let score = 0;
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
    score /= ratingsOfEmployer.length;
    return Math.ceil(score);
  };
  function getRatingsByEmployerId(ratings, employerId) {
    return ratings.filter((rating) => rating.ratedById === employerId);
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
        }}
      >
        <img src={info?.profileImage || pic} alt="manager-logo"></img>
        <ProgressBar
          value={
            calculateRatings(
              getRatingsByEmployerId(info?.ratings, userDatas.id)
            ) || 0
          }
        />
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
        }}
      >
        <span>
          {info.employeeName}, {calculateAge(info.dateOfBirth)}
        </span>
      </div>
      <div className="cardFooter">
        <Link
          className="w-100 mt-3 btn"
          to={{
            pathname: "/onboarding-form",
          }}
          state={{ from: info }}
        >
          <button className="allow">Send Offer Letter</button>
        </Link>
      </div>
      <div className="cardFooter"></div>
    </div>
  );
};

export default RecruitmentCard;
