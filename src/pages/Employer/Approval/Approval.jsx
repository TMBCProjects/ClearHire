import React from "react";
import { Link } from "react-router-dom";
import Add from "../../../assets/images/add.svg";
import View from "../../../assets/images/view-doc.svg";
import "./approval.css";

const Approval = () => {
  return (
    <div className="container" id="employer-approval">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold fs-30">Sent Approvals (Pending)</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="option1"
              checked
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio1"
            >
              All
            </label>
          </div>
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              defaultValue="option2"
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio2"
            >
              Fresher
            </label>
          </div>
          <div className="form-check form-check-inline mx-3">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              defaultValue="option3"
            />
            <label
              className="form-check-label filter-approval"
              htmlFor="inlineRadio3"
            >
              Not on clearhire
            </label>
          </div>
          <div className="form-check form-check-inline">
            <Link to={"/onboarding-form"} className="btn add-recruit">
              <img src={Add} className="mr-5 add-icon" alt="addIcons" /> New Recruit
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-5">
        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Govarthini</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-request">
                Request to view assessment
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-assessment">
                View assessment
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-request-sent">
                Request sent
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-fresher">Fresher</button>
            </div>
          </div>
        </div>

        <div className="col-md-3 gy-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title fw-bold">Ramesh Balasubramaniyam..</h3>
              <p className="card-text designation w-50 mt-2">
                Graphic Designer
              </p>
              <p className="mb-1">Chennai, India</p>
              <p className="mb-1">Govarthini1994@gmail.com</p>
              <p className="mb-1">01-01-2023</p>
              <p className="mb-1">500,000</p>
              <div className="row  mt-2">
                <div className="col">
                  <p className="text-color-green fs-13 fw-bold">
                    <img className="mr-5" src={View} alt="" /> View offer Letter
                  </p>
                </div>
                <div className="col">
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              <button className="w-100 mt-3 btn btn-clearhire">
                Not on clearhire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval;