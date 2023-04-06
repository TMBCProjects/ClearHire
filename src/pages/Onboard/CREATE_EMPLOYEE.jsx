import React, { useState } from 'react'
import "./Onboard.css";
import add from "../../images/add.svg";

function CREATE_EMPLOYEE() {

  let [file,setFile] = useState('')

  return (
    <div className="createemp">
    <div className="row back">
      <div className="col-12 back-item">
        <i class="fa-solid fa-circle-chevron-left"></i>
        <h4>Back</h4>
      </div>
    
        <div className="container-fluid" id="On-board">
            
          <div className="container"> 
            <div className="row d-flex  align-items-center">
              <div className="col-12">
                <div className="onboard-form-1">
                  <p className="onboard-heading">On-Board New Employee</p>

                  <div className="mx-auto">
                    <div className="form-item">
                      <input
                        type="text"
                        className="form-control-1"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-item email">
                      <input
                        type="email"
                        className="form-control-1"
                        placeholder="Email address"
                      />
                      <p>Not on clearhire - an email will be sent to them instead</p>
                    </div>
                    <div className="form-item">
                      <input
                        type="number"
                        className="form-control-1"
                        placeholder="Aadhar Number"
                      />
                    </div>
                    <div className="form-item ">
                      <select name="" id="">
                        <option value="">Designation*</option>
                        <option value="">Graphics Designer</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <input
                        type="date"
                        className="form-control-1"
                        placeholder="Date of Joining*"
                      />
                    </div>
                    <div className="form-item">
                      <input
                        type="number"
                        className="form-control-1"
                        placeholder="Salary*"
                      />

                    </div>
                    <div className="form-item f-3">
                      <input type="file" id="file" name="file" accept=".txt, .pdf" onChange={(e)=>{
                        // alert(e.target.files[0].name)
                        setFile(e.target.files[0].name)
                      }}/>
                      <label for="file" class="custom-file-upload">{file!=='' ? file : 'Upload Offer Letter'}</label>
                      <span id="filename"></span>
                      <img src={add} alt="" />  
                       
                    </div>


                    <div className="form-item">
                      
                      <button type="submit" className="send-btn">
                      <i class="fa-solid fa-plus s-1"></i>

                      Send Offer Letter
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default CREATE_EMPLOYEE;