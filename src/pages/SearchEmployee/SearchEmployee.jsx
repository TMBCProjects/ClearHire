import React, { useEffect, useState } from "react";
import "./styles.css";
import search from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import cross from "../../assets/images/cross.svg";
import { Select, Checkbox, Slider } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";
import { readEmployeeDetails } from "../../DataBase/Employee/employee";

import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const formatter = (value) => `${value}LPA`;
const formatter2 = (value) => `${value} %`;
const marks = {
  0: "1LPA",
  49: "50LPA",
};
const marks2 = {
  0: "0%",
  100: "100%",
};
const options = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "tom",
    label: "Tom",
  },
];
export default function SearchEmployee() {
  const user = sessionStorage.getItem("LoggedIn");
  const [employee, setEmployee] = useState([]);
  const [employeeList, setEmployeeList] = useState([])


  // function to fetch the employers data
  const handleEmployeeDetails = async () => {
    try {
      const data = await readEmployeeDetails();
      setEmployee(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchEmployerDetails = async () => {
      handleEmployeeDetails();
      const user = sessionStorage.getItem("LoggedIn")
      const userDatas = JSON.parse(sessionStorage.getItem("userData"))
      const data = user === "Employer" ? await readEmployees(userDatas.id) : userDatas.data.currentEmployerId ? await readColleagues(userDatas.data.currentEmployerId) : [{}];
      setEmployeeList(data);
    };
    fetchEmployerDetails();
  });
  return (
    <div className="employer-home">
      <div className="search-inputs">
        <div className="input-box1 input-box">
          <img src={search} alt="Search" />
          <input
            type="text"
            className="box-input"
            placeholder="Job title, company and keyword"
          />
        </div>
        {user === "Employer" ? (
          <div className="input-box2 input-box">
            <img src={location} alt="Search" />
            <input type="text" className="box-input" placeholder="Location" />
          </div>
        ) : (
          ""
        )}
        <div className="input-box3 input-box">
          <img src={job} alt="Search" />
          <input type="text" className="box-input" placeholder="Job Type" />
        </div>
        {user === "Employer" ? (
          <div className="input-box4 input-box">
            <img src={salary} alt="Search" />
            <input
              type="text"
              className="box-input no-border"
              placeholder="Salary"
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
                mode="tags"
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div className="dropdown-select">
              <p>Categories</p>
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={options}
              />
            </div>
            <div className="dropdown-select">
              <p>Location</p>
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={options}
              />
            </div>
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
                onChange={onChange}
              >
                Permanent Full-Time
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                onChange={onChange}
              >
                Part-Time
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                onChange={onChange}
              >
                Casual/Vacation
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                onChange={onChange}
              >
                Contact
              </Checkbox>
              <Checkbox
                style={{
                  marginLeft: ".5rem",
                  fontSize: "1.1rem",
                }}
                onChange={onChange}
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
                  trackStyle={{
                    backgroundColor: "#00823B",
                    height: ".3rem",
                  }}
                  handleStyle={{
                    backgroundColor: "red",
                  }}
                />
                <Slider
                  tooltip={{
                    formatter2,
                  }}
                  marks={marks2}
                  trackStyle={{
                    backgroundColor: "#00823B",
                    height: ".3rem",
                  }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <a className="clear-filter" href="/">
            {" "}
            <img src={cross} alt="cross" /> Clear all filters
          </a>
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
                  onChange={onChange}
                >
                  Assessed
                </Checkbox>
                <Checkbox
                  style={{
                    marginLeft: ".5rem",
                    fontSize: "1.1rem",
                  }}
                  onChange={onChange}
                >
                  Pending
                </Checkbox>
                <Checkbox
                  style={{
                    marginLeft: ".5rem",
                    fontSize: "1.1rem",
                  }}
                  onChange={onChange}
                >
                  All
                </Checkbox>
              </div>
            ) : (
              ""
            )}
            <div className="result-count">56 results</div>
          </div>
          <div className="row2">
            {employeeList.map((info) => {
              return <AssesmentCard value={30} name={info.employeeName} state={info.employeeState} country={info.employeeCountry} designation={info.designation} />
            })}
          
          </div>
        </div>
      </div>
    </div>
  );
  
}

