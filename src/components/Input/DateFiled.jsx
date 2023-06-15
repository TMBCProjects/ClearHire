import React from 'react'

export default function InputField(props) {
    return (
        <div className="form-group">
            {props.label ?
                <label className="control-label">{props.label}</label>
                :
                ""
            }
            <div className="input">
                <input type={'date'}
                    className="form-control"
                    id={props.name}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    rows={6}
                />

            </div>
        </div>
    )
}
