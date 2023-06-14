import { Button } from "antd";
import React, { useState } from "react";
import InputField from "../../components/Input/InputField";
import "./ForgotPassword.css";
import Loader from '../../components/Loader'
import { resetPassword } from "../../utils/FirebaseUtils";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const [values, setValues] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate("");

    const handleInputChange = (e) => {
        setValues(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true);
        verifyEmailId(values);
    };

    const handleBack = () => {
        navigate("/");
    };
    return (
        <>
            {
                loading &&
                <Loader text={"Sending mail..."} textColor={"#000"} />
            }<div className="back" style={{
                marginTop: "3em",
                marginLeft: "10em"
            }} onClick={handleBack}>
                <GoChevronLeft style={{ color: "#9EC2AD" }} size={25} />
            </div>
            <div className="fp-container">
                <div className="fpHeader">
                    <span style={{ fontWeight: "bold" }}>Verified your Email?</span><br />
                </div>
                <div className="fpHeaderDescription">
                    <span>Please enter the e-mail address you’d like your<br /> verification link sent to</span>
                </div>
                <form className="form-horizontal">
                    <InputField
                        label={"E-mail"}
                        type={"email"}
                        name={"email"}
                        value={values}
                        onChange={handleInputChange}
                        placeholder={
                            "Enter your email address."
                        }
                    />
                    <Button className="fpBtn" onClick={handleSubmit}>
                        Send Mail
                    </Button>
                </form>
            </div>
        </>

    );
}
