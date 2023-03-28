import React, { useState } from "react";
import eye from "../../../src/assets/images/eye.svg"
import eyeStrike from "../../../src/assets/images/eyeStrike.svg"
import "../Signup/Signup.css"
export default function Signup() {
    const [showPassword, setShowPassword] = useState(true);

    function showPass() {
        setShowPassword(true)
        var x = document.getElementById("password-field");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    function hidePass() {
        setShowPassword(false)
    }
    return (
        <div className="container">
            <div className="signupHeader">
                <span>Employer Signup</span>
            </div>
            <form className="form-horizontal" method="" action="">

                <div className="form-group">
                    <label className="col-md-4 control-label">Email</label>
                    <div className="col-md-6">
                        <input type="email" className="form-control" name="email" value="" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-4 control-label">Password</label>
                    <div className="col-md-6">
                        <input id="password-field" type="password" className="form-control" name="password" value="secret" />
                        {showPassword ?
                            <img src={eyeStrike} alt={'show pass'} width={20} className="showPass" onClick={hidePass}></img>
                            :
                            <img src={eye} alt={'show pass'} width={20} className="showPass" onClick={showPass}></img>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}
