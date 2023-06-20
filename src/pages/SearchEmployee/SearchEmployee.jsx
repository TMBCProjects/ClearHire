import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import { Select, Empty, Drawer, Space, Button } from "antd";
import AssesmentCard from "../../components/Cards/AssesmentCard";
import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
import { FilterOutlined } from "@ant-design/icons";

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
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = () => {
    setMenuOpen(true);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchCollegueDetails = async () => {
      try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readColleagues(
          userDatas1.id,
          userDatas1.data.currentEmployerId
        );
        console.log(userDatas.data.role)
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
        title="Clearhire"
        placement={"left"}
        onClose={onMenuClose}
        open={menuOpen}
      >
        <div>
          <div className="input-box1 input-box mb-3">
            <img
              src={search1}
              alt="Search"
              className={`${isMobile} && d-none`}
            />
            <input
              type="text"
              name="designation"
              onChange={(e) => handleInputChange(e, e.target.name)}
              className={`box-input ms-2 ${isMobile} && w-100 ms-0 p-2`}
              placeholder="Job Title / Designation"
            />
          </div>
          {user === "Employer" && (
            <div className="input-box2 input-box mb-3">
              <img
                src={location}
                alt="Search"
                className={`${isMobile} && d-none`}
              />
              <Select
                onChange={(e) => {
                  handleInputChange(e, "location");
                }}
                className={`box-select ms-2 ${isMobile} && w-100`}
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
          <div className="input-box3 input-box mb-3">
            <img src={job} alt="Search" className={`${isMobile} && d-none`} />
            <Select
              type="text"
              onChange={(e) => {
                handleInputChange(e, "typeOfEmployment");
              }}
              className={`box-select ms-2 ${isMobile} && w-100`}
              placeholder="Type Of Employment"
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
          {user === "Employer" && (
            <div className="input-box4 input-box ">
              <img
                src={salary}
                alt="Search"
                className={`${isMobile} && d-none`}
              />
              <input
                type="text"
                className={`box-input no-border ms-2 ${isMobile} && w-100 ms-0 p-2`}
                name="salary"
                placeholder="Salary"
                onChange={(e) => handleInputChange(e, e.target.name)}
              />
            </div>
          )}
        </div>
        <Space className="mt-3 d-flex justify-content-end">
          <Button onClick={onMenuClose}>Cancel</Button>
          <Button type="primary" onClick={onMenuClose}>
            OK
          </Button>
        </Space>
      </Drawer>
      <div className="employer-home">
        {isMobile ? (
          <FilterOutlined
            style={{ width: "25px", margin: "1rem" }}
            onClick={showMenu}
          />
        ) : (
          <div className="search-inputs mobile-filters">
            <div className="input-box1 input-box">
              <img src={search1} alt="Search" />
              <input
                type="text"
                name="designation"
                onChange={(e) => handleInputChange(e, e.target.name)}
                className={`box-input ${isMobile} && w-100 ms-0 p-2`}
                placeholder="Job Title / Designation"
              />
            </div>
            {user === "Employer" && (
              <div className="input-box2 input-box">
                <img src={location} alt="Search" />
                <Select
                  onChange={(e) => {
                    handleInputChange(e, "location");
                  }}
                  className={`box-select ms-2 ${isMobile} && w-100`}
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
                  handleInputChange(e, "typeOfEmployment");
                }}
                className={`box-select ms-2 ${isMobile} && w-100`}
                placeholder="Type Of Employment"
                options={[
                  { value: "", label: "" },
                  {
                    value: "Permanent Full-Time",
                    label: "Permanent Full-Time",
                  },
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
                  className={`box-input no-border ms-2 ${isMobile} && w-100 ms-0 p-2`}
                  name="salary"
                  placeholder="Salary"
                  onChange={(e) => handleInputChange(e, e.target.name)}
                />
              </div>
            )}
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
              {/* <div className="result-count">
              {employeeList?.length > 1 ? `${employeeList.length} records` : ""}
            </div> */}
              {userDatas.data.role === "Employee" ?
                <>
                  {userDatas.currentEmployerId ?

                    <div className="result-count">
                      {employeeList?.filter((item) => {
                        const { typeOfEmployment, designation, salary, location } =
                          filters;
                        return (
                          (typeOfEmployment === "" ||
                            item.typeOfEmployment.toLowerCase() ===
                            typeOfEmployment.toLowerCase()) &&
                          (designation === "" ||
                            item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                          (salary === "" || +item?.salary <= +salary) &&
                          (location === "" ||
                            item.companyLocation.toLowerCase() ===
                            location.toLowerCase())
                        );
                      })?.length > 1
                        ? `${employeeList.filter((item) => {
                          const {
                            typeOfEmployment,
                            designation,
                            salary,
                            location,
                          } = filters;
                          return (
                            (typeOfEmployment === "" ||
                              item.typeOfEmployment.toLowerCase() ===
                              typeOfEmployment.toLowerCase()) &&
                            (designation === "" ||
                              item.designation
                                .toLowerCase()
                                .includes(designation.toLowerCase())) &&
                            (salary === "" || +item?.salary <= +salary) &&
                            (location === "" ||
                              item.companyLocation.toLowerCase() ===
                              location.toLowerCase())
                          );
                        }).length
                        } records`
                        : ""}
                    </div>
                    :
                    ""
                  }
                </>

                :
                <div className="result-count">
                  {employeeList?.filter((item) => {
                    const { typeOfEmployment, designation, salary, location } =
                      filters;
                    return (
                      (typeOfEmployment === "" ||
                        item.typeOfEmployment.toLowerCase() ===
                        typeOfEmployment.toLowerCase()) &&
                      (designation === "" ||
                        item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                      (salary === "" || +item?.salary <= +salary) &&
                      (location === "" ||
                        item.companyLocation.toLowerCase() ===
                        location.toLowerCase())
                    );
                  })?.length > 1
                    ? `${employeeList.filter((item) => {
                      const {
                        typeOfEmployment,
                        designation,
                        salary,
                        location,
                      } = filters;
                      return (
                        (typeOfEmployment === "" ||
                          item.typeOfEmployment.toLowerCase() ===
                          typeOfEmployment.toLowerCase()) &&
                        (designation === "" ||
                          item.designation
                            .toLowerCase()
                            .includes(designation.toLowerCase())) &&
                        (salary === "" || +item?.salary <= +salary) &&
                        (location === "" ||
                          item.companyLocation.toLowerCase() ===
                          location.toLowerCase())
                      );
                    }).length
                    } records`
                    : ""}
                </div>
              }

            </div>
            <div
              className="row2"
              style={
                employeeList?.filter((item) => {
                  const { typeOfEmployment, designation, salary, location } =
                    filters;
                  return (
                    (typeOfEmployment === "" ||
                      item.typeOfEmployment.toLowerCase() ===
                      typeOfEmployment.toLowerCase()) &&
                    (designation === "" ||
                      item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                    (salary === "" || +item?.salary <= +salary) &&
                    (location === "" ||
                      item.companyLocation.toLowerCase() ===
                      location.toLowerCase())
                  );
                })?.length === 0
                  ? { justifyContent: "center" }
                  : {}
              }
            >
              {employeeList?.filter((item) => {
                const { typeOfEmployment, designation, salary, location } =
                  filters;
                return (
                  (typeOfEmployment === "" ||
                    item.typeOfEmployment.toLowerCase() ===
                    typeOfEmployment.toLowerCase()) &&
                  (designation === "" ||
                    item.designation.toLowerCase().includes(designation.toLowerCase())) &&
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
                {userDatas.data.role === "Employee" ?
                <>
              {userDatas.currentEmployerId? 
              <>
                {employeeList
                  ?.filter((item) => {
                    const { typeOfEmployment, designation, salary, location } =
                      filters;
                    return (
                      (typeOfEmployment === "" ||
                        item.typeOfEmployment.toLowerCase() ===
                        typeOfEmployment.toLowerCase()) &&
                      (designation === "" ||
                        item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                      (salary === "" || +item?.salary <= +salary) &&
                      (location === "" ||
                        item.companyLocation.toLowerCase() ===
                        location.toLowerCase())
                    );
                  })
                  ?.map((info) => {
                    return (
                      <AssesmentCard
                        info={info}
                        employerId={userDatas?.id}
                        name={info.employeeName}
                        companyLocation={info.companyLocation}
                        designation={info.designation}
                      />

                    );

                  })} </>
              :
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No Records"
                />
              } </>

              :

              <>
                {employeeList
                  ?.filter((item) => {
                    const { typeOfEmployment, designation, salary, location } =
                      filters;
                    return (
                      (typeOfEmployment === "" ||
                        item.typeOfEmployment.toLowerCase() ===
                        typeOfEmployment.toLowerCase()) &&
                      (designation === "" ||
                        item.designation.toLowerCase().includes(designation.toLowerCase())) &&
                      (salary === "" || +item?.salary <= +salary) &&
                      (location === "" ||
                        item.companyLocation.toLowerCase() ===
                        location.toLowerCase())
                    );
                  })
                  ?.map((info) => {
                    return (
                      <AssesmentCard
                        info={info}
                        employerId={userDatas?.id}
                        name={info.employeeName}
                        companyLocation={info.companyLocation}
                        designation={info.designation}
                      />

                    );

                  })} </>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
