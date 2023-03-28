import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container" id="footer">
        <div className="row d-flex justify-content-center align-items-center py-3">
          <div className="col-md-8 col-sm-12">
            <a className="mx-3 text-decoration-none text-gray" href="/">
              About
            </a>
            <a className="mx-3 text-decoration-none text-gray" href="/">
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
            <p className="text-gray my-0">Copyright &copy; clearhire</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
