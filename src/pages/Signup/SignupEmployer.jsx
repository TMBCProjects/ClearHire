import React, { useState } from "react";
import eye from "../../../src/assets/images/eye.svg"
import eyeStrike from "../../../src/assets/images/eyeStrike.svg"
import "../Signup/Signup.css"
export default function Signup() {
    const [showPassword, setShowPassword] = useState(true);

    function showPass() {
        setShowPassword(true)
        var x = document.getElementById("password-field");
        x.type = "password";
    }

    function hidePass() {
        setShowPassword(false)
        var x = document.getElementById("password-field");
        x.type = "text";
    }
    return (
        <div className="container-fluid">
            <div className="signupHeader">
                <span>Employer Signup</span>
            </div>
            <form className="form-horizontal">

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <div className="input">
                        <input type="email" className="form-control" name="email" value=""  placeholder="Input your company mail id, use an official email address."/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <div className="input">
                        <input id="password-field" type="password" className="form-control" name="password" value="secret"   placeholder="Input your password in here."/>
                        {showPassword ?
                            <img src={eyeStrike} alt={'show pass'} width={20} className="showPass" onClick={hidePass}></img>
                            :
                            <img src={eye} alt={'show pass'} width={20} className="showPass" onClick={showPass}></img>
                        }
                    </div>
                </div>

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
