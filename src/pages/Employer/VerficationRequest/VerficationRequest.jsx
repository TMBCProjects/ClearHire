import React, { useEffect, useState } from "react";
import "../VerficationRequest/VerficationRequest.css";
import image from "../../../assets/images/Image.png";
import pic from "../../../assets/images/pic.png";
import check from "../../../assets/images/checkfull.svg";
import close from "../../../assets/images/closebtn.svg";
import { getRequests } from "../../../DataBase/Employee/employee";

export default function VerficationRequest() {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const user = sessionStorage.getItem("LoggedIn");
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      const data = user === "Employer" ? await getRequests(userDatas.id) : [{}];
      console.log(data);
      setRequestData(data);
    };
    fetchRequests();
  }, []);

  return (
    <div className="vreq">
      <div className="vreqHeader">
        <span>Access Requests</span>
      </div>

      <div className="vreqbody">
        {requestData.map((request) => (
          <div className="vreqcard">
            <div className="vreqcardHead">
              <div className="companylogo">
                <img src={image} alt="company-logo"></img>
              </div>
              <div className="headDesc">
                <span style={{ fontWeight: "bold" }}>
                  The Madras Branding Company{" "}
                </span>
                <br />
                <span>
                  {" "}
                  wants to view your employee's assessments and details
                </span>
              </div>
            </div>

            <div className="cardFooter">
              <button className="allow">
                Allow Access&nbsp;<img src={check} alt="check"></img>
              </button>
              <button className="deny">
                Deny&nbsp;<img src={close} alt="close"></img>
              </button>
            </div>
          </div>
        ))}

        {/* <div className="vreqcard">
          <div className="vreqcardHead">
            <div className="companylogo">
              <img src={image} alt="company-logo"></img>
            </div>
            <div className="headDesc">
              <span style={{ fontWeight: "bold" }}>
                The Madras Branding Company{" "}
              </span>
              <br />
              <span>
                {" "}
                wants to view your employee's assessments and details
              </span>
            </div>
          </div>

          <div className="cardFooter">
            <button className="allow">
              Allow Access&nbsp;<img src={check} alt="check"></img>
            </button>
            <button className="deny">
              Deny&nbsp;<img src={close} alt="close"></img>
            </button>
          </div>
        </div>

        <div className="vreqcard">
          <div className="vreqcardHead">
            <div className="companylogo">
              <img src={image} alt="company-logo"></img>
            </div>
            <div className="headDesc">
              <span style={{ fontWeight: "bold" }}>
                The Madras Branding Company{" "}
              </span>
              <br />
              <span>
                {" "}
                wants to view your employee's assessments and details
              </span>
            </div>
          </div>

          <div className="cardFooter">
            <button className="allow">
              Allow Access&nbsp;<img src={check} alt="check"></img>
            </button>
            <button className="deny">
              Deny&nbsp;<img src={close} alt="close"></img>
            </button>
          </div>
        </div>

        <div className="vreqcard">
          <div className="vreqcardHead">
            <div className="companylogo">
              <img src={image} alt="company-logo"></img>
            </div>
            <div className="headDesc">
              <span style={{ fontWeight: "bold" }}>
                The Madras Branding Company{" "}
              </span>
              <br />
              <span>
                {" "}
                wants to view your employee's assessments and details
              </span>
            </div>
          </div>

          <div className="cardFooter">
            <button className="allow">
              Allow Access&nbsp;<img src={check} alt="check"></img>
            </button>
            <button className="deny">
              Deny&nbsp;<img src={close} alt="close"></img>
            </button>
          </div>
        </div> 

        <div className="vreqcard">
          <div className="vreqcardHead">
            <div className="companylogo">
              <img src={image} alt="company-logo"></img>
            </div>
            <div className="headDesc">
              <span style={{ fontWeight: "bold" }}>
                The Madras Branding Company{" "}
              </span>
              <br />
              <span>
                {" "}
                wants to view your employee's assessments and details
              </span>
            </div>
          </div>

          <div className="cardFooter">
            <button className="allow">
              Allow Access&nbsp;<img src={check} alt="check"></img>
            </button>
            <button className="deny">
              Deny&nbsp;<img src={close} alt="close"></img>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
