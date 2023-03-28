import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container my-3" id="footer">
        <div className="row d-flex justify-content-center align-items-center py-3 foot-con">
          <div className="col-md-8 col-12 foot-item">
            <a className=" mx-3 text-decoration-none text-color-light" href="/">About</a>
            <a className="mx-3 text-decoration-none text-color-light" href="/">
              Careers
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
              Privacy
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
              Cookies
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
              Terms
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
              Help
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
              Feedback
            </a>
          </div>
          <div className="col-md-2">
            <p className="text-color-light px-3 my-0 copy">Copyright &copy; clearhire</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
