import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container-fluid" id="contact">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-5">
            <h1 className="heading  text-white fw-bold">
              Eprehenderit in{" "}
              <span className="text-color-green">voluptate velit</span> esse
              cillum auptate
            </h1>
            <p className="text-light mt-3">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequ.
            </p>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <p className="contact-heading">Login to your account</p>

              <div className="w-75 mx-auto">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-3">
                  <p>
                    Forgot Password?{" "}
                    <span className="text-color-green fw-bold">Click here</span>
                  </p>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn contact-btn">
                    Login
                  </button>
                </div>
                <div className="mb-3">
                  <p>
                    Don't have an account?{" "}
                    <a href="#" className="text-decoration-none">
                      <span className="text-color-green fw-bold">Sign up</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
