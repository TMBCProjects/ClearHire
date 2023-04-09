import React, { useState } from 'react'
import "../Profile/Profile.css"
import pic from "../../../assets/images/pic.png"
import Add from "../../../assets/images/add.svg";
import Check from "../../../assets/images/Check.svg";
import InputField from '../../../components/Input/InputField';
import { Slider, Col } from 'antd';
import UploadFile from '../../../components/UploadFile';
import { MinusOutlined } from '@ant-design/icons';

const initialValues = {
    link: "",
    aadharno: "",
    skill: ""
}
export default function Profile() {
    const [values, setValues] = useState(initialValues)
    const [skills, setSkills] = useState([
        {
            skillName: "",
            value: 0
        },
        {
            skillName: "",
            value: 0
        }
    ])
    const [inputValue, setInputValue] = useState(1);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        // setValues({
        //     ...values,
        //     [name]: value,
        // });
        const newState = skills.map((obj, id) => {
            // 👇️ if id equals 2, update country property
            if (id === index) {
                return { ...obj, skillName: value };
            }

            // 👇️ otherwise return the object as is
            return obj;
        });

        setSkills(newState);
    };

    const removeSkill = (index) => {
        const newState = skills.filter((obj, id) => {
            return id !== index
        });

        setSkills(newState);
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
                <UploadFile />
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
                    <span style={{ fontWeight: "bold", display: "flex", gap: "2vh", alignItems: "center" }}>Your Skills
                    </span>
                    {
                        !skills.length && <div>Add atleast 1 skill <span onClick={() => {
                            setSkills([...skills, {
                                skillName: "",
                                value: 0
                            }])
                        }} style={{ border: "1px solid green", borderRadius: "6vh", marginLeft: "2vh", padding: "1vh 1.5vh", width: "7vh", cursor: "pointer" }}>
                            <img src={Add} alt="add"></img>
                        </span></div>
                    }
                    {
                        skills?.map((skill, index) => {
                            return (


                                <div className='skillList'>

                                    <InputField
                                        type={"text"}
                                        name={`skill ${index + 1}`}//name should iterated according to .map
                                        onChange={(e) => {
                                            handleInputChange(e, index)
                                        }}
                                        placeholder={`Skill ${index + 1}`}
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

                                    <span onClick={() => {
                                        removeSkill(index)
                                    }} style={{ border: "1px solid tomato", borderRadius: "6vh", marginLeft: "2vh", padding: "1vh 1.5vh", width: "7vh", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <MinusOutlined style={{ color: "tomato" }} />
                                    </span>
                                    {
                                        index === skills.length - 1 &&
                                        <span onClick={() => {
                                            setSkills([...skills, {
                                                skillName: "",
                                                value: 0
                                            }])
                                        }} style={{ border: "1px solid green", borderRadius: "6vh", marginLeft: "2vh", padding: "1vh 1.5vh", width: "7vh", cursor: "pointer" }}>
                                            <img src={Add} alt="add"></img>
                                        </span>
                                    }
                                </div>

                            )
                        })
                    }





                    <div className='profileFooter'>
                        <button><img src={Check} alt="submit-logo" ></img>&nbsp;Done</button>
                    </div>
                </div >
            </div>
        </div>
    )
}