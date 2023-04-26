import React from 'react'
import "./Assessmentform.css";
import { Link } from 'react-router-dom';
import arrow from "../../images/arrow-dropup.svg";
import { useNavigate } from "react-router-dom";


export default function EmployeeAssesmentForm() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
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

          <div className="form-2">
            <label htmlFor="">Q1</label>
            <input type="text" placeholder='Enter Question' className='f-3' />
          </div>

          <div className="form-3">
            <label htmlFor="">Answer type</label>
            <input type="text" placeholder='Select' className='f-4' />
          </div>
          <hr />
          <div className="form-2">
            <label htmlFor="">Q2</label>
            <input type="text" placeholder='Enter Question' className='f-3' />
          </div>
           
          <div className="form-4">
            <label htmlFor="">Answer type</label>
            <input type="text" placeholder='Multiple choice' className='f-4' />
          </div>

          <div className="form-4">
            <label htmlFor="">Choice 01</label>
            <input type="text" className='f-5' />
          </div>
          <div className="form-5">
            <label htmlFor="">Choice 02</label>
            <input type="text" className='f-5' />
            <div className="choice">
              <button className='add-cho'>Add Choice</button>

            </div>
          </div>
          <hr />
          <div className="form-2">
            <label htmlFor="">Q3</label>
            <input type="text" placeholder='Enter Question' className='f-3' />
          </div>

          <div className="form-3">
            <label htmlFor="">Answer type</label>
            <textarea type="text" placeholder='Paragraph' rows="1" cols="50" className='f-4' />
          </div>
        </form>
        <div className="add">
            <p></p>
            {/* <img src={add} alt="" />   */}
            <button className='add-btn'>Answer question</button>

        </div>
      </div>
    </div>
  </div>
  
  )
}
