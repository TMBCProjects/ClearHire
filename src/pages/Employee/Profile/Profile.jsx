import React, { useState } from 'react'
import "../Profile/Profile.css"
import pic from "../../../assets/images/pic.png"
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from '../../../components/Input/InputField';
import { Slider, Col } from 'antd';

const initialValues = {
    portfolioLink: "",
    resume: "",
    employeeAadhaarCardNumber: "",
    skill: [],
    skillPercentage: [],
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name;
        setFile(file.name);
        setValues({
            ...values,
            [name]: file,
        });
    };

    const handleSubmit = () => {
        let userDatas = JSON.parse(sessionStorage.getItem("userData"));
        values.companyName = userDatas.data.companyName;
        values.employerEmail = userDatas.data.employerEmail;
        values.employerId = userDatas.id;
        // onboardEmployee(values).then(() => {
        //     window.location.href = "/offerletter-sent";
        // });
    };

    let [file, setFile] = useState("");
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
                <div className="f-3">
                    <input
                        type="file"
                        id="file"
                        name="resume"
                        accept=".txt, .pdf"
                        onChange={(e) => {
                            handleFileChange(e);
                        }}
                    />
                    <label for="file" className="custom-file-upload">
                        <img src={Add} alt="add"></img>{file !== "" ? file : "Add Resume"}
                    </label>
                    <span id="filename"></span>
                </div>
                <InputField
                    type={"text"}
                    name={"portfolioLink"}
                    value={values.portfolioLink}
                    onChange={handleInputChange}
                    placeholder={"Add Portfolio link..."}
                />

                <InputField
                    type={"number"}
                    name={"employeeAadhaarCardNumber"}
                    value={values.employeeAadhaarCardNumber}
                    onChange={handleInputChange}
                    placeholder={"Add Your Aadhar Number"}
                />

                <div className='skills'>
                    <span style={{ fontWeight: "bold", display: "flex", gap: "2vh", alignItems: "center" }}>Your Skills
                       </span>
                    <div className='skillList'>
                        <InputField
                            type={"text"}
                            name={"skill"}//name should iterated according to .map
                            value={values.skill}
                            onChange={handleInputChange}
                            placeholder={"Skill 1"}
                        />
                        <Col span={10}>
                            <Slider
                                min={1}
                                max={100}
                                // onChange={onChange}
                                // value={typeof inputValue === 'number' ? inputValue : 0}
                                trackStyle={{ backgroundColor: "#00823B" }}
                                handleStyle={{ backgroundColor: "#00823B" }}
                            />
                        </Col>

                        <span className='sliderpercent'>{inputValue}</span>
                    </div>

                    <div className='skillList'>
                        <InputField
                            type={"text"}
                            name={"skill"}//name should iterated according to .map
                            value={values.skill}
                            onChange={handleInputChange}
                            placeholder={"Skill 2"}
                        />
                        <Col span={10}>
                            <Slider
                                min={1}
                                max={100}
                                // onChange={onChange}
                                // value={typeof inputValue === 'number' ? inputValue : 0}
                                trackStyle={{ backgroundColor: "#00823B" }}
                                handleStyle={{ backgroundColor: "#00823B" }}
                            />
                        </Col>
                        <span className='sliderpercent'>{inputValue}</span>
                        <span style={{ border: "1px solid green", borderRadius: "6vh",marginLeft: "2vh", padding: "1vh 1.5vh", width: "7vh", cursor: "pointer" }}>
                            <img src={Add} alt="add"></img>
                        </span>
                        
                    </div>
                    
                    <div className='profileFooter'>
                        <button><img src={Check} alt="submit-logo" ></img>&nbsp;Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}