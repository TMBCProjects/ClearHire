import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container my-3">
        <div className="row d-flex justify-content-center align-items-center py-3">
          <div className="col-md-8">
            <a className="mx-3 text-decoration-none text-color-light">About</a>
            <a className="mx-3 text-decoration-none text-color-light">
              Careers
            </a>
            <a className="mx-3 text-decoration-none text-color-light">
              Privacy
            </a>
            <a className="mx-3 text-decoration-none text-color-light">
              Cookies
            </a>
            <a className="mx-3 text-decoration-none text-color-light">Terms</a>
            <a className="mx-3 text-decoration-none text-color-light">Help</a>
            <a className="mx-3 text-decoration-none text-color-light">
              Feedback
            </a>
          </div>
          <div className="col-md-2">
            <p className="text-color-light my-0">Copyright &copy; clearhire</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
