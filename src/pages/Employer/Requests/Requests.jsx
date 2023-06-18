import React from "react";
import { Link } from "react-router-dom";
import "./requests.css";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { Fields } from "../../../utils/Fields";
import { getDocuments, setCollection } from "../../../utils/FirebaseUtils";
import { Collections } from "../../../utils/Collections";
import { FilterOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Empty, Space } from "antd";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [notOnClearHire, setNotOnClearHire] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = () => {
    setMenuOpen(true);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Drawer
        title="Filter By Company"
        placement={"bottom"}
        width={500}
        onClose={onMenuClose}
        open={menuOpen}
      >
        <div className="form-check form-check-inline mx-3 d-block">
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

        <div className="form-check form-check-inline mx-3  d-block">
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
        <Space className="mt-3 d-flex justify-content-end">
          <Button onClick={onMenuClose}>Cancel</Button>
          <Button type="primary" onClick={onMenuClose}>
            OK
          </Button>
        </Space>
      </Drawer>
      <div id="employer-approval" className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-6 ">
            <h3 className="fw-bold fs-30">Sent Approvals (Pending)</h3>
          </div>
          <div className="col-6 d-flex justify-content-md-center justify-content-md-between align-items-center filter">
            {isMobile ? (
              <FilterOutlined style={{ width: "25px" }} onClick={showMenu} />
            ) : (
              <>
                <div className="form-check form-check-inline mx-3 requestFilters">
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

                <div className="form-check form-check-inline mx-3 requestFilters">
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
              </>
            )}
            <div className="form-check form-check-inline">
              <Link to={"/approvalRequest-form"} className="btn add-recruit">
                <SendOutlined style={{ fontSize: "15px" }} /> Send Request
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {requests.length > 0 ? (
            requests
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
                        <p className="mb-1">{info.employeeEmail}</p>
                        {info.isApproved === true ? (
                          <Link
                            className="w-100 mt-3 btn"
                            to={{
                              pathname: "/ViewEmployeeProfile",
                            }}
                            state={{ from: info.employeeId }}
                          >
                            <button className="w-100 mt-3 btn btn-assessment">
                              View Employee Profile
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
              })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Records"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Requests;
