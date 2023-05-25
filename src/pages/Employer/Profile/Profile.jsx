import React from "react";
import "./Profile.css";
import pic from "../../../assets/images/pic.png";

const Profile = () => {
  let userDatas = JSON.parse(sessionStorage.getItem("userData"));
  return (
    <div className="profile">
      <div className="profileScore">
        <h1 className="text-center text-color-green fw-bold font-size-30">
          <div className="profileHeader">
            <div className="profilePic">
              <img
                src={userDatas.data.companyLogo || pic}
                alt="manager-logo"
                style={{ cursor: "pointer" }}
              ></img>
            </div>
          </div>
        </h1>
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
            {userDatas.data.companyState} - {userDatas.data.companyCountry}
          </p>
        </div>
      </div>
      {/* <div className="profileBody">
        <div className="websiteLink"></div>
          <div className="profileFooter">
            <button style={{ width: "12rem", color: "#BBC1C7" }}>
              <BsCheckCircle style={{ color: "#BBC1C7" }} />
              &nbsp;Update
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
