import React, { useState } from 'react'
import eye from "../../../src/assets/images/eye.svg"
import eyeStrike from "../../../src/assets/images/eyeStrike.svg"

export default function InputField(props) {
    const [value, setValue] = useState("")
    const [showPassword, setShowPassword] = useState(true);

    function showPass() {
        setShowPassword(true)
        var x = document.getElementById("field");
        if(x.type === "password") x.type = "text";
    }

    function hidePass() {
        setShowPassword(false)
        var x = document.getElementById("field");
        if(x.type === "password") x.type = "text";
    }

    function onChange(event){
        setValue(event.target.value)
    }
  return (
      <div className="form-group">
          <label className="control-label">{props.label}</label>
          <div className="input">
              <input type={props.type === "password" && showPassword? "password" : "text" } 
              className="form-control" 
              id="field"
              name="email" 
              value={value} 
              placeholder={props.placeholder} 
              onChange={onChange}/>
              {props.type === "password" ?
                    showPassword?
                        <img 
                            src = { eyeStrike } 
                            alt = { 'show pass' } 
                            width = { 20 } 
                            className = "showPass" 
                            onClick = { hidePass }>
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
