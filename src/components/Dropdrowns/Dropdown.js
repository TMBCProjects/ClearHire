import React from "react";
import "../Dropdrowns/Dropdown.css"

export default function Dropdowns(props) {
  return (
    <div className="form-group">
        <div className="input">
        <select className="dropdown" onChange={props.onChange}>
            {props.type === "country"?
            <>
            <option value="" disabled selected>{props.id? props.id : props.name}</option>
                {props.values.map((country, index) => {
                    return(
                        <option key={index} value={country.name}>{country.name}</option>
                    )
                    
                })}
            </>
                :
                <>
                <option key={"0"} value="defaultValue">{props.name}</option>
                {props.values.map((value, index) => {
                    return(
                        <option key={index} value={value}>{value}</option>
                    )
                })}
                </>
            }
        </select>
        </div>
    </div>
  )
}
