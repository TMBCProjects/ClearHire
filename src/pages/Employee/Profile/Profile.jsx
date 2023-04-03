import React, { useState } from 'react'
import "../Profile/Profile.css"
import pic from "../../../assets/images/pic.png"
import Add from "../../../assets/images/add.svg";
import InputField from '../../../components/Input/InputField';
import { Slider, Col } from 'antd';

const initialValues = {
    link: "",
    aadharno: "",
    skill: ""
}
export default function Profile() {
    const [values, setValues] = useState(initialValues)
    const [inputValue, setInputValue] = useState(1);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    return (
        <div className='profile'>
            <div className='profileHeader'>
                <div className='profilePic'>
                    <img src={pic} alt="manager-logo" style={{ cursor: "pointer" }}></img>
                </div>

                <div className='name'>
                    <span style={{ fontWeight: "bold" }}>Govarthini, 24</span><br />
                    <span>Chennai, India</span>
                </div>

            </div>

            <div className='profileBody'>
                <button><img src={Add} alt="add"></img>&nbsp;Add Resume</button>

                <InputField
                    type={"text"}
                    name={"link"}
                    value={values.link}
                    onChange={handleInputChange}
                    placeholder={"Add Portfolio link..."}
                />

                <InputField
                    type={"number"}
                    name={"aadharno"}
                    value={values.aadharno}
                    onChange={handleInputChange}
                    placeholder={"Add Your Aadhar Number"}
                />

                <div className='skills'>
                    <span style={{ fontWeight: "bold", display: "flex" }}>Your Skills</span>
                    <div className='skillList'>
                        <InputField
                            type={"text"}
                            name={"skill"}
                            value={values.skill}
                            onChange={handleInputChange}
                            placeholder={"Skill 1"}
                        />
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={100}
                                onChange={onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    )
}
