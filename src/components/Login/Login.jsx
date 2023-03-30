import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser, { readEmployee, readEmployer } from "../../DataBase/Login/login";
import "./Login.css";

const initialValues = {
  email: "",
  password: ""
};
const Login = () => {
  const [values, setValues] = useState(initialValues)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successful",
    });
  };
  const error = (err) => {
    messageApi.open({
      type: "error",
      content: "Login failed. Invalid email or password.",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      let user = await LoginUser(values.email, values.password);
      if (user.photoURL === "Employer") {
        sessionStorage.setItem("LoggedIn", "Employer");
        const myObj = await readEmployer(user.uid);
        const objStr = JSON.stringify(myObj);
        sessionStorage.setItem("userData", objStr);
        success();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate("/");
        
      } else if (user.photoURL === "Employee") {
        sessionStorage.setItem("LoggedIn", "Employee");
        const myObj = await readEmployee(user.uid);
        const objStr = JSON.stringify(myObj);
        sessionStorage.setItem("userData", objStr);
        success();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate("/");
      }
    } catch (err) {
      error(err.message);
    }
  };
  return (
    <div className="container-fluid" id="login">
      {contextHolder}
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
            <div className="login-form">
              <p className="login-heading">Login to your account</p>

              <div className="w-75 mx-auto">
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <p>
                    Forgot Password?{" "}
                    <span className="text-color-green fw-bold">Click here</span>
                  </p>
                </div>

                <div className="mb-3">
                  <button type="submit" onClick={handleSubmit} className="btn login-btn">
                    Login
                  </button>
                </div>
                <div className="mb-3">
                  <p>
                    Don't have an account?{" "}
                    <a href="/signup-options" className="text-decoration-none">
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

export default Login;
