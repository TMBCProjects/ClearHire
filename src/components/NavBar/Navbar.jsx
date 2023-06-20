import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import search from "../../assets/images/search2.svg";
import verification from "../../assets/images/verification.svg";
import "../NavBar/Navbar.css";
import { FileDoneOutlined } from "@ant-design/icons";
import { logOut } from "../../utils/FirebaseUtils";
import users from "../../assets/images/users.png";
import job from "../../assets/images/job.svg";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faUserPlus,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

export default function EmployerNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = () => {
    setMenuOpen(true);
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  const user = sessionStorage.getItem("LoggedIn");
  const dropdown = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
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
        width={500}
        onClose={onMenuClose}
        open={menuOpen}
      >
        {user === "Employer" ? (
          <div className="mobileNavbar">
            <NavLink activeclassname="active" to={"/"} className="navlink">
              <div className="navitem">
                <img src={search} alt="search-logo" className="logo navLink" />
                &nbsp; Your Employees
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/employer-approval"}
              className="navlink"
            >
              <div className="navitem">
                <FontAwesomeIcon
                  icon={faHandshake}
                  style={{ color: "green", fontSize: "x-large" }}
                />
                &nbsp; On-Board
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/requests"}
              className="navlink"
            >
              <div className="navitem">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={{ color: "green", fontSize: "x-large" }}
                />
                &nbsp; Requests
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/recruitment-pool"}
              className="navlink"
            >
              <div className="navitem">
                <FontAwesomeIcon
                  icon={faPeopleGroup}
                  style={{ color: "green", fontSize: "x-large" }}
                />
                &nbsp; Recruitment Pool
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/verification"}
              className="navlink"
            >
              <div className="navitem">
                <img
                  src={verification}
                  alt="search-logo"
                  className="logo navLink"
                />
                &nbsp; Verification
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="mobileNavbar">
            <NavLink activeclassname="active" to={"/"} className="navlink">
              <div className="navitem">
                <img src={users} alt="search-logo" className="logo navLink" />
                &nbsp; Colleagues
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/verification-request"}
              className="navlink"
            >
              <div className="navitem">
                <img
                  src={verification}
                  alt="search-logo"
                  className="logo navLink"
                />
                &nbsp; Verification / Request
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/offerLetters"}
              className="navlink"
            >
              <div className="navitem">
                <img src={job} alt="search-logo" className="logo navLink" />
                &nbsp; Offer Letter
              </div>
            </NavLink>
            <NavLink
              activeclassname="active"
              to={"/assessment"}
              className="navlink"
            >
              <div className="navitem">
                <FileDoneOutlined />
                &nbsp; Assessment
              </div>
            </NavLink>
          </div>
        )}
      </Drawer>
      <div className="empnavbar">
        <div className="navbarHeader">
          <Link to="/">
            <img src={Logo} alt="clear-hire-logo" className="logo" />
          </Link>
        </div>

        {user === "Employer" ? (
          isMobile ? (
            <MenuOutlined onClick={showMenu} />
          ) : (
            <div className={isMobile ? "mobileNav" : "navbarBody"}>
              <NavLink activeclassname="active" to={"/"} className="navlink">
                <div className="navitem">
                  <img
                    src={search}
                    alt="search-logo"
                    className="logo navLink"
                  />
                  &nbsp; Your Employees
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/employer-approval"}
                className="navlink"
              >
                <div className="navitem">
                  <FontAwesomeIcon
                    icon={faHandshake}
                    style={{ color: "green", fontSize: "x-large" }}
                  />
                  &nbsp; On-Board
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/requests"}
                className="navlink"
              >
                <div className="navitem">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ color: "green", fontSize: "x-large" }}
                  />
                  &nbsp; Requests
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/recruitment-pool"}
                className="navlink"
              >
                <div className="navitem">
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    style={{ color: "green", fontSize: "x-large" }}
                  />
                  &nbsp; Recruitment Pool
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/verification"}
                className="navlink"
              >
                <div className="navitem">
                  <img
                    src={verification}
                    alt="search-logo"
                    className="logo navLink"
                  />
                  &nbsp; Verification
                </div>
              </NavLink>
            </div>
          )
        ) : isMobile ? (
          <MenuOutlined onClick={showMenu} />
        ) : (
          <div className={isMobile ? "mobileNav" : "navbarBody"}>
            <NavLink activeclassname="active" to={"/"} className="navlink">
              <div className="navitem">
                <img src={users} alt="search-logo" className="logo navLink" />
                &nbsp; Colleagues
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/verification-request"}
              className="navlink"
            >
              <div className="navitem">
                <img
                  src={verification}
                  alt="search-logo"
                  className="logo navLink"
                />
                &nbsp; Verification / Request
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/offerLetters"}
              className="navlink"
            >
              <div className="navitem">
                <img src={job} alt="search-logo" className="logo navLink" />
                &nbsp; Offer Letter
              </div>
            </NavLink>
            <NavLink
              activeclassname="active"
              to={"/assessment"}
              className="navlink"
            >
              <div className="navitem">
                <FileDoneOutlined />
                &nbsp; Assessment
              </div>
            </NavLink>
          </div>
        )}
        <div className="navbarFoot">
          <button onClick={dropdown}></button>
          {open ? (
            <ul className="navbarDropdown">
              <li>
                <Link to={"/profile"}>View Profile</Link>
              </li>{" "}
              <hr />
              <li>
                <a
                  href="/"
                  onClick={() => {
                    logOut();
                    window.location.reload();
                  }}
                >
                  Signout
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
