import React from "react";
import { Tabs } from "antd";
import "../Verification/Verification.css";
import VerificationRequest from "../VerificationRequest/VerificationRequest";
import VerifiedPage from "../VerifiedPage/VerifiedPage";
import VerifyCandidate from "../VerifyCandidate/VerifyCandidate";

function Verification() {
  const items = [
    {
      key: "1",
      label: `Verification Request`,
      children: <VerificationRequest />,
    },
    {
      key: "2",
      label: `Verified Candidates`,
      children: <VerifiedPage />,
    },
    {
      key: "3",
      label: `Verify a candidate`,
      children: <VerifyCandidate />,
    },
  ];
  return (
    <div style={{ padding: "3vh" }}>
      <Tabs
        defaultActiveKey="1"
        centered
        items={items}
      />
      {/* <div>
          <Link to={"/verify-candidate"} className="add-verification">
            Verify a candidate
          </Link>
      </div> */}
    </div>
  );
}

export default Verification;
