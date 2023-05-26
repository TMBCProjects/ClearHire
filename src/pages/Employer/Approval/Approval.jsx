import React from "react";
import { Link } from "react-router-dom";
import "./approval.css";
import { useState } from "react";
import { useEffect } from "react";
import { deleteOffer } from "../../../DataBase/Employer/employer";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { getDocuments, setCollection } from "../../../utils/FirebaseUtils";
import { onSnapshot, query, where } from "firebase/firestore";
import { Collections } from "../../../utils/Collections";
import { Fields } from "../../../utils/Fields";
import { Empty, Modal } from "antd";

const Approval = () => {
  const [offerReplies, setOfferReplies] = useState([]);
  const [notOnClearHire, setNotOnClearHire] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocuments(
          query(
            setCollection(Collections.offers),
            where(Fields.employerId, "==", userDatas.id),
            where(Fields.isActive, "==", true),
            where(Fields.isAccepted, "==", false)
          )
        );

        if (!querySnapshot) {
          console.error(
            "Error fetching access requests: querySnapshot is undefined"
          );
          return;
        }

        const offers = [];
        querySnapshot.forEach(async (doc) => {
          let offer = {
            id: doc.id,
            isActive: doc.data().isActive,
            isAccepted: doc.data().isAccepted,
            emailAvailable: doc.data().emailAvailable,
            companyName: doc.data().companyName,
            companyLogo: doc.data().companyLogo,
            employerEmail: doc.data().employerEmail,
            employerId: doc.data().employerId,
            employeeId: doc.data().employeeId,
            employeeEmail: doc.data().employeeEmail,
            employeeName: doc.data().employeeName,
            companyLocation: doc.data().companyLocation,
            dateOfJoining: doc.data().dateOfJoining,
            typeOfEmployment: doc.data().typeOfEmployment,
            designation: doc.data().designation,
            salary: doc.data().salary,
            offerLetter: doc.data().offerLetter,
          };
          offers.push(offer);
        });
        setOfferReplies(offers);
      } catch (error) {
        console.error("Error fetching access requests: ", error);
      }
    };

    const unsubscribe = onSnapshot(
      query(
        setCollection(Collections.offers),
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

  const handleDelete = (offerId) => {
    deleteOffer(offerId);
  };

  return (
    <div id="employer-approval" className="container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-4">
          <h3 className="fw-bold fs-30">Sent Offers (Pending)</h3>
        </div>
        <div className="col-8 d-flex justify-content-end align-items-center companyFilters mobileFilter">
          <div className="form-check form-check-inline mx-0 mx-md-3">
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
              On ClearHire
            </label>
          </div>

          <div className="form-check form-check-inline mx-0 mx-md-3">
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
              Not on ClearHire
            </label>
          </div>

          <div className="form-check form-check-inline">
            <Link to={"/onboarding-form"} className="btn add-recruit">
              <PlusOutlined
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              />{" "}
              Add Recruit
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {offerReplies && offerReplies.length > 0 ? (
          offerReplies
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
                      <h3 className="card-title fw-bold">
                        {info.employeeName}
                      </h3>
                      <p className="card-text designation w-75 mt-2">
                        {info.designation}
                      </p>
                      <p className="mb-1">{info.companyLocation}</p>
                      <p className="mb-1">{info.employeeEmail}</p>
                      <p className="mb-1">
                        {new Date(
                          info.dateOfJoining.seconds * 1000
                        ).toLocaleDateString("en-GB")}
                      </p>
                      <p className="mb-1">{info.salary} LPA</p>
                      <div className="row  mt-2">
                        <div className="col">
                          <p
                            className="text-color-green fs-13 fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => setModalOpen(true)}
                          >
                            <FileTextOutlined style={{ fontSize: "20px" }} />{" "}
                            View offer Letter
                          </p>
                          <Modal
                            title="OFFER LETTER"
                            centered
                            open={modalOpen}
                            onOk={() => setModalOpen(false)}
                            onCancel={() => setModalOpen(false)}
                            width={1000}
                          >
                            <embed
                              width={950}
                              height={680}
                              src={info.offerLetter}
                            />
                          </Modal>
                        </div>
                        <div className="col">
                          <button
                            onClick={() => {
                              handleDelete(info.id);
                            }}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Records"
          />
        )}
      </div>
    </div>
  );
};

export default Approval;
