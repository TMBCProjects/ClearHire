import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import cross from "../../assets/images/cross.svg";
import { Select, Checkbox, Empty } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";

import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
const onChange = (e) => {
  // alert(`checked = ${e.target.checked}`);
};
// const formatter = (value) => `${value}LPA`;
// const formatter2 = (value) => `${value} %`;
// const marks = {
//   0: "1LPA",
//   50: "50LPA",
// };
// const marks2 = {
//   0: "0%",
//   100: "100%",
// };

// const myStyle = {
//   fontSize: "1.6rem",
//   fontWeight: "bolder",
//   letterSpacing: "-0.47x",
// };

const checkBoxStyles = {
  marginLeft: "0.5rem",
  fontSize: "1.1rem",
};

const initialValues = {
  typeOfEmployment: "",
  salary: "",
  location: "",
  designation: "",
};
export default function SearchEmployee() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [employeeList, setEmployeeList] = useState([]);
  const [filters, setFilters] = useState(initialValues);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchCollegueDetails = async () => {
      try {
        const user = sessionStorage.getItem("LoggedIn");
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = userDatas1.data.currentEmployerId
              ? await readColleagues(
                userDatas1.id,
                userDatas1.data.currentEmployerId
              )
              : [];
        setEmployeeList(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchEmployeeDetails = async () => {
      try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readEmployees(userDatas1.id);
        // console.log(data)
        setEmployeeList(data);
      } catch (error) {
        console.log(error);
      }
    };
    const user = sessionStorage.getItem("LoggedIn");
    user === "Employer"
      ? fetchEmployeeDetails()
      : fetchCollegueDetails();
  }, []);


  const handleSalaryChange = (event) => {
    filters.salary = event.target.value;
  };

  const handleDesignationChange = (event) => {
    filters.designation = event.target.value;
  };

  const handleLocationChange = (event) => {
    filters.location = event;
  };

  const handleSelectChange = (e) => {
    filters.typeOfEmployment = e;
  };

  const search = () => {
    console.log(filters)
  //   if (filters.location) {
  //     const filteredData = employeeList.filter((item) =>
  //       item.typeOfEmployment.toLowerCase().includes(filters.location)
  //     );
  //     setEmployeeList(filteredData);
  //   } else {
  //     setEmployeeList(filters);
  //   }
  //   setQuery(filters.location);

  //   if (filters.typeOfEmployment.length > 0) {
  //     const filteredData = employeeList.filter((item) =>
  //       item.typeOfEmployment.toLowerCase().includes(filters.typeOfEmployment)
  //     );
  //     setEmployeeList(filteredData);
  //   } else {
  //     setEmployeeList(filters);
  //   }
  //   setQuery(filters.typeOfEmployment);

  //   if (filters.designation.length > 0) {
  //     const filteredData = employeeList.filter((item) =>
  //       item.typeOfEmployment.toLowerCase().includes(filters.designation)
  //     );
  //     setEmployeeList(filteredData);
  //   } else {
  //     setEmployeeList(filters);
  //   }
  //   setQuery(filters.designation);

  //   if (filters.salary.length > 0) {
  //     const filteredData = employeeList.filter((item) =>
  //       item.typeOfEmployment.toLowerCase().includes(filters.salary)
  //     );
  //     setEmployeeList(filteredData);
  //   } else {
  //     setEmployeeList(filters);
  //   }
  //   setQuery(filters.salary);
  };

  return (
    <div className="employer-home">
      <div className="search-inputs" style={{ position: "absolute" }}>
        <div className="input-box1 input-box">
          <img src={search1} alt="Search" />
          <input
            type="text"
            onChange={(e) => handleDesignationChange(e)}
            className="box-input"
            placeholder="Job title, company and keyword"
          />
        </div>
        {user === "Employer" ? (
          <div className="input-box2 input-box">
            <img src={location} alt="Search" />
            <Select
              onChange={(e) => { handleLocationChange(e) }}
              className="box-select"
              placeholder="Location"
              options={[{ value: "", label: "" }].concat(userDatas.data.companyLocations.map((option) => ({
                value: option,
                label: option,
              })))}
            />
          </div>
        ) : (
          ""
        )}
        <div className="input-box3 input-box">
          <img src={job} alt="Search" />
          <Select
            type="text"
            onChange={(e) => { handleSelectChange(e) }}
            className="box-select"
            placeholder="Job Type"
            options={[
              { value: "", label: "" },
              { value: "Permanent Full-Time", label: "Permanent Full-Time" },
              { value: "Part-Time", label: "Part-Time" },
              { value: "Casual/Vacation", label: "Casual/Vacation" },
              { value: "Contract", label: "Contract" },
              { value: "Internship/Trainee", label: "Internship/Trainee" },
            ]}
          />
        </div>
        {user === "Employer" ? (
          <div className="input-box4 input-box ">
            <img src={salary} alt="Search" />
            <input
              type="text"
              className="box-input no-border"
              placeholder="Salary"
              onChange={(e) => handleSalaryChange(e)}
            />
          </div>
        ) : (
          ""
        )}
        <button onClick={search}>Search</button>
      </div>
      <div className="search-results">
        <div className="result-employees">
          <div className="row1">
            {user === "Employer" ? (
              <div className="row1-checkboxes">
                <Checkbox style={checkBoxStyles} onChange={(e) => onChange(e)}>
                  Assessed
                </Checkbox>
                <Checkbox style={checkBoxStyles} onChange={(e) => onChange(e)}>
                  Pending
                </Checkbox>
                <Checkbox style={checkBoxStyles} onChange={(e) => onChange(e)}>
                  All
                </Checkbox>
              </div>
            ) : (
              ""
            )}
            <div className="result-count">
              {employeeList.length > 1 ? `${employeeList.length} records` : ""}
            </div>
          </div>
          <div
            className="row2"
            style={
              employeeList.length === 0 ? { justifyContent: "center" } : {}
            }
          >
            {employeeList.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Records"
              />
            )}
            {employeeList
              .filter(item => {
                const { typeOfEmployment, designation, salary, location } = filters;
                return (
                  (typeOfEmployment === "" || item.typeOfEmployment.toLowerCase() === typeOfEmployment.toLowerCase()) &&
                  (designation === "" || item.designation.toLowerCase() === designation.toLowerCase()) &&
                  (salary === "" || +item?.salary <= +salary) &&
                  (location === "" || item.companyLocation.toLowerCase() === location.toLowerCase())
                );
              })
              .map((info) => {
                return (
                  <AssesmentCard
                    info={info}
                    employerId={userDatas.id}
                    name={info.employeeName}
                    companyLocation={info.companyLocation}
                    designation={info.designation}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
