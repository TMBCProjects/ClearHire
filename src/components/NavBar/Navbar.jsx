import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import search from "../../assets/images/search2.svg";
import onBoard from "../../assets/images/onBoard.svg";
import verification from "../../assets/images/verification.svg";
import "../NavBar/Navbar.css";
import { FileDoneOutlined } from "@ant-design/icons";
import { logOut } from "../../utils/FirebaseUtils";
import users from "../../assets/images/users.png";
import job from "../../assets/images/job.svg";

export default function EmployerNavbar() {
  const [open, setOpen] = useState(false);

  const user = sessionStorage.getItem("LoggedIn");
  const dropdown = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="empnavbar">
      <div className="navbarHeader">
        <Link to="/">
          <img src={Logo} alt="clear-hire-logo" className="logo" />
        </Link>
      </div>

      {user === "Employer" ? (
        <div className="navbarBody">
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
              <img src={onBoard} alt="search-logo" className="logo navLink" />
              &nbsp; On-Board
            </div>
          </NavLink>

          <NavLink
            activeclassname="active"
            to={"/EmployeeAssessment"}
            className="navlink"
          >
            <div className="navitem">
              <FileDoneOutlined />
              &nbsp; Assessment
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="navbarBody">
          <NavLink activeclassname="active" to={"/"} className="navlink">
            <div className="navitem">
              <img src={search} alt="search-logo" className="logo navLink" />
              &nbsp; Your Profile
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
            to={"/colleagues"}
            className="navlink"
          >
            <div className="navitem">
              <img src={users} alt="search-logo" className="logo navLink" />
              &nbsp; Colleagues
            </div>
          </NavLink>
        </div>
      )}
      <div className="navbarFoot">
        <button onClick={dropdown}></button>
        {open ? (
          <ul className="navbarDropdown">
            {user === "Employer" ? (
              <>
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
              </>
            ) : (
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
            )}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
