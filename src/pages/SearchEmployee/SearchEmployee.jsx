import React, { useEffect, useState } from "react";
import "./styles.css";
import search1 from "../../assets/images/search.svg";
import location from "../../assets/images/location.svg";
import job from "../../assets/images/job.svg";
import salary from "../../assets/images/salary.svg";
import { Select, Drawer, Space, Button, Tag, Card, Progress, Slider, Modal } from "antd";
import { readEmployees } from "../../DataBase/Employer/employer";
import { readColleagues } from "../../DataBase/Employee/employee";
import suitcase from "../../assets/images/suitcase.png"
import clock from "../../assets/images/clock.png"
import star from "../../assets/images/star.png"
import search from "../../assets/images/search.png"
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
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
  const formatter = (value) => `${value}%`;
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
                          {openJT ?
                            <span>-</span>
                            :
                            <span>+</span>
                          }
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
                          {openE ?
                            <span>-</span>
                            :
                            <span>+</span>
                          }
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
                          {openS ?
                            <span>-</span>
                            :
                            <span>+</span>
                          }
                        </div>
                        <div className={openS ? "panel-collapse" : "panel-collapse panel-close"}>
                          <Slider
                            tooltip={{
                              formatter,
                            }}
                          />
                        </div>
                      </div>
                    </h4>
                  </div>

                </div>
              </div>

            </div>

            <Button style={{ width: "88%", margin: "3vh", height: "5vh", borderRadius: "1vh", backgroundColor: "#1f4aff", color: "white" }}>Apply Filter</Button>
          </div>

          <div className="search">
            <input type="text" className="searchip" placeholder="Search" />
            <button className="searchbtn"><img src={search} alt="search" style={{ width: "50%" }} /></button>
          </div>

          <div className="empCards">
            <Card
              style={{
                width: 250,
                borderRadius: "5vh"
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{
                    padding: "5px",
                    borderTopRightRadius: "2vh",
                    borderTopLeftRadius: "2vh"
                  }}
                />
              }
              actions={[
                <><SettingOutlined key="setting" /> Access</>,
                <><EditOutlined key="edit" onClick={showModal}/> Rate</>,
                <><EllipsisOutlined key="ellipsis" />More</>,
              ]}
            >
              <Meta
                title="Courtney"
                description="Senior Designer"
              />
              <Progress percent={30} size="small" />
            </Card>


          </div>
        </div>
      </div>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
