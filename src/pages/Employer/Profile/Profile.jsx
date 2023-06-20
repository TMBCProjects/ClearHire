import React, { useState } from "react";
import "./Profile.css";
import pic from "../../../assets/images/pic.png";
import { message } from "antd";
import Check from "../../../assets/images/Check.svg";
import UploadPic from "../../../components/UploadPic/UploadPic";
import { employerProfileUpdate } from "../../../DataBase/Employer/employer";

const Profile = () => {
  const [userDatas, setUserDatas] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [values, setValues] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
    employerProfileUpdate(values, userDatas.id).then(() => {
      updateUserData(values);
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
          <p>Location</p>
          <p>
            {userDatas.data.companyLocations.map((item) => { return (<p>{item}</p>) })}
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
