import React, { useState }  from 'react'
import "./Assessment.css";
import pic from "../../images/download.jpg";
import check_1 from "../../images/Check-1.svg";
import quote from "../../images/quote-left.svg";
import arrow from "../../images/arrow-dropup.svg";




function EmployeeAssessment() {
    let [rangeSkill_1,setRangeSkill_1] = useState(0)
    let [rangeSkill_2,setRangeSkill_2] = useState(0)
    let [rangeSkill_3,setRangeSkill_3] = useState(0)
    let [rangeSkill_4,setRangeSkill_4] = useState(0)
    let [rangeSkill_5,setRangeSkill_5] = useState(0)
    let [rangeSkill_6,setRangeSkill_6] = useState(0)
    let [rangeSkill_7,setRangeSkill_7] = useState(0)
    let [rangeSkill_8,setRangeSkill_8] = useState(0)


    return(
        <div className='assesment'>

            <div className="back-cont">
                <img src={arrow} alt="" />
                
                <h4>Employee Assessment</h4>
            </div>
            <div className="row employe-details">
                <div className="col-xl-8 col-lg-7 col-md-6 col-12 employe-prof">
                    <div className="prof-img">
                        <img src={pic} alt="" />
                    
                    </div>
                    <div className="prof-text">
                        <h3>Govarthan, 24</h3>
                        <h6>Project Manager at The example company</h6>
                        <h6>Chennai, India</h6>
                    </div>

                </div>
                <div className="col-xl-4 col-lg-5 col-md-6 col-12 employe-score">
                    <div className="col-12 circles">
                       <div className="col-6 circle-box">
                            <div className="circle" data-prog="95">
                                <svg width={250} height="250">
                                <circle
                                    class="progress-ring__circle"
                                    stroke="#00823B"
                                    stroke-width="15"
                                    // fill="transparent"
                                    r="35"
                                    cx="125"
                                    cy="125">

                                    </circle>
                                </svg>
                                <div className="circle-inner">
                                    <h1>95%</h1>
                                </div>
                            </div>
                            <div className="text">
                                <h6>Colleague Score</h6>
                            </div>
                       </div>
                        <div className="col-6 circle-box">
                            <div className="circle" data-prog="75">
                                <svg width={250} height="250">
                                <circle
                                    class="progress-ring__circle"
                                    stroke="#00823B"
                                    stroke-width="15"
                                    // fill="transparent"
                                    r="35"
                                    cx="125"
                                    cy="125">

                                    </circle>
                                </svg>
                                <div className="circle-inner">
                                    <h1>75%</h1>
                                </div>
                            </div>
                            <div className="text">
                                <h6>Score</h6>
                            </div>
                        </div>
                        
                    </div>
                     
                </div>
            </div>
            <div className="row skill-assessment">
                <div className="col-xl-6 col-lg-6 skill-box-1">
                    <div className="col-12 slider-1">
                        <div className="col-3  heading">
                            <h3>Communication</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_1}
                            onChange = {(e)=>{
                                setRangeSkill_1(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2    value-1" id="rangeValue"><h5>{rangeSkill_1}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Attitude</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_2}
                             onChange = {(e)=>{
                                setRangeSkill_2(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_2}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Ability to learn</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_3}
                            onChange = {(e)=>{
                                setRangeSkill_3(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_3}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Punctuality</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_4}
                            onChange = {(e)=>{
                                setRangeSkill_4(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_4}%</h5></div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-6 skill-box-2">
                    <div className="col-12 slider-1">
                        <div className="col-xl-3 col-4 heading">
                            <h3>Commitment</h3>
                        </div>
                        <div className="col-xl-6 col-5 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_5}
                            onChange = {(e)=>{
                                setRangeSkill_5(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_5}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Trustworthiness</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_6}
                            onChange = {(e)=>{
                                setRangeSkill_6(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_6}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Skill</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_7}
                            onChange = {(e)=>{
                                setRangeSkill_7(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_7}%</h5></div>
                    </div>
                    <div className="slider-1">
                        <div className="col-3 heading">
                            <h3>Team Player</h3>
                        </div>
                        <div className="col-6 slied">
                            <input type="range" className='range-1' min="0" max="100" defaultValue={rangeSkill_8}
                            onChange = {(e)=>{
                                setRangeSkill_8(e.target.value)
                            }}/>
                        </div>
                        <div className="col-2 value-1" id="rangeValue"><h5>{rangeSkill_8}%</h5></div>
                    </div>
                </div>   
                <div className="row note">
                    <div className="row note-0">
                        <div className="note-head">
                            <h3>note</h3>
                        </div>
                        <div className="quote-img">
                            <img src={quote} alt="" />

                        </div>
                        <div className="col-xl-8 col-md-8 col-sm-8  note-1">
                            <div className="col-xl-3 col-md-4 col-sm-5 note-text">
                                <h4>good employee</h4>
                            </div>
                            <div className="col-xl-3 col-md-4 col-sm-5  note-text">
                                <h4>great employee</h4>
                            </div>
                            <div className="col-xl-3 col-md-4 col-sm-5  note-text">
                                <h4>poor employee</h4>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-8 col-sm-8 note-2">
                            <div className="col-xl-3 col-md-4 col-sm-5  note-text">
                                <h4>good employee</h4>
                            </div>
                            <div className="col-xl-3 col-md-4 col-sm-5  note-text">
                                <h4>great employee</h4>
                            </div>
                        </div>
                        <div className="or">
                            <h6></h6>
                           <h3>or</h3>
                        </div>   
                        <div className="assessment-text">
                           <textarea id="assessment" name="assessment" rows="3" cols="100" placeholder='enter your text assessment...'/>
                        </div>
                    </div>
                    
                </div>               
            </div>
            <div className="submit">
                <img src={check_1} alt="" />
                <button>Submit Assessment</button>
            </div>
              
               
                   
        </div>    
    )
}
export default EmployeeAssessment;