import React, { useState } from "react";
import "./Profile.css";
import pic from "../../../assets/images/pic.png";
import view from "../../../assets/images/view-doc.svg";
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from "../../../components/Input/InputField";
import { Slider, Col } from "antd";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const initialValues = {
  link: "",
  aadharno: "",
  skill: "",
};

const Profile = () => {
  const [values, setValues] = useState(initialValues);
  const [inputValue, setInputValue] = useState(50);
  return (
    <div className="profile">
      <div className="profileHeader">
        <div className="profilePic">
          <img src={pic} alt="manager-logo" style={{ cursor: "pointer" }}></img>
        </div>

        <div className="name">
          <span style={{ fontWeight: "bold" }}>Govarthini, 24</span>
          <br />
          <span>Chennai, India</span>
        </div>
      </div>

      <div className="profile-progress">
        <div className="progressBar">
          <div className="progressleft">Colleague Score</div>
          <div className="progressRight">Score</div>
        </div>
      </div>
      <div className="profileScore">
        <h1 className="text-center text-color-green fw-bold font-size-30">
          Current Company
        </h1>
        <div>
          <p>Company</p>
          <p>The Madras Branding Company</p>
        </div>
        <div>
          <p>Name</p>
          <p>Sivasundar N</p>
        </div>
        <div>
          <p>Aadhar Id</p>
          <p>5486 6598 6598</p>
        </div>
        <div>
          <p>Job Role</p>
          <p>Graphics Designer</p>
        </div>
        <div>
          <p>Date of joining</p>
          <p>01-01-2023</p>
        </div>
        <div>
          <p>Salary</p>
          <p>500,000 PA</p>
        </div>
      </div>

      <div className="profileBody">
        <button
          className="text-start"
          style={{
            paddingLeft: "2rem",
            border: "0",
            boxShadow: "0px 0px 33px #00000012",
          }}
        >
          <img src={view} alt="view"></img>&nbsp;View Resume
        </button>

        <div className="websiteLink">https://reallygood.work</div>

        <div className="adharNumber">5486 6598 6598</div>

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

          <div className="skillList">
            <InputField
              type={"text"}
              name={"skill"} //name should iterated according to .map
              value="Photoshop"
            />
            <Col span={10}>
              <Slider
                min={1}
                max={100}
                defaultValue={50}
                trackStyle={{ backgroundColor: "#00823B" }}
                handleStyle={{ backgroundColor: "#00823B" }}
              />
            </Col>

            <span className="sliderpercent">{inputValue}</span>
          </div>

          <div className="skillList">
            <InputField
              type={"text"}
              name={"skill"} //name should iterated according to .map
              value="Illustrator"
            />
            <Col span={10}>
              <Slider
                min={1}
                max={100}
                defaultValue={50}
                trackStyle={{ backgroundColor: "#00823B" }}
                handleStyle={{ backgroundColor: "#00823B" }}
              />
            </Col>

            <span className="sliderpercent">{inputValue}</span>
          </div>

          <div className="skillList">
            <InputField
              type={"text"}
              name={"skill"} //name should iterated according to .map
              value="Premiere Pro"
            />
            <Col span={10}>
              <Slider
                min={1}
                max={100}
                defaultValue={50}
                trackStyle={{ backgroundColor: "#00823B" }}
                handleStyle={{ backgroundColor: "#00823B" }}
              />
            </Col>

            <span className="sliderpercent">{inputValue}</span>
          </div>

          <div className="skillList">
            <InputField
              type={"text"}
              name={"skill"} //name should iterated according to .map
              value="After Effects"
            />
            <Col span={10}>
              <Slider
                min={1}
                defaultValue={50}
                max={100}
                trackStyle={{ backgroundColor: "#00823B" }}
                handleStyle={{ backgroundColor: "#00823B" }}
              />
            </Col>
            <span className="sliderpercent">{inputValue}</span>
            <div className="addNew">
              <AiOutlinePlus size={32} style={{ color: "#00823B" }} />
            </div>
          </div>
          <div className="profileFooter">
            <button style={{ width: "12rem", color: "#BBC1C7" }}>
              <BsCheckCircle style={{ color: "#BBC1C7" }} />
              &nbsp;Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
