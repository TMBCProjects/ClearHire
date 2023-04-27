import React from "react";
import { Link } from "react-router-dom";
import "./requests.css";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { Fields } from "../../../utils/Fields";
import { getDocuments, setCollection } from "../../../utils/FirebaseUtils";
import { Collections } from "../../../utils/Collections";
import { SendOutlined } from "@ant-design/icons";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [notOnClearHire, setNotOnClearHire] = useState(false);

  useEffect(() => {
    const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocuments(
          query(
            setCollection(Collections.requests),
            where(Fields.employerId, "==", userDatas.id),
            where(Fields.isActive, "==", true)
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
              employeeName: doc.data().employeeName,
              employerEmail: doc.data().employerEmail,
              employerId: doc.data().employerId,
              employeeId: doc.data().employeeId,
              employeeEmail: doc.data().employeeEmail,
              emailAvailable: doc.data().emailAvailable,
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

  return (
    <div id="employer-approval" className="container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6 ">
          <h3 className="fw-bold fs-30">Sent Approvals (Pending)</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-md-end justify-content-center align-items-center mobile-filters">
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              onClick={() => setNotOnClearHire(false)}
              checked={!notOnClearHire}
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
              onClick={() => setNotOnClearHire(true)}
              id="inlineRadio2"
              checked={notOnClearHire}
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio2"
            >
              Not on clearhire
            </label>
          </div>
          <div className="form-check form-check-inline">
            <Link to={"/approvalRequest-form"} className="btn add-recruit">
              <SendOutlined style={{ fontSize: "15px" }} /> Send Request
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {requests
          ?.filter((info) => {
            return notOnClearHire
              ? info.emailAvailable === false
              : info.emailAvailable === true;
          })
          .map((info) => {
            return (
              <div className="col-md-3 gy-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title fw-bold">{info.employeeName}</h3>
                    <p className="mb-1">{info.employeeEmail}</p>
                    {info.isApproved === true ? (
                      <Link
                        className="w-100 mt-3 btn"
                        to={{
                          pathname: "/ViewAssessment",
                        }}
                        state={{ from: info.employeeId }}
                      >
                        <button className="w-100 mt-3 btn btn-assessment">
                          View assessment
                        </button>
                      </Link>
                    ) : (
                      <button className="w-100 mt-3 btn btn-request-sent">
                        Request sent
                      </button>
                    )}
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

export default Requests;
