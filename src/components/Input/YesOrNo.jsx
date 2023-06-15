import React from 'react'
import { Radio } from 'antd';
export default function InputField(props) {
    return (
        <div className="form-group d-flex flex-column" >
            {props.label ?
                <label className="control-label">{props.label}</label>
                :
                ""
            }
            <Radio.Group
                options={props.options}
                onChange={props.onChange}
                optionType="button"
                size='large'
                buttonStyle="outlined"
                style={{
                    marginTop: 4,
                    borderRadius: 0,
                }}
            />
        </div>
    )
}
