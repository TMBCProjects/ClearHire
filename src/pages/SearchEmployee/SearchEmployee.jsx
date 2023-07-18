import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import { Select, Drawer, Space, Button, Tag } from "antd";
import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
import suitcase from "../../assets/images/suitcase.png"
import clock from "../../assets/images/clock.png"
import star from "../../assets/images/star.png"
import { Slider } from 'antd';

export default function SearchEmployee() {
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const user = sessionStorage.getItem("LoggedIn");
  const [employeeList, setEmployeeList] = useState([]);
  const [openJT, setOpenJT] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [openS, setOpenS] = useState(false)
  const [filters, setFilters] = useState({
    typeOfEmployment: "",
    salary: "",
    location: "",
    designation: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const { CheckableTag } = Tag;
  const JTData = ['Senior Designer', 'Senior Graphic Designer', 'Human Resource', 'Video Editor', 'UI UX Designer'
    , 'Developer', 'Client Servicing'];

  const showMenu = () => {
    setMenuOpen(true);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
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
            <div className="col-sm-4 col-sm-offset-4" style={{ width: "100%" }}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv">
                        <div className="eachfilter" onClick={() => setOpenJT(!openJT)}>
                          <div>
                            <img src={suitcase} alt="job" className="filtersimg" />
                            <span>Job Title</span>
                          </div>
                          <span>+</span>
                        </div>
                        <div className={openJT ? "panel-collapse" : "panel-collapse panel-close"}>
                          {JTData.map((tag) => (
                            <CheckableTag
                              key={tag}
                              checked={selectedTags.includes(tag)}
                              onChange={(checked) => handleTagChange(tag, checked)}
                            >
                              <div>{tag}</div>
                            </CheckableTag>
                          ))}
                        </div>
                      </div>
                    </h4>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-sm-4 col-sm-offset-4" style={{ width: "100%" }}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv">
                        <div className="eachfilter" onClick={() => setOpenE(!openE)}>
                          <div>
                            <img src={clock} alt="job" className="filtersimg" />
                            <span>Experience</span>
                          </div>
                          <span>+</span>
                        </div>
                        <div className={openE ? "panel-collapse" : "panel-collapse panel-close"}>
                          <Slider
                            range={{
                              draggableTrack: true,
                            }}
                            defaultValue={[20, 50]}
                          />
                        </div>
                      </div>
                    </h4>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-sm-4 col-sm-offset-4" style={{ width: "100%" }}>
              <div className="panel-group">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      <div className="filtersdiv">
                        <div className="eachfilter" onClick={() => setOpenS(!openS)}>
                          <div>
                            <img src={star} alt="job" className="filtersimg" />
                            <span>Score</span>
                          </div>
                          <span>+</span>
                        </div>
                        <div className={openS ? "panel-collapse" : "panel-collapse panel-close"}>
                          <Slider
                            range={{
                              draggableTrack: true,
                            }}
                            defaultValue={[20, 50]}
                          />
                        </div>
                      </div>
                    </h4>
                  </div>

                </div>
              </div>

            </div>

            <Button type="primary" style={{ width: "88%", margin: "3vh", height: "5vh", borderRadius: "1vh" }}>Apply Filter</Button>
          </div>
        </div>
      </div>
    </>
  );
}
