import React from 'react'
import "./Assessmentform.css";
import arrow from "../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";
import { Button, Select } from 'antd';
import add from "../../assets/images/add.svg"
import { useState } from 'react';
import check_1 from "../../images/Check-1.svg";
import Dropdown from '../../components/Dropdrowns/Dropdown';

export default function EmployeeAssesmentForm() {
  const ansType = ["Short Answer", "MCQ", "Select"]
  const [qCount, setQCount] = useState(1)
  const [questions, setQuestions] = useState({
    title: "",
    desc: ""
  })
  const [qType, setQType] = useState([{ question_no: 1, question: "", type: "" }])
  // var questionDetails = []

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
  // const handleQuesChange = (e, i) => {
  //   for (let j = 0; j <= qCount - 1; j++) {
  //     values[j] = document.getElementById(j).value;
  //     type[j] = document.getElementById("type"+j).value;
  //     questionDetails.push({ question_no: j + 1, question: values[j], type: type[j] })
  //   }
  //   setQType(questionDetails)
  //   console.log(questionDetails)
  //   setQuestions(questions => ({
  //     ...questions,
  //     questionDetails
  //   }))

  // }

  const handleQuesChange = (e, i) => {
    qType[i].question = e.target.value;
  }
  const handleQuesTypeChange = (e, i) => {
    qType[i].type = e.target.value;
  }

  const handleChange = () => {

  }

  const submitQues = () => {
    console.log(JSON.stringify(qType))
  }

  const addques = () => {
    setQCount(qCount + 1)
    const newObject = { question_no: qCount + 1, question: "", type: "" };
    setQType(qType.concat(newObject))
  }
  const delques = (i) => {
    if (qCount > 1) {
      setQCount(qCount - 1)
      const list = qType.slice(0, i).concat(
        qType.slice(i + 1, qCount))
      setQType(list)
    }
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
              <input type="text" onChange={handleTitleChange} placeholder='Untitled review form' className='f-1' />
              <input type="text" onChange={handleDescChange} placeholder='Description' className='f-2' />
            </div>
            {[...Array(qCount)].map((e, i) => (
              <div key={i}>
                <div className="form-2">
                  <label htmlFor="">Q{i + 1}</label>
                  <input type="text" id={i} value={qType[i].question} onChange={(e) => handleQuesChange(e, i)} placeholder='Enter Question' className='ques' />
                </div>

                <div className="form-3">
                  <label htmlFor="">Answer type</label>
                  <Dropdown
                    values={ansType}
                    type={"text"}
                    name={"Choose Answer type"}
                    id={"type"+i}
                    onChange={(e) => handleQuesTypeChange(e, i)}
                  />
                </div>
                {(qType[i].type === "Select" || qType[i].type === "MCQ") && 
                <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                    <input type="text" onChange={handleChange} placeholder='Enter Options' className='chkbx' />
                  </div>
                </div>
                  }
                <Button onClick={() => delques(i)}>Delete Question</Button>
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

          <Button onClick={submitQues} >
            <img className='checkimg' src={check_1} alt="" width={20} />&nbsp;
            Submit</Button>
        </div>

      </div>
    </div>

  )
}
