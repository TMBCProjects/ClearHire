import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg";
import search from "../../../assets/images/search.svg"
import onBoard from "../../../assets/images/onBoard.svg"
import verification from "../../../assets/images/verification.svg"
import "../NavBar/EmployerNavbar.css"
import { logOut } from '../../../utils/FirebaseUtils';

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

        <NavLink activeclassname="navbaractive" to={"/"} className="navlink">
          <div className='navitem'>
            <img src={search} alt="search-logo" className="logo navLink" />&nbsp;
            Your Employees
          </div>
        </NavLink>

        <NavLink activeclassname="navbaractive" to={"/employer-approval"} className="navlink">
          <div className='navitem'>
            <img src={onBoard} alt="search-logo" className="logo navLink" />&nbsp;
            On-Board
          </div>
        </NavLink>

        <NavLink activeclassname="navbaractive" to={"/verfication-request"} className="navlink">
          <div className='navitem'>
            <img src={verification} alt="search-logo" className="logo navLink" />&nbsp;
            Verification Request
          </div>
        </NavLink>

      </div>

      <div className='navbarFoot'>
        <button onClick={dropdown}></button>
        {open ?
          <ul className='navbarDropdown'>
            <li><Link to={"/"}>View Profile</Link></li> <hr />
            <li><center><div style={{ cursor: "pointer" }} onClick={() => { logOut(); }}>Signout</div></center></li>
          </ul>

          :
          ""
        }
      </div>
    </div>
  )
}
