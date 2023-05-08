import React, { useEffect } from 'react'
import "./ViewAssessment.css";
import arrow from "../../../images/arrow-dropup.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Empty, Rate } from 'antd';
import { useState } from 'react';
import check_1 from "../../../images/Check-1.svg";
import { rateAssessment, readAssessment } from '../../../DataBase/Employer/employer';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
export default function EmployeeAssesmentForm() {
    const [value, setValue] = useState(0);
    const location = useLocation();
    const { from } = location.state;
    const info = from;
    const [questions, setQuestions] = useState([])
    const [ratings, setRatings] = useState([])

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    };


    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const data = await readAssessment(info.id);
                setQuestions(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAssessment();
    }, [])


    const handleInputChange = (e, question_no, i) => {
        setRatings(ratings => {
            const updatedAns = [...ratings];
            updatedAns[i] = { ...updatedAns[i], question_no: question_no, rating: e };
            return updatedAns;
        });
    }

    const submitQues = async (i) => {
        await rateAssessment(ratings, i)
            .then(() => {
                window.location.href = "/"
            })
    }


    return (
        <div className="assessment">
            <div className="assess-form">
                <div className="form">
                    <form action="" className='assessform-1'>
                        {questions.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Questions" />}
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

                                            <div className="form-2a" style={{ display: "flex" }}>
                                                <label htmlFor="">A:</label>
                                                <p className='answer'>
                                                    {(e.questionsList[i].type === "Select") &&
                                                        <div>
                                                            {e.answers[i].answer.join(", ")}
                                                        </div>
                                                    }

                                                    {(e.questionsList[i].type === "Short Answer" || e.questionsList[i].type === "MCQ") &&
                                                        <div>
                                                            <div style={{ marginBottom: "4vh" }} id={"options" + i}>
                                                                <div style={{ display: "flex", flexDirection: 'row' }}>
                                                                    {e.answers[i].answer}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }</p>
                                                <p className='answer'>
                                                    <Rate tooltips={desc} style={{ fontSize: "40px", color: "green" }} value={e.ratings !== undefined ? e.ratings[i]?.rating : ratings[i]?.rating || 0} onChange={(event) => handleInputChange(event, value.question_no, i)} />
                                                </p> </div>

                                        </div>
                                    ))}
                                    <br />
                                </div>
                                <Button disabled={e.ratings !== undefined} onClick={() => submitQues(e.id)} >
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
