import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import { Select, Empty } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";
import { useQuery } from "react-query";
import { fetchCollegueDetails, fetchEmployeeDetails } from "./helper";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
import { readColleagues } from "../../DataBase/Employee/employee";
import { readEmployees } from "../../DataBase/Employer/employer";
const { Meta } = Card;

export default function SearchEmployee() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [employeeList, setEmployeeList] = useState([])

  const { data: employesData, error1, isLoading: isEmployeesLoading } = useQuery('fetchemployee', fetchEmployeeDetails, {
    enabled: user === 'Employer',

  })
  const { data: colleguesData, error2, isLoading: isColleguesLoading } = useQuery('fetchcollegues', fetchCollegueDetails, {
    enabled: user === 'Employee',
  })

  useEffect(() => {
    if (employesData?.length > 0) setEmployeeList(employesData)
    if (colleguesData?.length > 0) setEmployeeList(colleguesData)
  }, [employesData, colleguesData]);

  const handleFilters = (event, field) => {
    let filterValue = event.target ? event.target.value : event
    let isEmployer = user === 'Employer'
    if (filterValue === 'clear') {
      if (isEmployer) setEmployeeList(employesData)
      else setEmployeeList(colleguesData)
      return
    }
    if (field === 'typeOfEmployment') {
      setEmployeeList(() => {
        if (isEmployer) {
          return employesData.filter((item) => filterValue === "" || item.typeOfEmployment.toLowerCase() ===
            filterValue.toLowerCase())
        } else {
          return colleguesData.filter((item) => filterValue === "" || item.typeOfEmployment.toLowerCase() ===
            filterValue.toLowerCase())
        }

      })
    }
    else if (field === 'salary') {
      setEmployeeList(() => {
        if (isEmployer) {
          return employesData.filter((item) => filterValue === "" || item.salary.toLowerCase() ===
            filterValue.toLowerCase())
        } else {
          return colleguesData.filter((item) => filterValue === "" || item.salary.toLowerCase() ===
            filterValue.toLowerCase())
        }

      })
    }
    else if (field === 'designation') {
      setEmployeeList(() => {
        if (isEmployer) {
          return employesData.filter((item) => filterValue === "" || item.designation.toLowerCase() ===
            filterValue.toLowerCase())
        } else {
          return colleguesData.filter((item) => filterValue === "" || item.designation.toLowerCase() ===
            filterValue.toLowerCase())
        }

      })
    const fetchCollegueDetails = async () => {
      try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readColleagues(userDatas1.id, userDatas1.data.currentEmployerId);
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
    }
    else if (field === 'location') {
      setEmployeeList(() => {
        if (isEmployer) {
          return employesData.filter((item) => filterValue === "" || item.location.toLowerCase() ===
            filterValue.toLowerCase())
        } else {
          return colleguesData.filter((item) => filterValue === "" || item.location.toLowerCase() ===
            filterValue.toLowerCase())
        }

      })

    }
    else {
      fetchCollegueDetails().then((data) => {
        setEmployeeList(data);
      });
    }
    
  };

  return (
    <div className="employer-home">
      <div className="search-inputs mobile-filters">
        <div className="input-box1 input-box">
          <img src={search1} alt="Search" />
          <input
            type="text"
            name="designation"
            onChange={(e) => handleFilters(e, e.target.name)}
            className="box-input"
            placeholder="Job Title / Designation"
          />
        </div>
        {user === "Employer" && (
          <div className="input-box2 input-box">
            <img src={location} alt="Search" />
            <Select
              onChange={(e) => {
                handleFilters(e, "location");
              }}
              className="box-select"
              placeholder="Location"
              options={[{ value: "", label: "" }].concat(
                userDatas?.data?.companyLocations.map((option) => ({
                  value: option,
                  label: option,
                }))
              )}
            />
          </div>
        )}
        <div className="input-box3 input-box">
          <img src={job} alt="Search" />
          <Select
            type="text"
            onChange={(e) => {
              handleFilters(e, "typeOfEmployment");
            }}
            className="box-select"
            placeholder="Type Of Employment"
            options={[
              { value: "clear", label: "All" },
              { value: "Permanent Full-Time", label: "Permanent Full-Time" },
              { value: "Part-Time", label: "Part-Time" },
              { value: "Casual/Vacation", label: "Casual/Vacation" },
              { value: "Contract", label: "Contract" },
              { value: "Internship/Trainee", label: "Internship/Trainee" },
            ]}
          />
        </div>
        {user === "Employer" && (
          <div className="input-box4 input-box ">
            <img src={salary} alt="Search" />
            <input
              type="text"
              className="box-input no-border"
              name="salary"
              placeholder="Salary"
              onChange={(e) => handleFilters(e, e.target.name)}
            />
          </div>
        )}
      </div>
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
              {!isColleguesLoading && !isEmployeesLoading && employeeList?.length + ' records'}
              {employeeList?.length > 1 ? `${employeeList
                .filter((item) => {
                  // const { typeOfEmployment, designation, salary, location } =
                  //   filters;
                  return (
                    (typeOfEmployment === "" ||
                      item.typeOfEmployment.toLowerCase() ===
                      typeOfEmployment.toLowerCase()) &&
                    (designation === "" ||
                      item.designation.toLowerCase().includes(designation)) &&
                    (salary === "" || +item?.salary <= +salary) &&
                    (location === "" ||
                      item.companyLocation.toLowerCase() ===
                      location.toLowerCase())
                  );
                }).length} records` : ""}
            </div>
          </div>
          <div
            className="row2"
            style={
              employeeList?.filter((item) => {
                // const { typeOfEmployment, designation, salary, location } =
                //   filters;
                return (
                  (typeOfEmployment === "" ||
                    item.typeOfEmployment.toLowerCase() ===
                    typeOfEmployment.toLowerCase()) &&
                  (designation === "" ||
                    item.designation.toLowerCase().includes(designation)) &&
                  (salary === "" || +item?.salary <= +salary) &&
                  (location === "" ||
                    item.companyLocation.toLowerCase() ===
                    location.toLowerCase())
                );
              })?.length === 0 ? { justifyContent: "center" } : {}
            }
          >
            {employeeList.length === 0 && !isColleguesLoading && !isEmployeesLoading}
            {employeeList
              ?.filter((item) => {
                // const { typeOfEmployment, designation, salary, location } =
                //   filters;
                return (
                  (typeOfEmployment === "" ||
                    item.typeOfEmployment.toLowerCase() ===
                    typeOfEmployment.toLowerCase()) &&
                  (designation === "" ||
                    item.designation.toLowerCase().includes(designation)) &&
                  (salary === "" || +item?.salary <= +salary) &&
                  (location === "" ||
                    item.companyLocation.toLowerCase() ===
                    location.toLowerCase())
                );
              })?.length === 0 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Records"
              />
            )}
            {
              isColleguesLoading || isEmployeesLoading ?
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                  return (
                    <Card
                      className="assess-card"
                    >
                      <Skeleton loading={true} avatar active>
                      </Skeleton>
                    </Card>
                  )
                })
                :
                employeeList
                  ?.map((info) => {
                    return (
                      <AssesmentCard
                        info={info}
                        employerId={userDatas.id}
                        name={info.employeeName}
                        companyLocation={info.companyLocation}
                        designation={info.designation}
                      />
                    );
                  })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
}