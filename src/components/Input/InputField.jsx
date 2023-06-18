import React, { useState } from 'react'
import eye from "../../../src/assets/images/eye.svg"
import eyeStrike from "../../../src/assets/images/eyeStrike.svg"

export default function InputField(props) {
    const [showPassword, setShowPassword] = useState(true);

    function showPass() {
        setShowPassword(true)
        var x = document.getElementById(props.name);
        if (x.type === "password") x.type = "text";
    }

    function hidePass() {
        setShowPassword(false)
        var x = document.getElementById(props.name);
        if (x.type === "password") x.type = "text";
    }

    return (
        <div className="form-group">
            {props.label ?
                <label className="control-label">{props.label}</label>
                :
                ""
            }
            <div className="input">
                <input type={props.type === "password" && showPassword ? "password" : "text"}
                    className="form-control"
                    id={props.name}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                />
                {props.type === "password" ?
                    showPassword ?
                        <img
                            src={eyeStrike}
                            alt={'show pass'}
                            width={20}
                            className="showPass"
                            onClick={hidePass}>
                        </img>
                        :
                        <img
                            src={eye}
                            alt={'show pass'}
                            width={20}
                            className="showPass"
                            onClick={showPass}>
                        </img>

                    :
                    ""

                }
            </div>
        </div>
    )
}
