import React, { useEffect } from "react";
import "./AssessmentForm.css";
import arrow from "../../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useState } from "react";
import check_1 from "../../../images/Check-1.svg";
import { readAssessment } from "../../../DataBase/Employer/employer";

export default function EmployeeAssesmentForm() {
  const ansType = ["Short Answer", "MCQ", "Select"];
  const [questions, setQuestions] = useState([]);
  const [qType, setQType] = useState([]);
  let values = [];
  let type = [];
  var questionDetails = [];
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
  }, []);

  const handleQuesChange = (e, i) => {
    for (let j = 0; j <= qCount - 1; j++) {
      values[j] = document.getElementById(j).value;
      type[j] = document.getElementById("type" + j).value;
      questionDetails.push({
        question_no: j + 1,
        question: values[j],
        type: type[j],
      });
    }
    setQType(questionDetails);
    console.log(questionDetails);
    setQuestions((questions) => ({
      ...questions,
      questionDetails,
    }));
  };

  const handleChange = () => {};

  const submitQues = () => {
    console.log(questions);
  };

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
          <form action="" className="assessform-1">
            {questions.map((e, i) => (
              <>
                <div className="form-1">
                  <h1>{e.title}</h1>
                  <hr />
                  <h2>{e.description} </h2>
                </div>
                <br />
                <div key={i}>
                  {e.questionsList.map((value, i) => {
                    <div className="form-2" style={{ display: "flex" }}>
                      <label htmlFor="">Q{i + 1}</label>
                      {console.log(value, "sdaas")}
                      <h3 className="question">{value[i]}</h3>
                    </div>;
                  })}

                  {e.questionsList[i + 1].type === "MCQ" && (
                    <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <input className="radio" type={"radio"}></input>
                        <label for="html">
                          {e.questionsList[i + 1].option[i + 1]}
                        </label>
                      </div>
                    </div>
                  )}
                  <hr />
                </div>
              </>
            ))}
          </form>

          <Button onClick={submitQues}>
            <img className="checkimg" src={check_1} alt="" width={20} />
            &nbsp; Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
