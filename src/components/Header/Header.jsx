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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="/">
                  How it works
                </a>
              </li>

              <li className="nav-item px-3">
                <a className="nav-link" href="/">
                  Support
                </a>
              </li>
              <li className="nav-item  px-3">
                <a
                  href="/#contact"
                  className="btn"
                  id="login-btn"
                  type="submit"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/signup-options"}>
                  <a className="btn" id="signup-btn" type="submit">
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
