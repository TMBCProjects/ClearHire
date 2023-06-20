import React, { useEffect, useState } from "react";
import "./VerficationRequest.css";
import image from "../../../assets/images/Image.png";
import check from "../../../assets/images/checkfull.svg";
import close from "../../../assets/images/closebtn.svg";
import { Empty } from "antd";
import {
  acceptRequest,
  getRequests,
  rejectRequest,
} from "../../../DataBase/Employee/employee";
import emailjs from "emailjs-com";
export default function VerficationRequest() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getRequests(userDatas.data.employeeEmail);
      setRequestData(data);
    };
    fetchRequests();
  }, [userDatas]);

  const allowAccess = (e) => {
    acceptRequest(userDatas.id, requestData[0].id);
    e.preventDefault();

    emailjs
    .sendForm(
        "service_cpytsjm",
        "template_6yal3s3",
        e.target,
        "F3rrwZwcav-0a-BOW"
    )
    .then(
        (result) => {
            console.log(result.text);
        },
        (error) => {
            console.log(error.text);
        }
    );

  };
  const denyAccess = (data) => {
    rejectRequest(data);
  };
  return (
    <div className="vreq">
      <div className="vreqHeader">
        <span>Access Requests</span>
      </div>
      <form 
      onSubmit={allowAccess}
      >
        <div style={{visibility: "hidden"}}>
        <input name="name" value={userDatas.data.employeeName} />
        <input name="email" value={"scintillantmail@gmail.com"} />
        </div>
      <div
        className="vreqbody"
        style={{
          justifyContent: `${requestData.length === 0 ? "center" : ""}`,
        }}
      >
        {requestData.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Requests"
          />
        )}
        {requestData.map((request) => (
          <div className="vreqcard">
            <div className="vreqcardHead">
              <div className="companylogo">
                <img
                  src={request.companyLogo || image}
                  alt="company-logo"
                ></img>
              </div>
              <div className="headDesc">
                <span style={{ fontWeight: "bold" }}>
                  {request.companyName}{" "}
                </span>
                <br />
                <span>
                  {" "}
                  wants to view your employee's assessments and details
                </span>
              </div>
            </div>

            <div className="cardFooter">
              <button className="allow" 
              // onClick={(e) => allowAccess(e,request.id)}
              type="submit"
              >
                Allow Access&nbsp;<img src={check} alt="check"></img>
              </button>
              <button className="deny"
               onClick={() => denyAccess(request.id)}>
                Deny&nbsp;<img src={close} alt="close"></img>
              </button>
            </div>
          </div>
        ))}
      </div>
      </form>
    </div>
  );
}
