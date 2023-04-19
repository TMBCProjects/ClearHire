import React from "react";
import { Link } from "react-router-dom";
import Add from "../../../assets/images/add.svg";
import View from "../../../assets/images/view-doc.svg";
import "./approval.css";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  readOfferReplies,
  sendRequestToViewAssesment,
} from "../../../DataBase/Employer/employer";

import { onSnapshot, query, where } from "firebase/firestore";
import { Fields } from "../../../utils/Fields";
import { getDocuments, setCollection } from "../../../utils/FirebaseUtils";
import { Collections } from "../../../utils/Collections";

const Approval = () => {
  const [requests, setRequests] = useState([]);
  const [offerReplies, setOfferReplies] = useState([]);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      const userDatas = JSON.parse(sessionStorage.getItem("userData"));
      const data = await readOfferReplies(userDatas.id);
      setOfferReplies(data);
    };
    fetchOfferDetails();
  }, []);
  useEffect(() => {
    const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocuments(
          query(
            setCollection(Collections.requests),

            where(Fields.employerId, "==", userDatas.id),
            where(Fields.isActive, "==", true),
          )
        );

        if (!querySnapshot) {
          console.error(
            "Error fetching access requests: querySnapshot is undefined"
          );
          return;
        }

        const requestsData = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const request = {
              id: doc.id,
              isActive: doc.data().isActive,
              isApproved: doc.data().isApproved,
              companyName: doc.data().companyName,
              companyLogo: doc.data().companyLogo,
              employerEmail: doc.data().employerEmail,
              employerId: doc.data().employerId,
              employeeEmail: doc.data().employeeEmail,
              employeeId: doc.data().employeeId,
              offerId: doc.data().offerId,
            };
            requestsData.push(request);
          } else {
            console.error("Document does not exist");
          }
        });
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching access requests: ", error);
      }
    };

    const unsubscribe = onSnapshot(
      query(
        setCollection(Collections.requests),
        where(Fields.employerId, "==", userDatas.id)
      ),
      { includeMetadataChanges: true },
      () => {
        fetchRequests();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const sentRequest = async (data) => {
    let userDetails = JSON.parse(sessionStorage.getItem("userData")).data;
    let newRequest = {
      isApproved: false,
      companyName: userDetails.companyName,
      companyLogo: userDetails.companyLogo,
      employerEmail: userDetails.employerEmail,
      employerId: data.employerId,
      employeeEmail: data.employeeEmail,
      employeeId: data.id,
      requestId: `req-${uuid(6)}`,
    };
    // console.log(newRequest);
    await sendRequestToViewAssesment(newRequest);
  };


  return (
    <div id="employer-approval" className="container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Sent Approvals (Pending)</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="option1"
              checked
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio1"
            >
              All
            </label>
          </div>
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              defaultValue="option2"
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio2"
            >
              Fresher
            </label>
          </div>
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              defaultValue="option3"
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio3"
            >
              Not on clearhire
            </label>
          </div>
          <div className="form-check form-check-inline">
            <Link to={"/onboarding-form"} className="btn add-recruit">
              <img src={Add} className="mr-5 add-icon" alt="addIcons" /> New
              Recruit
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {offerReplies?.map((info) => {
          return (
            <div className="col-md-3 gy-3">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title fw-bold">{info.employeeName}</h3>
                  <p className="card-text designation w-50 mt-2">
                    {info.designation}
                  </p>
                  <p className="mb-1">
                    {info.employeeState}, {info.employeeCountry}
                  </p>
                  <p className="mb-1">{info.employeeEmail}</p>
                  <p className="mb-1">{info.dateOfJoining}</p>
                  <p className="mb-1">{info.salary}</p>
                  <div className="row  mt-2">
                    <div className="col">
                      <p className="text-color-green fs-13 fw-bold">
                        <img className="mr-5" src={View} alt="" /> View offer
                        Letter
                      </p>
                    </div>
                    <div className="col">
                      <button className="delete-btn">Delete</button>
                    </div>
                    {

                      requests.find((req) => req.employeeId === info.id)?.isApproved

                        ?
                        <Link
                          className="w-100 mt-3 btn"
                          to={{
                            pathname: "/employee-details",
                          }}
                          state={{ from: info.employeeId }}>
                        <button className="w-100 mt-3 btn btn-assessment">
                          View assessment
                          </button>
                        </Link>
                        :
                        <button className="w-100 mt-3 btn btn-request-sent">
                          Request sent
                        </button>
                    }
                    {
                      !requests.find((req) => req.offerId === info.id) && 
                      <button className="w-100 mt-3 btn btn-request" onClick={() => {
                        sentRequest(info)
                      }}>
                        Request to view assessment
                      </button>
                    }
                  
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-assessment">
                View assessment
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-request-sent">
                Request sent
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-fresher">Fresher</button>
            </div>
          </div>
        </div>

        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-clearhire">
                Not on clearhire
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Approval;
