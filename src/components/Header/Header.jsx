import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div id="header">
      <nav className="navbar navbar-expand-lg shadow shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="clear-hire-logo" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mobile-menu">
              <li className="nav-item px-3">
<<<<<<< HEAD
                <Link className="nav-link active" aria-current="page" to="/">
=======
                <a className="nav-link" aria-current="page" href="/">
>>>>>>> 2a10636db4cedfef07c04bee1cef9d31c1bf7efe
                  Home
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link className="nav-link" to="/">
                  How it works
                </Link>
              </li>

              <li className="nav-item px-3">
                <Link className="nav-link" to="/">
                  Support
                </Link>
              </li>
              <li className="nav-item  px-3">
                <a href="/#login" className="btn" id="login-btn" type="submit">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/signup-options"}>
                  <a
                    className="btn"
                    id="signup-btn"
                    type="submit"
                    href="/signup-options"
                  >
                    Signup
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
