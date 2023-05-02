import React, { useEffect, useState } from "react";
import "./styles.css";
import search from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import cross from "../../assets/images/cross.svg";
import { Select, Checkbox, Slider } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";

import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
const formatter = (value) => `${value}LPA`;
// const formatter2 = (value) => `${value} %`;
const marks = {
  0: "1LPA",
  50: "50LPA",
};
const marks2 = {
  0: "0%",
  100: "100%",
};

const initialValues = {
  typeOfEmployment: {
    "Permanent Full-Time": false,
    "Part-Time": false,
    "Contact": false,
    "Casual/Vacation": false,
    "Internship/Trainee": false,
  },
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
  };

  const handleSalaryChange = (event) => {
    filters.salary = event.target.value;
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

  const handleDesignationChange = (event) => {
    filters.designation = event.target.value;
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
  };

  const handleLocationChange = (event) => {
    filters.location = event.target.value;
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
  };


  // const onTypeOfEmploymentChange = (value) => {
  //   const updatedTypeOfEmployment = {
  //     ...filters.typeOfEmployment,
  //     [value.target.value]: value.target.checked,
  //   };
  //   setFilters({ ...filters, typeOfEmployment: updatedTypeOfEmployment });
  // };

  return (
    <div className="employer-home">
      <div className="search-inputs">
        <div className="input-box1 input-box">
          <img src={search} alt="Search" />
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
        <button>Search</button>
      </div>
      <div className="search-results">
        <div className="search-settings">
          <p
            style={{
              fontSize: "1.6rem",
              fontWeight: "bolder",
              letterSpacing: "-.47x",
            }}
          >
            {user === "Employer" ? "Employee" : "Colleague"} Search Settings
          </p>
          <div className="dropdowns">
            <div className="dropdown-select">
              <p>Job Title</p>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(e) => {
                  setFilters({ ...filters, designation: e });
                }}
                options={[
                  { value: "", label: "" },
                  { value: "Graphics Designer", label: "Graphics Designer" },
                  { value: "Developer", label: "Developer" },
                  { value: "Video Editor", label: "Video Editor" },
                ]}
              />
            </div>
            {user === "Employer" && (
              <div className="dropdown-select">
                <p>Location</p>
                <Select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => setFilters({ ...filters, location: e })}
                  tokenSeparators={[","]}
                  options={userDatas.data.companyLocations.map((location) => ({
                    value: location,
                    label: location,
                  }))}
                />
              </div>
            )}
          </div>
          <div className="checkboxes">
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "bolder",
                letterSpacing: "-.47x",
              }}
            >
              Type of employement
            </p>
            <div className="checkboxes-div">
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                // onChange={onTypeOfEmploymentChange}
                // checked={filters.typeOfEmployment["Permanent Full-Time"]}
              >
                Permanent Full-Time
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                // checked={filters.typeOfEmployment["Part-Time"]}
                // onChange={onTypeOfEmploymentChange}
              >
                Part-Time
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                // onChange={onTypeOfEmploymentChange}
                // checked={filters.typeOfEmployment["Casual/Vacation"]}
              >
                Casual/Vacation
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                // onChange={onTypeOfEmploymentChange}
                // checked={filters.typeOfEmployment["Contract"]}
              >
                Contract
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                // onChange={onTypeOfEmploymentChange}
                // checked={filters.typeOfEmployment["Internship/Trainee"]}
              >
                Internship/Trainee
              </Checkbox>
            </div>
          </div>
          {user === "Employer" ? (
            <div className="ranges">
              <p
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "bolder",
                  letterSpacing: "-.47x",
                }}
              >
                Salary Range
              </p>
              <div
                className="ranges-div"
                style={{
                  width: "100%",
                }}
              >
                <Slider
                  tooltip={{
                    formatter,
                  }}
                  marks={marks}
                  min={1}
                  max={50}
                  // range
                  // defaultValue={[20, 50]}
                  onChange={(e) =>
                    setFilters({ ...filters, salary: +e * 100000 })
                  }
                  trackStyle={{
                    backgroundColor: "#00823B",
                    height: ".3rem",
                  }}
                  handleStyle={{
                    backgroundColor: "red",
                  }}
                />
                {/* <Slider
                  tooltip={{
                    formatter2,
                  }}
                  marks={marks2}
                  trackStyle={{
                    backgroundColor: "#00823B",
                    height: ".3rem",
                  }}
                /> */}
              </div>
            </div>
          ) : (
            ""
          )}
          <p
            href="#"
            className="clear-filter"
            onClick={() =>
              setFilters({
                typeOfEmployment: "",
                salary: "",
                location: "",
                designation: "",
              })
            }
          >
            {" "}
            <img src={cross} alt="cross" /> Clear all filters
          </p>
        </div>
        <div className="result-employees">
          <div className="row1">
            {user === "Employer" ? (
              <div className="row1-checkboxes">
                <Checkbox
                  style={{
                    marginLeft: ".5rem",
                    fontSize: "1.1rem",
                  }}
                  // onChange={onChange}
                >
                  Assessed
                </Checkbox>
                <Checkbox
                  style={{
                    marginLeft: ".5rem",
                    fontSize: "1.1rem",
                  }}
                  // onChange={onChange}
                >
                  Pending
                </Checkbox>
                <Checkbox
                  style={{
                    marginLeft: ".5rem",
                    fontSize: "1.1rem",
                  }}
                  // onChange={onChange}
                >
                  All
                </Checkbox>
              </div>
            ) : (
              ""
            )}
            <div className="result-count">
              {employeeList.length > 1
                ? `${employeeList.length} records`
                : `${employeeList.length} record`}
            </div>
          </div>
          <div className="row2">
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
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
