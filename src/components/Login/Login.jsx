import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser, {
  checkUser,
  readEmployee,
  readEmployer,
} from "../../DataBase/Login/login";
import "./Login.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase-config";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginWithGoogle = () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (data) => {
        const user = await checkUser(data.user.email);
        if (user) {
          setLoading(true);
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
        } else {
          navigate("/signup-with-google", {
            state: {
              email: data.user.email,
              id: data.user.uid,
              photoURL: data.user.photoURL,
              name: data.user.displayName,
            },
          });
        }
      });
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
      setLoading(false);
      error(err.message);
    }
  };
  return (
    <>
      {loading && (
        <Loader
          text={"Logging in..."}
          color={"#000"}
          textColor={"#fff"}
        />
      )}
      <div
        className="container-fluid"
        id="login">
        {contextHolder}
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-5 col-12">
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
            <div className="col-lg-6 col-12">
              <div className="login-form">
                <p className="login-heading">Login to your account</p>

                <form className="w-75 mx-auto">
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
                      <Link
                        to={"/forgot-password"}
                        style={{
                          textDecoration: "none",
                        }}>
                        <span className="text-color-green fw-bold">
                          Click here
                        </span>
                      </Link>
                    </p>
                  </div>

                  <div className="mb-3">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn login-btn">
                      Login
                    </button>
                  </div>
                  <div className="mb-3">
                    <p>
                      Don't have an account?{" "}
                      <Link
                        to="/signup-options"
                        className="text-decoration-none">
                        <span className="text-color-green fw-bold">
                          Sign up
                        </span>
                      </Link>
                    </p>

                  </div>
                </form>
                <div className="divider-line">
                  <hr />
                  <div className="divider-text">Or</div>
                  <hr />
                </div>
                <div className="buttons">
                  <button onClick={handleLoginWithGoogle}>
                    <GoogleOutlined
                      style={{ fontSize: "30px", marginRight: "10px" }}
                    />
                    CONTINUE WITH GOOGLE
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
