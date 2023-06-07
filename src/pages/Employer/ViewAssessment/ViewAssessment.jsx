import React, { useEffect } from 'react'
import "./ViewAssessment.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Empty, Modal, Rate } from 'antd';
import { useState } from 'react';
import check_1 from "../../../images/Check-1.svg";
import { rateAssessment, readAssessment } from '../../../DataBase/Employer/employer';
import { MdArrowBackIos } from 'react-icons/md';
import { EyeOutlined } from '@ant-design/icons';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
export default function EmployeeAssesmentForm() {
    const location = useLocation();
    const { from } = location.state;
    const info = from;
    const [questions, setQuestions] = useState([])
    const [ratings, setRatings] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [historyOpen, setHistoryOpen] = useState("");

    const navigate = useNavigate();


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
    }, [info.id])


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
            <div className="col-6 d-flex justify-content-start align-items-center">
                <div
                    className="back me-3"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <MdArrowBackIos size={22} className="backIcon" />
                </div></div>
            <div className="assess-form">

                <div className="form">
                    <Button style={{ float: "right" }} onClick={() => setModalOpen(true)}> History</Button>
                    <Modal
                        title="Assessment History"
                        centered
                        open={modalOpen}
                        footer={null}
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                        width={600}
                    >{questions
                        .sort((a, b) => { return new Date(a.ratedAt) - new Date(b.ratedAt) })
                        ?.map((e, i) => {
                            return (<div style={{ display: "flex" }}><p style={{ fontSize: "30px" }}>{e.title} - {e.ratedAtDate} -{" "}
                                <Button onClick={() => { setModal2Open(true); setHistoryOpen(e.id) }}><EyeOutlined /></Button>
                                <Modal
                                    title="Assessment History"
                                    centered
                                    footer={null}
                                    open={modal2Open}
                                    onOk={() => setModal2Open(false)}
                                    onCancel={() => setModal2Open(false)}
                                    width={1000}
                                >{questions
                                        ?.filter((e) => { return e.id === historyOpen })
                                        ?.map((e) => {
                                            return (<>
                                                <div className="form-1">
                                                    <h1>{e.title}</h1><hr />
                                                    <h2>{e.description}</h2>
                                                </div>
                                                <div><br />
                                                    {e.questionsList?.map((value, i) => (
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
                                                                    {e?.ratings === undefined ?
                                                                        <Rate tooltips={desc} style={{ fontSize: "40px", color: "green" }} value={ratings[i]?.rating || 0} onChange={(event) => handleInputChange(event, value.question_no, i)} />
                                                                        : <Rate style={{ fontSize: "40px", color: "green" }} disabled value={e?.ratings[i]?.rating} />}</p> </div>

                                                        </div>
                                                    ))}
                                                    <br />
                                                </div>
                                            </>)
                                        })}
                                </Modal></p></div>)
                        })}
                    </Modal>
                    <form action="" className='assessform-1'>
                        {questions.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Questions" />}
                        {questions.sort((a, b) => { return new Date(a.ratedAt) < new Date(b.ratedAt) }).filter((e, index) => { return index === 0 })?.map((e, i) => (
                            <>LATEST ASSESSMENT - {e.ratedAtDate}
                                <div className="form-1">
                                    <h1>{e.title}</h1><hr />
                                    <h2>{e.description}</h2>
                                </div>
                                <div><br />
                                    {e.questionsList?.map((value, i) => (
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
                                                    {e?.ratings === undefined ?
                                                        <Rate tooltips={desc} style={{ fontSize: "40px", color: "green" }} value={ratings[i]?.rating || 0} onChange={(event) => handleInputChange(event, value.question_no, i)} />
                                                        : <Rate style={{ fontSize: "40px", color: "green" }} disabled value={e?.ratings[i]?.rating} />}</p> </div>

                                        </div>
                                    ))}
                                    <br />
                                </div>
                                <Button style={{ display: e?.ratings !== undefined ? "none" : "block" }} disabled={e?.ratings !== undefined} onClick={() => submitQues(e.id)} >
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
