import React from 'react'
import { Select } from 'antd';

export default function InputField(props) {
    return (
        <div className="form-group" >
            {props.label ?
                <label className="control-label">{props.label}</label>
                :
                ""
            }
            <div className="input">
                <Select
                    type="text"
                    onChange={props.onChange}
                    className="form-control"
                    placeholder={props.placeholder}
                    id={props.name}
                    options={props.options}
                    name={props.name}
                />

            </div>
        </div>
    )
}
