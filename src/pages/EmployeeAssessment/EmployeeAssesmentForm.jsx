import React from 'react'
import "./Assessmentform.css";
import { Link } from 'react-router-dom';
import arrow from "../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";
import { Select, Space } from 'antd';
import add from "../../assets/images/add.svg"
import { useState } from 'react';

export default function EmployeeAssesmentForm() {
  const [qCount, setQCount] = useState(1)
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const addques = () => {
    setQCount(qCount + 1)
    console.log(qCount)
  }
  return (
    <div className="assessment">

      <div className="head">
        <div className="back-div" onClick={handleBack}>
          <img src={arrow} alt="" />
          <h4>Employee Assessment</h4>
        </div>
      </div>
      <div className="assess-form">
        <div className="form">
          <form action="" className='assessform-1'>
            <div className="form-1">
              <input type="text" placeholder='Untitled review form' className='f-1' />
              <input type="text" placeholder='Description' className='f-2' />
            </div>
            {[...Array(qCount)].map((e,i) => (
              <div>
                <div className="form-2">
                  <label htmlFor="">Q{i+1}</label>
                  <input type="text" placeholder='Enter Question' className='f-3' />
                </div>

                <div className="form-3">
                  <label htmlFor="">Answer type</label>
                  <Select
                    defaultValue="Choose Answer type"
                    style={{
                      width: "50vh",
                      marginLeft: "5vh"
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'Short Answer',
                        label: 'Short Answer',
                      },
                      {
                        value: 'Multiple Choice Question',
                        label: 'MCQ',
                      },
                      {
                        value: 'Select',
                        label: 'Select',
                      },
                    ]}
                  />
                </div>
                <hr />
              </div>
            ))}

          </form>
          <div className="add">
            <button className='add-btn' onClick={addques}>
              <img src={add} alt="addIcon" />
              &nbsp;
              Add question</button>

          </div>
        </div>

      </div>
    </div>

  )
}
