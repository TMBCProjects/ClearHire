import { Modal, message } from "antd";
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
import { verifyEmailId } from "../../utils/FirebaseUtils";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you want a new Email Verification Link to be sent to your registered mailId?');
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
          const userGoogle = {
            email: data.user.email,
            id: data.user.uid,
          }
          sessionStorage.setItem("userGoogle", JSON.stringify(userGoogle));
          navigate("/signup-google-options");
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
  const errorNotVerified = (err) => {
    messageApi.open({
      type: "error",
      content: "Your Email Id is not verified."
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
      if (user.emailVerified) {
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
        setLoading(false);
        errorNotVerified();
        showModal()
      }
    } catch (err) {
      setLoading(false);
      error(err.message);
    }
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setModalText('Email Verification Link is sent to your mail Id.');
    await verifyEmailId();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 5000);
  };
  const handleCancel = () => {
    setOpen(false);
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
          <Modal
            title="Email Verification"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-5 col-12">
              <h1 className="heading  text-white fw-bold">
                Embrace the{" "}
                <span className="text-color-green">Future of Hiring</span>
              </h1>
              <p className="text-light mt-3">
                With features like AI-generated recommendation letters, ClearHire is redefining the recruitment landscape. Join us in revolutionizing the way businesses hire and manage their employees.
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
