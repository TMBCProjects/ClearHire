import { Button } from "antd";
import React, { useState } from "react";
import InputField from "../../components/Input/InputField";
import "./ForgotPassword.css";
import Loader from '../../components/Loader'
import { resetPassword } from "../../utils/FirebaseUtils";


export default function ForgotPassword() {
    const [values, setValues] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setValues(e.target.value);
    };

    const handleSubmit = () => {
        setLoading(true);
        resetPassword(values);
    };

    return (
        <>
            {
                loading &&
                <Loader text={"Sending mail..."} textColor={"#000"} />
            }
            <div className="fp-container">
                <div className="fpHeader">
                    <span style={{ fontWeight: "bold" }}>Forgot Password?</span><br />
                </div>
                <div className="fpHeaderDescription">
                    <span>Please enter the e-mail address you’d like your<br /> password reset information sent to</span>
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
