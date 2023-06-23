import React, { useState } from "react";
import "./Profile.css";
import { message } from "antd";
import Check from "../../../assets/images/Check.svg";
import UploadPic from "../../../components/UploadPic/UploadPic";
import { employerProfileUpdate } from "../../../DataBase/Employer/employer";
import InputField from "../../../components/Input/InputField";
import { CloseSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const Profile = () => {
  const [userDatas, setUserDatas] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [values, setValues] = useState({});
  const [location, setLocation] = useState("");
  const [viewTextbox, setViewTextbox] = useState(false);
  useEffect(() => {
    setValues({ companyLocations: userDatas.data.companyLocations })
  }, [userDatas])
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const updateUserData = (data) => {
    const newData = Object.assign({}, userDatas);
    if (data) {
      Object.assign(newData.data, data);
    }
    sessionStorage.setItem("userData", JSON.stringify(newData));
    setUserDatas(JSON.parse(sessionStorage.getItem("userData")));
  };
  const handleSubmit = () => {
    let profile = sessionStorage.getItem("profileImage");
    if (profile) {
      values.companyLogo = profile;
    }
    if (location !== "") {
      values.companyLocations = [...values.companyLocations, location];
    }
    employerProfileUpdate(values, userDatas.id).then(() => {
      updateUserData(values);
      setViewTextbox(false);
      sessionStorage.removeItem("profileImage");
    });
    message.success("Profile updated successfully");
  };
  return (
    <div className="profile">
      <div className="profileScore">
        <div className="profileHeader">
          <div className="profilePic">
            <img
              src={userDatas.data.companyLogo}
              alt=""
            ></img>
            {!userDatas.data.companyLogo && <p
              className="altText"
              style={{
                position: "absolute",
                top: "28%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "14px",
              }}
            >
              No Logo Uploaded
            </p>}
          </div>
          <UploadPic url={userDatas.data.companyLogo} />
        </div>
        <span className="text-center text-color-green fw-bold font-size-20"><br />
        </span>
        <div>
          <p>Company Website</p>
          <p>
            <a
              href={"https://" + userDatas.data.companyWebsite}
              target="_blank"
              rel="noreferrer"
            >
              {userDatas.data.companyWebsite}
            </a>
          </p>
        </div>
        <div>
          <p>Company Name</p>
          <p>{userDatas.data.companyName}</p>
        </div>
        <div>
          <p>Company Establishment Year</p>
          <p>{userDatas.data.companyEstablishmentYear}</p>
        </div>
        <div>
          <p>Location {viewTextbox ? <CloseSquareOutlined style={{ cursor: "pointer" }} onClick={() => { setLocation(""); setViewTextbox(!viewTextbox); }} /> : <PlusSquareOutlined style={{ cursor: "pointer" }} onClick={() => { setViewTextbox(!viewTextbox); }} />}</p>

          <p>
            {userDatas.data.companyLocations.map((item) => { return (<p>{item}</p>) })}
            <div
              style={{ display: viewTextbox ? 'block' : 'none' }}>
              <InputField
                type={"text"}
                name={"companyLocations"}
                value={location}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder={`Type a New Location`}
              /></div>
          </p>
        </div>
      </div>
      <div className="profileBody">
        <div className="websiteLink"></div>

        <div className="profileFooter">
          <button onClick={handleSubmit}>
            <img src={Check} alt="submit-logo"></img>
            &nbsp;Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
