import React from 'react'
import "./Assessmentform.css";
import arrow from "../../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { useState } from 'react';
import check_1 from "../../../images/Check-1.svg";

export default function EmployeeAssesmentForm() {
  const ansType = ["Short Answer", "MCQ", "Select"]
  const [qCount, setQCount] = useState(1)
  const [questions, setQuestions] = useState({
    title: "",
    desc: ""
  })
  const [qType, setQType] = useState([])

  let values = [];
  let type = [];
  var questionDetails = []

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const handleTitleChange = (event) => {
    setQuestions(title => ({ ...title, title: event.target.value }))
  }
  const handleDescChange = (event) => {
    setQuestions(desc => ({ ...desc, desc: event.target.value }))
  }
  const handleQuesChange = (e, i) => {
    for (let j = 0; j <= qCount - 1; j++) {
      values[j] = document.getElementById(j).value;
      type[j] = document.getElementById("type"+j).value;
      questionDetails.push({ question_no: j + 1, question: values[j], type: type[j] })
    }
    setQType(questionDetails)
    console.log(questionDetails)
    setQuestions(questions => ({
      ...questions,
      questionDetails
    }))

  }

  const handleChange = () => {

  }

  const submitQues = () => {
    console.log(JSON.stringify(questions))
  }

 
  return (
    <div className="assessment">

      <div className="head">
        <div className="back-div" onClick={handleBack}>
          <img src={arrow} alt="" style={{transform: "rotate(90deg)"}} />
          <h4>Employee Assessment</h4>
        </div>
      </div>
      <div className="assess-form">
        <div className="form">
          <form action="" className='assessform-1'>
            <div className="form-1">
              <input type="text" onChange={handleTitleChange} placeholder='Untitled review form' className='f-1' />
              <input type="text" onChange={handleDescChange} placeholder='Description' className='f-2' />
            </div>
            {[...Array(qCount)].map((e, i) => (
              <div key={i}>
                <div className="form-2">
                  <label htmlFor="">Q{i + 1}</label>
                  <input type="text" id={i} onChange={(e) => handleQuesChange(e, i)} placeholder='Enter Question' className='f-3' />
                </div>

                  {qType[i] === "Select" && 
                <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                  </div>
                </div>
                  }
                <hr />
              </div>
            ))}

          </form>
         
          <Button onClick={submitQues} >
            <img className='checkimg' src={check_1} alt="" width={20} />&nbsp;
            Submit</Button>
        </div>

      </div>
    </div>

  )
}
