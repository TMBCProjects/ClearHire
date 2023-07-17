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
import suitcase from "../../assets/images/suitcase.png"

export default function SearchEmployee() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [employeeList, setEmployeeList] = useState([]);
  const [open, setOpen] = useState(false)
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
        <div>
          <div className="filters">
            <div className="col-sm-4 col-sm-offset-4" style={{width: "100%"}}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv" onClick={() => setOpen(!open)}>
                        <div>
                        <img src={suitcase} alt="job" />
                        <span>Job Title</span>
                        </div>
                        <span>+</span>
                      </div>
                    </h4>
                  </div>
                  <div className={open ? "panel-collapse" : "panel-collapse panel-close"}>
                    <ul className="list-group">
                      <li className="list-group-item">One</li>
                      <li className="list-group-item">Two</li>
                      <li className="list-group-item">Three</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-sm-4 col-sm-offset-4" style={{width: "100%"}}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv" onClick={() => setOpen(!open)}>
                        <div>
                        <img src={suitcase} alt="job" />
                        <span>Experience</span>
                        </div>
                        <span>+</span>
                      </div>
                    </h4>
                  </div>
                  <div className={open ? "panel-collapse" : "panel-collapse panel-close"}>
                    <ul className="list-group">
                      <li className="list-group-item">One</li>
                      <li className="list-group-item">Two</li>
                      <li className="list-group-item">Three</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-sm-4 col-sm-offset-4" style={{width: "100%"}}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv" onClick={() => setOpen(!open)}>
                        <div>
                        <img src={suitcase} alt="job" />
                        <span>Score</span>
                        </div>
                        <span>+</span>
                      </div>
                    </h4>
                  </div>
                  <div className={open ? "panel-collapse" : "panel-collapse panel-close"}>
                    <ul className="list-group">
                      <li className="list-group-item">One</li>
                      <li className="list-group-item">Two</li>
                      <li className="list-group-item">Three</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <Button type="primary" style={{width: "88%", margin: "3vh", height: "5vh", borderRadius: "1vh"}}>Apply Filter</Button>
          </div>
        </div>
      </div>
    </>
  );
}
