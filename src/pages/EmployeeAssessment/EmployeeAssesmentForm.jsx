import React from 'react'
import "./Assessmentform.css";
import arrow from "../../images/arrow-dropup.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from 'antd';
import add from "../../assets/images/add.svg"
import { useState } from 'react';
import check_1 from "../../images/Check-1.svg";
import Dropdown from '../../components/Dropdrowns/Dropdown';
import { assessEmployee } from '../../DataBase/Employer/employer';

export default function EmployeeAssesmentForm() {
  const location = useLocation();
  const { from } = location.state;
  const info = from;
  const ansType = ["Short Answer", "MCQ", "Select"]
  const [qCount, setQCount] = useState(1)
  const [questions, setQuestions] = useState({
    title: "",
    description: "",
    questionsList: []
  })
  const [qType, setQType] = useState([{ question_no: 1, question: "", type: "", option: [] }])
  // var questionDetails = []

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const handleTitleChange = (event) => {
    setQuestions(title => ({ ...title, title: event.target.value }))
  }
  const handleDescChange = (event) => {
    setQuestions(description => ({ ...description, description: event.target.value }))
  }
  const handleQuesChange = (e, i) => {
    setQType(prevQType => {
      const updatedQType = [...prevQType];
      updatedQType[i] = { ...updatedQType[i], question: e.target.value };
      return updatedQType;
    });
  };
  const handleQuesTypeChange = (e, i) => {
    setQType(prevQType => {
      const updatedQType = [...prevQType];
      updatedQType[i] = { ...updatedQType[i], type: e.target.value };
      return updatedQType;
    });
  };

  const handle1Change = (e, i) => {
    qType[i].option[0] = e.target.value;
  }
  const handle2Change = (e, i) => {
    qType[i].option[1] = e.target.value;
  }
  const handle3Change = (e, i) => {
    qType[i].option[2] = e.target.value;
  }
  const handle4Change = (e, i) => {
    qType[i].option[3] = e.target.value;
  }
  const submitQues = () => {
    questions.questionsList = qType
    let userDatas = JSON.parse(sessionStorage.getItem("userData"));
    let role = sessionStorage.getItem("LoggedIn");
    questions.companyName = userDatas.data.companyName;
    questions.ratedById = userDatas.id;
    questions.ratedByRole = role;
    questions.ratedByEmail = userDatas.data.employerEmail || userDatas.data.employeeEmail;
    questions.employeeId = info.id || "employeeId";
    questions.employeeName = info.employeeName || "employeeName";
    questions.employeeEmail = info.employeeEmail || "employeeEmail";
    assessEmployee(questions).then(() => { window.location.href = "/"; })
  }
  const checkSelect = (i) => {
    const selectedType = qType[i].type;
    return selectedType === "Select" || selectedType === "MCQ";
  }

  const addques = () => {
    setQCount(qCount + 1)
    const newObject = { question_no: qCount + 1, question: "", type: "", option: [] };
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

  function hasOneMonthPassed(date) {
    if (date === "null") {
      return false;
    }
    const specificDate = new Date(date);
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const diffInMs = currentDate - specificDate;
    return diffInMs <= oneMonthInMs;
  }
  function findAssessmentDate(ratingsArray, desiredId) {
    if (ratingsArray !== undefined) {
      for (let i = 0; i < ratingsArray.length; i++) {
        if (ratingsArray[i].ratedById === desiredId) {
          return ratingsArray[i].assessmentDate;
        } else {
        }
      }
    }
    return "null";
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
                  <input type="text" id={i} defaultValue={qType[i].question} onChange={(e) => handleQuesChange(e, i)} placeholder='Enter Question' className='f-3' />
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
                {checkSelect(i) && 
                <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                  <div style={{ display: "flex", flexDirection: 'column' }}>
                      <input type="text" onChange={(e) => handle1Change(e, i)} placeholder='Enter Options' className='chkbx' />
                      <input type="text" onChange={(e) => handle2Change(e, i)} placeholder='Enter Options' className='chkbx' />
                      <input type="text" onChange={(e) => handle3Change(e, i)} placeholder='Enter Options' className='chkbx' />
                      <input type="text" onChange={(e) => handle4Change(e, i)} placeholder='Enter Options' className='chkbx' />
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

          <Button onClick={submitQues}
            disabled={
              hasOneMonthPassed(
                findAssessmentDate(info.ratings, info.currentEmployerId)
              )
            }>
            <img className='checkimg' src={check_1} alt="" width={20} />&nbsp;
            Submit
          </Button>
        </div>

      </div>
    </div>

  )
}
