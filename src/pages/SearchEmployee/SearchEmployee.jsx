import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import { Select, Empty } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";
import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
// const onChange = (e) => {
//   alert(`checked = ${e.target.checked}`);
// };

// const checkBoxStyles = {
//   marginLeft: "0.5rem",
//   fontSize: "1.1rem",
// };

export default function SearchEmployee() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [employeeList, setEmployeeList] = useState([]);
  const [filters, setFilters] = useState({
    typeOfEmployment: "",
    salary: "",
    location: "",
    designation: "",
  });
  useEffect(() => {
    const fetchCollegueDetails = async () => {
      try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = userDatas1.data.currentEmployerId
          ? await readColleagues(
              userDatas1.id,
              userDatas1.data.currentEmployerId
            )
          : [];
        return data;
      } catch (error) {
        console.log(error);
      }
      
    };
    const fetchEmployeeDetails = async () => {
      try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readEmployees(userDatas1.id);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    if (user === "Employer") {
      fetchEmployeeDetails().then((data) => {
        setEmployeeList(data);
      });
    } else {
      fetchCollegueDetails().then((data) => {
        setEmployeeList(data);
      });
    }
  }, [user]);

  const handleInputChange = (event, field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: event.target ? event.target.value : event,
    }));
  };

  return (
    <div className="employer-home">
      {
        user === "Employer" && (
          <div
            className="search-inputs mobile-filters"
            style={{ position: "absolute" }}>
            <div className="input-box1 input-box">
              <img
                src={search1}
                alt="Search"
              />
              <input
                type="text"
                name="designation"
                onChange={(e) => {
                  handleInputChange(e, e.target.name);
                }}
                className="box-input"
                placeholder="Job Title / Designation"
              />
            </div>
            <div className="input-box2 input-box">
              <img
                src={location}
                alt="Search"
              />
              <Select
                onChange={(e) => {
                  handleInputChange(e, "location");
                }}
                className="box-select"
                placeholder="Location"
                options={[{ value: "", label: "" }].concat(
                  userDatas.data.companyLocations.map((option) => ({
                    value: option,
                    label: option,
                  }))
                )}
              />
            </div>
            <div className="input-box3 input-box">
              <img
                src={job}
                alt="Search"
              />
              <Select
                type="text"
                onChange={(e) => {
                  handleInputChange(e, "typeOfEmployment");
                }}
                className="box-select"
                placeholder="Type Of Employment"
                options={[
                  { value: "Any", label: "Any" },
                  { value: "Permanent Full-Time", label: "Permanent Full-Time" },
                  { value: "Part-Time", label: "Part-Time" },
                  { value: "Casual/Vacation", label: "Casual/Vacation" },
                  { value: "Contract", label: "Contract" },
                  { value: "Internship/Trainee", label: "Internship/Trainee" },
                ]}
              />
            </div>
            <div className="input-box4 input-box ">
              <img
                src={salary}
                alt="Search"
              />
              <input
                type="text"
                className="box-input no-border"
                name="salary"
                placeholder="Salary"
                onChange={(e) => handleInputChange(e, e.target.name)}
              />
            </div>
          </div>
        )}
      {user === "Employee" && (
        <div
          className="search-inputs mobile-filters"
          style={{ position: "absolute" }}>
          <div className="input-box1 input-box">
            <img
              src={search1}
              alt="Search"
            />
            <input
              type="text"
              name="designation2"
              onChange={(e) => {
                handleInput2Change(e, e.target.name);
              }}
              className="box-input"
              placeholder="Job Title / Designation"
            />
          </div>
          <div className="input-box3 input-box">
            <img
              src={job}
              alt="Search"
            />
            <Select
              type="text"
              onChange={(e) => {
                handleInput2Change(e, "typeOfEmployment2");
              }}
              className="box-select"
              defaultValue={"Any"}
              placeholder="Type Of Employment"
              options={[
                { value: "Any", label: "Any" },
                { value: "Permanent Full-Time", label: "Permanent Full-Time" },
                { value: "Part-Time", label: "Part-Time" },
                { value: "Casual/Vacation", label: "Casual/Vacation" },
                { value: "Contract", label: "Contract" },
                { value: "Internship/Trainee", label: "Internship/Trainee" },
              ]}
            />
          </div>
        </div>
      )}
      <div className="search-results">
        <div className="result-employees">
          <div className="row1">
            {/* {user === "Employer" ? (
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
            )} */}
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
              ?.filter((item) => {
                const { typeOfEmployment, designation, salary, location } = filters;
                const { typeOfEmployment2, designation2 } = filters2;
                if (user === "Employer") {
                  return (
                    (typeOfEmployment === "Any" || item.typeOfEmployment.toLowerCase() === typeOfEmployment.toLowerCase()) &&
                    (designation === "" || item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                    (salary === "" || +item?.salary <= +salary) &&
                    (location === "" || item.companyLocation.toLowerCase() === location.toLowerCase())
                  );
                } else if (user === "Employee") {
                  return (
                    (item?.companyLocation === userDatas.data?.companyLocation) &&
                    (typeOfEmployment2 === "Any" || item.typeOfEmployment === typeOfEmployment2) &&
                    (designation2 === "" || item.designation.toLowerCase().includes(designation2.toLowerCase()))
                  );
                }
                return true;
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
