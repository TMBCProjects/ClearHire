import React, { useState } from "react";
import "./Assessment.css";
import pic from "../../images/download.jpg";
import check_1 from "../../images/Check-1.svg";
import quote from "../../images/quote-left.svg";
import arrow from "../../images/arrow-dropup.svg";
import ProgressBar from "../../components/ProgressBar";
import { rateEmployee } from "../../DataBase/Employer/employer";
import { useLocation, useNavigate } from "react-router-dom";
import { rateCollegue } from "../../DataBase/Employee/employee";
import { Button } from 'antd';


const initialState = {
    dateOfReview: new Date(),
    communication: 0,
    attitude: 0,
    abilityToLearn: 0,
    punctuality: 0,
    commitment: 0,
    trustworthiness: 0,
    skill: 0,
    teamPlayer: 0,
    note: "",
  };

function EmployeeSoftskills() {
  const navigate = useNavigate();
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    const location = useLocation();
    const { from } = location.state;
    const info = from;
    const [values, setValues] = useState(initialState);
    let [rangeSkill_1, setRangeSkill_1] = useState(0);
    let [rangeSkill_2, setRangeSkill_2] = useState(0);
    let [rangeSkill_3, setRangeSkill_3] = useState(0);
    let [rangeSkill_4, setRangeSkill_4] = useState(0);
    let [rangeSkill_5, setRangeSkill_5] = useState(0);
    let [rangeSkill_6, setRangeSkill_6] = useState(0);
    let [rangeSkill_7, setRangeSkill_7] = useState(0);
    let [rangeSkill_8, setRangeSkill_8] = useState(0);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };


    const handleSubmit = () => {
      let userDatas = JSON.parse(sessionStorage.getItem("userData"));
      let role = sessionStorage.getItem("LoggedIn");
      values.companyName = userDatas.data.companyName;
      values.ratedById = userDatas.id;
      values.ratedByRole = role;
      values.ratedByEmail = userDatas.data.employerEmail || userDatas.data.employeeEmail;
      values.employeeId = info.id || "employeeId";
      values.employeeName = info.employeeName || "employeeName";
      values.employeeEmail = info.employeeEmail || "employeeEmail";
      values.profileImage = info.profileImage || pic;
      if (role === "Employer") {
        rateEmployee(values).then(() => {
          window.location.href = "/";
        })
      }
      if (role === "Employee") {
        rateCollegue(values).then(() => {
          window.location.href = "/";
        });
      }
    };
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
      const handleBack = () => {
        navigate("/");
      };  

  function hasOneMonthPassed(date) {
    if (date === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    return diffInMs <= oneMonthInMs;
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
      <div className="assesment container">
        <div className="back-cont">
          <div className="back-div" onClick={handleBack}>
            <img src={arrow} alt="" />
            <h4>Employee Assessment</h4>
          </div>
        </div>
        <div className="row employe-details">
          <div className="col-xl-7 col-lg-6 col-md-6 col-12 employe-prof">
            <div className="prof-img">
              <img src={info.profileImage} alt="" />
            </div>
            <div className="prof-text">
              <h3>
                {info.employeeName}, {calculateAge(info.dateOfBirth)}
              </h3>
              <h6>
                {info.designation} at {info.companyName}
              </h6>
              <h6>
                {info.companyLocation}
              </h6>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-6 col-12 employe-score">
            <div className="col-12 circles">
              <div className="col-6 circle-box">
                <div className="circle" data-prog="95">
                  <ProgressBar value={0} />
                </div>
                <div className="text">
                  <h6>Colleague Score</h6>
                </div>
              </div>
              <div className="col-6 circle-box">
                <div className="circle" data-prog="75">
                  <ProgressBar value={
                    calculateRatings(
                      getRatingsByEmployerId(info?.ratings, userDatas.id)
                    ) || 0
                  } />
                </div>
                <div className="text ms-3">
                  <h6>Score</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row skill-assessment">
          <div className="col-xl-6 col-lg-6 skill-box-1">
            <div className="col-12 slider-1">
              <div className="col-3  heading">
                <h3>Communication</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="communication"
                  defaultValue={rangeSkill_1}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_1(e.target.value);
                  }}
                />
              </div>
              <div className="col-2    value-1" id="rangeValue">
                <h5>{rangeSkill_1}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Attitude</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="attitude"
                  defaultValue={rangeSkill_2}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_2(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_2}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Ability to learn</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="abilityToLearn"
                  defaultValue={rangeSkill_3}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_3(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_3}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Punctuality</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="punctuality"
                  defaultValue={rangeSkill_4}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_4(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_4}%</h5>
              </div>
            </div>
          </div>
  
          <div className="col-xl-6 col-lg-6 skill-box-2">
            <div className="col-12 slider-1">
              <div className="col-3 heading">
                <h3>Commitment</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="commitment"
                  defaultValue={rangeSkill_5}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_5(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_5}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Trustworthiness</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="trustworthiness"
                  defaultValue={rangeSkill_6}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_6(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_6}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Skill</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="skill"
                  defaultValue={rangeSkill_7}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_7(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_7}%</h5>
              </div>
            </div>
            <div className="slider-1">
              <div className="col-3 heading">
                <h3>Team Player</h3>
              </div>
              <div className="col-6 slied">
                <input
                  type="range"
                  className="range-1"
                  min="0"
                  max="100"
                  name="teamPlayer"
                  defaultValue={rangeSkill_8}
                  onChange={(e) => {
                    handleInputChange(e);
                    setRangeSkill_8(e.target.value);
                  }}
                />
              </div>
              <div className="col-2 value-1" id="rangeValue">
                <h5>{rangeSkill_8}%</h5>
              </div>
            </div>
          </div>
          <div className="row note">
            <div className="row note-0">
              <div className="note-head">
                <h3>Note</h3>
              </div>
              <div className="quote-img">
                <img src={quote} alt="" />
              </div>
              <div className="col-xl-8 col-md-8 col-sm-8  note-1">
                <div
                  className="col-xl-3 col-md-4 col-sm-5 note-text"
                  onClick={() => {
                    setValues({
                      ...values,
                      note: "Great Employee",
                    });
                  }}
                >
                  <h4>Great employee</h4>
                </div>
                <div
                  className="col-xl-3 col-md-4 col-sm-5  note-text"
                  onClick={() => {
                    setValues({
                      ...values,
                      note: "Very Good Employee",
                    });
                  }}
                >
                  <h4>Very Good employee</h4>
                </div>
                <div
                  className="col-xl-3 col-md-4 col-sm-5  note-text"
                  onClick={() => {
                    setValues({
                      ...values,
                      note: "Good Employee",
                    });
                  }}
                >
                  <h4>Good employee</h4>
                </div>
              </div>
              <div className="col-xl-8 col-md-8 col-sm-8 note-2">
                <div
                  className="col-xl-3 col-md-4 col-sm-5  note-text"
                  onClick={() => {
                    setValues({
                      ...values,
                      note: "Poor Employee",
                    });
                  }}
                >
                  <h4>Poor employee</h4>
                </div>
                <div
                  className="col-xl-3 col-md-4 col-sm-5  note-text"
                  onClick={() => {
                    setValues({
                      ...values,
                      note: "Worst Employee",
                    });
                  }}
                >
                  <h4>Worst employee</h4>
                </div>
              </div>
              <div className="or">
                <h3>or</h3>
              </div>
              <div className="assessment-text">
                <textarea
                  id="assessment"
                  value={values.note}
                  name="note"
                  rows="3"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  cols="100"
                  placeholder="enter your text assessment..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="submit">
          <Button onClick={handleSubmit}
            disabled={
              hasOneMonthPassed(
                findRatedAtDate(info.lastRatings, info.currentEmployerId)
              )
            }>
            <img className='checkimg' src={check_1} alt="" width={20} />
            Submit Assessment</Button>
        </div>
      </div>
    )
}

export default EmployeeSoftskills
