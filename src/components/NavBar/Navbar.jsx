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
import { Slant as Hamburger, Slant } from 'hamburger-react'

export default function EmployerNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
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
        headerStyle={{ display: "none" }}
      >
        {user === "Employer" ? (
          <div className="mobileNavbar mt-4">
            <NavLink activeclassname="active" to={"/"} className="navlink">
              <div className="navitem">
                Your Employees
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/employer-approval"}
              className="navlink"
            >
              <div className="navitem">
                On-Board
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/requests"}
              className="navlink"
            >
              <div className="navitem">
                Requests
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/recruitment-pool"}
              className="navlink"
            >
              <div className="navitem">
                Recruitment Pool
              </div>
            </NavLink>

            <NavLink
              activeclassname="active"
              to={"/verification"}
              className="navlink"
            >
              <div className="navitem">
                Verification
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="mobileNavbar mt-4">
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
                  Your Employees
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/employer-approval"}
                className="navlink"
              >
                <div className="navitem">
                  On-Board
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/requests"}
                className="navlink"
              >
                <div className="navitem">
                  Requests
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/recruitment-pool"}
                className="navlink"
              >
                <div className="navitem">
                  Recruitment Pool
                </div>
              </NavLink>

              <NavLink
                activeclassname="active"
                to={"/verification"}
                className="navlink"
              >
                <div className="navitem">
                  Verification
                </div>
              </NavLink>

              <div className="navbarFoot">
                <Slant onToggle={toggled => {
                  if (toggled) {
                    setOpen(true);
                  } else {
                    setOpen(false);
                  }
                }} />

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

            <div className="navbarFoot" onClick={dropdown}>

              <Slant onClick={dropdown} />
            </div>
          </div>
        )}

      </div>
    </>
  );
}
