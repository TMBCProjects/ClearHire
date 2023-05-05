import React, { useEffect } from 'react'
import "./AssessmentForm.css";
import arrow from "../../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";
import { Button, Empty } from 'antd';
import { useState } from 'react';
import check_1 from "../../../images/Check-1.svg";
import { readAssessment } from '../../../DataBase/Employee/employee';
import { submitAssessment } from '../../../DataBase/Employee/employee';

export default function EmployeeAssesmentForm() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  //const [checkedItems ,setCheckedItems] = useState([])
  const checkedItems = []
  const ques_no = []
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };


  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const userDatas = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readAssessment(userDatas.id);
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAssessment();
    console.log(questions)
  }, [])

  const handleChange = (event, question_no, i) => {
    const { value, checked } = event.target;
    setAnswers(prevAns => {
      const updatedAns = [...prevAns];
      let selectedValues = []
      if (updatedAns[i] === undefined) {
        selectedValues = []
      }
      else {
        selectedValues = updatedAns[i].answer.slice();
      }
      if (checked) {
        selectedValues.push(value);
      } else {
        const index = selectedValues.indexOf(value);
        if (index !== -1) {
          selectedValues.splice(index, 1);
        }
      }
      updatedAns[i] = { ...updatedAns[i], question_no: question_no, answer: selectedValues };
      return updatedAns;
    });
  };

  const handleInputChange = (e, question_no, i) => {
    setAnswers(prevAns => {
      const updatedAns = [...prevAns];
      updatedAns[i] = { ...updatedAns[i], question_no: question_no, answer: e.target.value };
      return updatedAns;
    });
  }

  const submitQues = async (i) => {
    await submitAssessment(answers, i)
      .then(() => {
        window.location.href = "/"
      })
  }


  return (
    <div className="assessment">

      <div className="head">
        <div className="back-div" onClick={handleBack}>
          <img src={arrow} alt="" style={{ transform: "rotate(90deg)" }} />
          <h4>Employee Assessment</h4>
        </div>
      </div>
      <div className="assess-form">
        <div className="form">
          <form action="" className='assessform-1'>
            {questions.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Questions"/>}
            {questions.map((e, i) => (
              <>
                <div className="form-1">
                  <h1>{e.title}</h1><hr />
                  <h2>{e.description} </h2>
                </div>
                <div><br />
                  {e.questionsList.map((value, i) => (
                    <div>
                      <div className="form-2" style={{ display: "flex" }}>
                        <label htmlFor="">Q{value.question_no}</label>
                        <p className='question'>{value.question}</p>
                      </div>
                      {(e.questionsList[i].type === "MCQ" ||
                        e.questionsList[i].type === "Select") &&
                        <div>
                          {value.option.map((val) => (
                            <div style={{ marginBottom: "4vh", marginTop: "2vh" }} id={"options" + i}>
                              <div style={{ display: "flex", flexDirection: 'row' }}>
                                <input
                                  onChange={e.questionsList[i].type === "Select" ?
                                    (e) => handleChange(e, value.question_no, i)
                                    :
                                    (e) => handleInputChange(e, value.question_no, i)}
                                  className='radio'
                                  name={'option' + value.question_no}
                                  type={e.questionsList[i].type === "Select" ? "checkbox" : "radio"}
                                  value={val}></input>
                                <label for="html">{val}</label>
                              </div>
                            </div>
                          ))}
                        </div>
                      }

                      {e.questionsList[i].type === "Short Answer" &&
                        <div>
                          <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                            <div style={{ display: "flex", flexDirection: 'row' }}>
                              <input onChange={(e) => handleInputChange(e, value.question_no, i)} className='f-2' type={"text"} placeholder="Enter your Answer"></input>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))}
                  <br />
                </div>
                <Button onClick={()=>submitQues(e.id)} >
                  <img className='checkimg' src={check_1} alt="" width={20} />&nbsp;
                  Submit</Button>
              </>

            ))}

          </form>


        </div>

      </div>
    </div>

  )
}
