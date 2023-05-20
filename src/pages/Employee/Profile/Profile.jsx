import React, { useEffect, useState } from "react";
import "./Profile.css";
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from "../../../components/Input/InputField";
import { Slider, Col, message } from "antd";
import UploadFile from "../../../components/UploadFile";
import { MinusOutlined } from "@ant-design/icons";
import { profileUpdate, readEmployeeRatings } from "../../../DataBase/Employee/employee";
import ProgressBar from "../../../components/ProgressBar";

export default function Profile() {
  const [avgRatings, setAvgRatings] = useState({});
  const [userDatas, setUserDatas] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [values, setValues] = useState({});
  const [skills, setSkills] = useState([
    {
      skillName: "",
      value: 0,
    },
  ]);
  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (userDatas.data.skills) {
        setSkills(userDatas.data.skills);
      }
      const data2 = await readEmployeeRatings(userDatas.id);
      calculateRatings(data2);
    };
    fetchOfferDetails();
  }, [userDatas]);

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
  const handleSkillChange = (e, index) => {
    const { value } = e.target;
    const newState = skills.map((obj, id) => {
      if (id === index) {
        return { ...obj, skillName: value };
      }
      return obj;
    });
    setSkills(newState);
  };

  const handleSkillValueChange = (e, index) => {
    const value = e;
    const newState = skills.map((obj, id) => {
      if (id === index) {
        return { ...obj, value: value };
      }
      return obj;
    });
    setSkills(newState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const removeSkill = (index) => {
    const newState = skills.filter((obj, id) => {
      return id !== index;
    });
    setSkills(newState);
    message.success("One skill removed");
  };

  const updateUserData = (data) => {
    const newData = Object.assign({}, userDatas);
    if (data) {
      Object.assign(newData.data, data);
    }
    sessionStorage.setItem("userData", JSON.stringify(newData));
    setUserDatas(JSON.parse(sessionStorage.getItem("userData")));
  };

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
    // colleagueScore = 80;
    setAvgRatings({
      score: Math.ceil(score),
      colleagueScore: Math.ceil(colleagueScore),
    });
  };
  const handleSubmit = () => {
    let resume = sessionStorage.getItem("resume");
    if (resume) {
      values.resume = resume;
    }
    values.skills = skills;
    profileUpdate(values, userDatas.id).then(() => {
      updateUserData(values);
      sessionStorage.removeItem("resume");
    });
    message.success("Profile updated successfully");
  };

  return (
    <div className="profile">
      <div className="profileHeader">
        <div className="profilePic">
          <img
            src={userDatas.data.profileImage}
            alt="manager-logo"
            style={{ cursor: "pointer" }}
          ></img>
        </div>

        <div className="name">
          <span style={{ fontWeight: "bold" }}>
            {userDatas.data.employeeName},{" "}
            {calculateAge(userDatas.data.dateOfBirth)}
          </span>
          <br />
          <span>
            {userDatas.data.companyLocation}
          </span>
        </div>
      </div>
      {userDatas.data.currentEmployerId && (
        <div className="profile-progress">
          <div className="progressBar">
            <div className="col-12 circles">
              <div className="col-6 circle-box">
                <div className="circle">
                  <ProgressBar
                    value={
                      avgRatings?.colleagueScore
                      || 0
                    }
                  />
                </div>
                <div className="text">
                  <h6>Colleague Score</h6>
                </div>
              </div>
              <div className="col-6 circle-box">
                <div className="circle">
                  <ProgressBar
                    value={
                      avgRatings?.score
                      || 0
                    }
                  />
                </div>
                <div className="text">
                  <h6>Score</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {userDatas.data.currentEmployerId && (
        <div className="profileScore">
          <h1 className="text-center text-color-green fw-bold font-size-30">
            Current Company
          </h1>
          <div>
            <p>Company</p>
            <p>{userDatas.data.companyName}</p>
          </div>
          <div>
            <p>Job Role</p>
            <p>{userDatas.data.designation}</p>
          </div>
          <div>
            <p>Date of joining</p>
            <p>{new Date(userDatas.data.dateOfJoining.seconds * 1000).toLocaleDateString('en-GB')}</p>
          </div>
          <div>
            <p>Salary</p>
            <p>{userDatas.data.salary} LPA</p>
          </div>
        </div>
      )}

      <div className="profileBody">
        <UploadFile
          name={userDatas.data.employeeName}
          url={userDatas.data.resume}
        />
        <InputField
          type={"text"}
          name={"portfolioLink"}
          value={
            values.portfolioLink
              ? values.portfolioLink
              : userDatas?.data?.portfolioLink
          }
          onChange={handleInputChange}
          placeholder={"Add Portfolio link..."}
        />

        <InputField
          type={"number"}
          name={"employeeAadhaarCardNumber"}
          value={
            values.employeeAadhaarCardNumber
              ? values.employeeAadhaarCardNumber
              : userDatas?.data?.employeeAadhaarCardNumber
          }
          onChange={handleInputChange}
          placeholder={"Add Your Aadhar Number"}
        />

        <div className="skills">
          <span
            style={{
              fontWeight: "bold",
              display: "flex",
              gap: "2vh",
              alignItems: "center",
            }}
          >
            Your Skills
          </span>

          {!skills.length && (
            <div>
              Add atleast 1 skill{" "}
              <span
                onClick={() => {
                  setSkills([
                    ...skills,
                    {
                      skillName: "",
                      value: 0,
                    },
                  ]);
                }}
                style={{
                  border: "1px solid green",
                  borderRadius: "6vh",
                  marginLeft: "2vh",
                  padding: "1vh 1.5vh",
                  width: "7vh",
                  cursor: "pointer",
                }}
              >
                <img src={Add} alt="add"></img>
              </span>
            </div>
          )}
          {skills?.map((skill, index) => {
            return (
              <div className="skillList">
                <InputField
                  type={"text"}
                  name={`skill ${index + 1}`} //name should iterated according to .map
                  onChange={(e) => {
                    handleSkillChange(e, index);
                  }}
                  value={skill.skillName}
                  placeholder={`Skill Name`}
                />
                <Col span={10}>
                  <Slider
                    min={1}
                    max={100}
                    value={skill.value}
                    onChange={(e) => {
                      handleSkillValueChange(e, index);
                    }}
                    trackStyle={{ backgroundColor: "#00823B" }}
                    handleStyle={{ backgroundColor: "#00823B" }}
                  />
                </Col>

                <span className="sliderpercent">{skill.value}</span>

                <span
                  onClick={() => {
                    removeSkill(index);
                  }}
                  style={{
                    border: "1px solid tomato",
                    borderRadius: "6vh",
                    marginLeft: "2vh",
                    padding: "1vh 1.5vh",
                    width: "7vh",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MinusOutlined style={{ color: "tomato" }} />
                </span>
                {index === skills.length - 1 && (
                  <span
                    onClick={() => {
                      setSkills([
                        ...skills,
                        {
                          skillName: "",
                          value: 0,
                        },
                      ]);
                    }}
                    style={{
                      border: "1px solid green",
                      borderRadius: "6vh",
                      marginLeft: "2vh",
                      padding: "1vh 1.5vh",
                      width: "7vh",
                      cursor: "pointer",
                    }}
                  >
                    <img src={Add} alt="add"></img>
                  </span>
                )}
              </div>
            );
          })}
          <div className="profileFooter">
            <button onClick={handleSubmit}>
              <img src={Check} alt="submit-logo"></img>
              &nbsp;Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
