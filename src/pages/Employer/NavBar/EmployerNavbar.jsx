import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import search from "../../../assets/images/search.svg"
import onBoard from "../../../assets/images/onBoard.svg"
import verification from "../../../assets/images/verification.svg"
import "../NavBar/EmployerNavbar.css"
import { FileDoneOutlined } from "@ant-design/icons" 

export default function EmployerNavbar() {
  const [open, setOpen] = useState(false)
  const dropdown = (() => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  })
  return (
    <div className='empnavbar'>

      <div className='navbarHeader'>
        <Link to="/">
          <img src={Logo} alt="clear-hire-logo" className="logo" />
        </Link>
      </div>

      <div className='navbarBody'>

        <NavLink activeclassname="active" to={"/"} className="navlink">
          <div className='navitem'>
            <img src={search} alt="search-logo" className="logo navLink" />&nbsp;
            Your Employees
          </div>
        </NavLink>

        <NavLink activeclassname="active" to={"/employer-approval"} className="navlink">
          <div className='navitem'>
            <img src={onBoard} alt="search-logo" className="logo navLink" />&nbsp;
            On-Board
          </div>
        </NavLink>

        <NavLink activeclassname="active" to={"/verification-request"} className="navlink">
          <div className='navitem'>
            <img src={verification} alt="search-logo" className="logo navLink" />&nbsp;
            Verification / Request
          </div>
        </NavLink>

        <NavLink activeclassname="active" to={"/assessment"} className="navlink">
          <div className='navitem'>
          <FileDoneOutlined />&nbsp;
          Assessment
          </div>
        </NavLink>

      </div>

      <div className='navbarFoot'>
        <button onClick={dropdown}></button>
        {open ?
          <ul className='navbarDropdown'>
            <li><Link to={"/"}>View Profile</Link></li> <hr />
            <li><a href='/' onClick={()=>{sessionStorage.clear(); window.location.reload()}}>Signout</a></li>
          </ul>

          :
          ""
        }
      </div>
    </div>
  )
}
