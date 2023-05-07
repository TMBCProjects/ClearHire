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
const formatter = (value) => `${value}LPA`;
const formatter2 = (value) => `${value} %`;
const marks = {
  0: "1LPA",
  50: "50LPA",
};
const marks2 = {
  0: "0%",
  100: "100%",
};

const myStyle = {
  fontSize: "1.6rem",
  fontWeight: "bolder",
  letterSpacing: "-0.47x",
};

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

  // fetch employer details
  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        const user = sessionStorage.getItem("LoggedIn");
        const data =
          user === "Employer"
            ? await readEmployees(userDatas.id)
            : userDatas.data.currentEmployerId
            ? await readColleagues(
                userDatas.id,
                userDatas.data.currentEmployerId
              )
            : [];
        setEmployeeList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployerDetails();
  }, [userDatas]);

  const handleTypeOfEmploymentChange = (event) => {
    filters.typeOfEmployment = event.target.value;
  };

  const handleSalaryChange = (event) => {
    filters.salary = event.target.value;
  };

  const handleDesignationChange = (event) => {
    filters.designation = event.target.value;
  };

  const handleLocationChange = (event) => {
    filters.location = event.target.value;
  };

  const search = () => {
    if (filters.location) {
      const filteredData = employeeList.filter((item) =>
        item.typeOfEmployment.toLowerCase().includes(filters.location)
      );
      console.log("location", filteredData);
      setEmployeeList(filteredData);
    } else {
      setEmployeeList(filters);
    }
    setQuery(filters.location);

    if (filters.typeOfEmployment.length > 0) {
      const filteredData = employeeList.filter((item) =>
        item.typeOfEmployment.toLowerCase().includes(filters.typeOfEmployment)
      );
      console.log("Employment", filteredData);
      setEmployeeList(filteredData);
    } else {
      setEmployeeList(filters);
    }
    setQuery(filters.typeOfEmployment);

    if (filters.designation.length > 0) {
      const filteredData = employeeList.filter((item) =>
        item.typeOfEmployment.toLowerCase().includes(filters.designation)
      );
      console.log("designation", filteredData);
      setEmployeeList(filteredData);
    } else {
      setEmployeeList(filters);
    }
    setQuery(filters.designation);

    if (filters.salary.length > 0) {
      const filteredData = employeeList.filter((item) =>
        item.typeOfEmployment.toLowerCase().includes(filters.salary)
      );
      console.log("salary", filteredData);
      setEmployeeList(filteredData);
    } else {
      setEmployeeList(filters);
    }
    setQuery(filters.salary);
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
            <input
              type="text"
              onChange={(e) => handleLocationChange(e)}
              className="box-input"
              placeholder="Location"
            />
          </div>
        ) : (
          ""
        )}
        <div className="input-box3 input-box">
          <img src={job} alt="Search" />
          <input
            type="text"
            onChange={(e) => handleTypeOfEmploymentChange(e)}
            className="box-input"
            placeholder="Job Type"
          />
        </div>
        {user === "Employer" ? (
          <div className="input-box4 input-box">
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
                <Checkbox style={checkBoxStyles} onChange={onChange}>
                  Assessed
                </Checkbox>
                <Checkbox style={checkBoxStyles} onChange={onChange}>
                  Pending
                </Checkbox>
                <Checkbox style={checkBoxStyles} onChange={onChange}>
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
            style={employeeList.length === 0 ?  {justifyContent: 'center'}:{} }
          >
            {employeeList.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Records"
              />
            )}
            {employeeList
              .filter((item) => {
                return (
                  (filters.typeOfEmployment.toLowerCase() === "" ||
                    item.typeOfEmployment.toLowerCase() ===
                      filters.typeOfEmployment.toLowerCase()) &&
                  (filters.designation.toLowerCase() === "" ||
                    item.designation.toLowerCase() ===
                      filters.designation.toLowerCase()) &&
                  (filters.salary === "" || +item.salary <= +filters.salary) &&
                  (filters.location.toLowerCase() === "" ||
                    item.companyLocation.toLowerCase() ===
                      filters.location.toLowerCase())
                );
              })
              .map((info) => {
                return (
                  <AssesmentCard
                    value={30}
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
