import React, { useState } from 'react'
import "./Profile.css";
import pic from "../../images/download.jpg";
import cam from "../../images/cam.svg";
import check from "../../images/check-circle.svg";
import add from "../../images/add.svg";



import './text.jsx'
import { onSubmit } from './text.jsx';
function Profile() {

    var a =10
    let [file,setFile] = useState('')
    let [adhar,setAdhar]  = useState('')
    let [rangeSkill_1,setRangeSkill_1] = useState(0)
    let [rangeSkill_2,setRangeSkill_2] = useState(0)

    
   


  return (
    <div className='profile' id='profile'>
        <div className="profile-img">
             <img src={pic} alt="" />

             <div className="round">
                <input type="file"/>
                <img src={cam} alt="" />

                {/* <i class="fa-solid fa-camera"></i> */}
             </div>
             <h1>Govarthan, 24</h1>
             <h2>Chennai, India</h2>
        </div>
        <div className="row form">
            <div className="col-12 form-set">
                <div className="col-xl-5 col-md-6 col-sm-9 mx-auto  form-2 f-2">

                    <input type="file" id="file" name="file" accept=".txt, .pdf" onChange={(e)=>{
                        // alert(e.target.files[0].name)
                        setFile(e.target.files[0].name)
                        
                    }}/>
                        
                        <label for="file" class="custom-file-upload">{file!='' ? file : 'Add Resume'}</label>
                        <span id="filename"></span>

                        <input type="submit" value="Upload"/>
                </div>
                <div className="col-xl-5 col-md-6 col-sm-9 mx-auto form-2">
                    <input 
                    type="url"
                    placeholder='Add Portfolio link...'
                    />
                </div>
                <div className="col-xl-5 col-md-6 col-sm-9 mx-auto  form-2">
                    <input
                    type="number"
                    placeholder="Aadhar Number"
                    value = {adhar}
                    onChange={(e)=>{
                        // alert(e.target.value)
                        setAdhar(e.target.value)
                    }}
                    /> 
                </div>
            </div>
            
                
        </div>
        <div className="skill">
            <div className=" row skill-item">
                   
                <div className="col-xl-5 col-md-6 col-sm-9  mx-auto skill-set">
                    <div className="col-12 text">
                        <h5>Your Skill</h5>
                    </div>
                    <div className="col-12 skill-item-1">
                        <div className="col-4 s-name">
                            <input type="text" name="s-name" id="s-name"
                            placeholder='Skill Name 1'
                            />
                        </div>
                        <div className="col-7 s-range">
                            <div className="slider">
                                <input type="range" className='range' min="0" max="100" defaultValue={rangeSkill_1}
                                onChange = {(e)=>{
                                    setRangeSkill_1(e.target.value)
                                }}/>
                            </div>
                            <div className="value" id="rangeValue">{rangeSkill_1}%</div>
                        </div>
                    </div>
                    <div className="col-12 skill-item-1">
                        <div className="col-4 s-name">
                            <input type="text" name="s-name" id="s-name"
                            placeholder='Skill Name 2'
                            />
                        </div>
                        <div className="col-7  s-range">
                            <div className="slider">
                               <input type="range" className='range' min="0" max="100" defaultValue={rangeSkill_2}
                                onChange = {(e)=>{
                                    setRangeSkill_2(e.target.value)
                                }}/>
                                
                            </div>
                            <div className="value">{rangeSkill_2}%</div>
                        </div>
                        <div className="col-1 add">
                           <img src={add} alt="" />
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="done" onClick={onSubmit()}>
                         <img src={check} alt="" />      
                        <button onClick={onSubmit}>Done</button>
                        
                    </div>
        </div>
    </div>
  
  )
}
export default Profile;
