import React, { useState } from "react";
import InputField from "../../components/Input/InputField";
import "../Signup/Signup.css"

export default function Signup() {
    return (
        <div className="container-fluid">
            <div className="signupHeader">
                <span>Employer Signup</span>
            </div>
            <form className="form-horizontal">

                <InputField 
                label={"Email"} 
                type={"email"} 
                placeholder={"Input your company mail id, use an official email address."}
                />

                <InputField
                    label={"Password"}
                    type={"password"}
                    placeholder={"Input your password in here."}
                />

                <div className="form-group">
                    <label className="control-label">Company Name</label>
                    <div className="input">
                        <input type="text" className="form-control" name="CompanyName" value=""  placeholder="Input your company name."/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Company Website</label>
                    <div className="input">
                        <input type="text" className="form-control" name="CompanyWebsite" value=""  placeholder="Input your official company website link."/>
                    </div>
                </div>

            </form>
        </div>
    );
}
