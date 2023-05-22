import React from "react";
import "./Assessment.css";
import { Tabs } from 'antd';
import EmployeeAssesmentForm from "./EmployeeAssesmentForm";
import EmployeeSoftskills from "./EmployeeSoftskills";

function EmployeeAssessment() {

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Softskill`,
      children: <EmployeeSoftskills />,
    },
    {
      key: '2',
      label: `Assessment Form`,
      children: <EmployeeAssesmentForm />,
    }
  ];


  return (
    <div className="assesment container">
      <div className="back-cont">
        <div className="col">
        {sessionStorage.getItem("LoggedIn") === "Employer" ? 

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          :
          <EmployeeSoftskills />
        }
         </div>
      </div>
    </div>
  );
}
export default EmployeeAssessment;
