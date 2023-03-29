import React from "react";
import './main.css'
import employer from '../../../assets/images/employer.svg'
import employee from '../../../assets/images/employee.svg'
import { Link } from "react-router-dom";
const index = () => {
    return (
        <div className="signup-options-container">
            <div className="options-box choose-user-option-box">
                <div className="header-text">
                    <p>Welcome to <span>clearhire</span></p>
                    <p>clearhire helps you find that best employee you've been looking all along</p>
                </div>
                <div className="buttons choose-user-buttons">
                    <Link to={"/signupEmployer"}>
                        <button>
                            <img src={employer} alt="icon" />
                            EMPLOYER SIGNUP
                        </button>
                    </Link>
                    <button>
                        <img src={employee} alt="icon" />
                        EMPLOYEE SIGNUP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default index;
