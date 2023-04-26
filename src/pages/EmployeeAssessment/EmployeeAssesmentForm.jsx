import React from 'react'
import "./Assessmentform.css";
import { Link } from 'react-router-dom';


export default function EmployeeAssesmentForm() {
  return (
  <div className="assessment">

    <div className="head">
      <div className="row">
         <div className="col">
          <h5>Employee Assesment Form</h5>
         </div>
         <div className="col f-btn">
          <Link to={"/EmployeeAssessment"}>
            <button className="btn-1">Softskill</button>
          </Link>
          <Link to={"/Assessment-form"}>
            <button className="btn-2">Assessment Form</button>
          </Link>
          
         </div>
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
          <div>
            <input type="checkbox"/>
            <label for="vehicle1"> Choice 01</label>
            <br />
            <input type="checkbox"/>
            <label for="vehicle2"> Choice 02</label><br></br>
          </div>
          <hr />
          <div className="form-2">
            <label htmlFor="">Q3</label>
            <input type="text" placeholder='Enter Question' className='f-3' />
          </div>

          <div className="form-3">
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
