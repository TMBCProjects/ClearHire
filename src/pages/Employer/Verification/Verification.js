import { Empty } from 'antd'
import React from 'react'
import { readNotVerifiedVerifications } from "../../../DataBase/Employer/employer";
import { useEffect } from "react";
import { useState } from "react";

function Verification() {
  const [CandidateDetails, setCandidateDetails] = useState([]);
  useEffect(() => {
    const fetchVerificationDetails = async () => {
      try {
        const userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readNotVerifiedVerifications(
          userDatas.data.employerEmail
        );
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchVerificationDetails().then((data) => {
      setCandidateDetails(data);
    });
  }, []);
  return (
    <div>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No Records"
      />
    </div>
  );
}

export default Verification
