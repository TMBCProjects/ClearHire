import React from 'react'
import { Button } from 'antd'
import InputField from '../../../components/Input/InputField';

function SendResgination() {
    return (
        <div className="signup-container sign">
            <div className="signupHeader">
                <span style={{ fontWeight: "bold", color: "#00823B" }}>Enter the Receiver's Details</span>
            </div>
            <form className="form-horizontal" style={{ height: "100%" }}>
                <InputField
                    label={"Company Name"}
                    type={"text"}
                    name={"companyName"}
                    // value={values.email}
                    // onChange={handleInputChange}
                    placeholder={
                        "Enter the company name."
                    }
                />

                <InputField
                    label={"E-mail"}
                    type={"email"}
                    name={"email"}
                    // value={values.password}
                    // onChange={handleInputChange}
                    placeholder={"Enter the company email id."}
                />
                <InputField
                    label={"Person Name"}
                    type={"text"}
                    name={"Enter the person name."}
                    // value={values.password}
                    // onChange={handleInputChange}
                    placeholder={"Enter the company email id."}
                />
                <InputField
                    label={"Designation"}
                    type={"text"}
                    name={"designation"}
                    // value={values.password}
                    // onChange={handleInputChange}
                    placeholder={"Enter the Designation."}
                />

                <Button className="signupBtn"
                //   onClick={handleSubmit}
                >
                    Send
                </Button><br /><br /><br /><br /><br /><br />
            </form>
        </div>
    )
}

export default SendResgination
