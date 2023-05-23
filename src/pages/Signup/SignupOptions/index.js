import React, { useState } from "react";
import "./main.css";
import linkedin_icon from "../../../assets/images/linkedin-icon.svg";
import mail_icon from "../../../assets/images/mail-icon.svg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { checkUser } from "../../../DataBase/SignUp/signUp";
import { readEmployee, readEmployer } from "../../../DataBase/Login/login";

const Index = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successful",
    });
  };

  const handleLoginWithGoogle = () => {
    //   try {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider).then(async (data) => {
    //       const user = await checkUser(data.user.email);
    //       if (user) {
    //         setLoading(true);
    //         if (user.photoURL === "Employer") {
    //           sessionStorage.setItem("LoggedIn", "Employer");
    //           const myObj = await readEmployer(user.uid);
    //           const objStr = JSON.stringify(myObj);
    //           sessionStorage.setItem("userData", objStr);
    //           success();
    //           setTimeout(() => {
    //             window.location.reload();
    //           }, 1000);
    //           navigate("/");
    //         } else if (user.photoURL === "Employee") {
    //           sessionStorage.setItem("LoggedIn", "Employee");
    //           const myObj = await readEmployee(user.uid);
    //           const objStr = JSON.stringify(myObj);
    //           sessionStorage.setItem("userData", objStr);
    //           success();
    //           setTimeout(() => {
    //             window.location.reload();
    //           }, 1000);
    //           navigate("/");
    //         }
    //       } else {
    //         navigate("/signup-with-google", {
    //           state: {
    //             email: data.user.email,
    //             id: data.user.uid,
    //             photoURL: data.user.photoURL,
    //             name: data.user.displayName,
    //           },
    //         });
    //       }
    //     });
    //   } catch (error) {
    //     setLoading(false);
    //     message.error(error);
    //   }
  };
  return (
    <div className="signup-options-container">
      <div className="options-box">
        <div className="header-text">
          <p>
            Welcome to <span>clearhire</span>
          </p>
          <p>
            clearhire helps you find that best employee you've been looking all
            along
          </p>
        </div>
        <div className="buttons">
          <button onClick={handleLoginWithGoogle}>
            <img
              src={linkedin_icon}
              alt="icon"
            />
            CONTINUE WITH GOOGLE
          </button>
          <button onClick={() => navigate("/user-options")}>
            <img
              src={mail_icon}
              alt="icon"
            />
            CONTINUE WITH E-MAIL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
