import React, { useState } from 'react'
import "./Profile.css";
import pic from "../../images/download.jpg";
import './text.jsx'
import { onSubmit } from './text.jsx';
function Profile() {

    var a =10
    let [file,setFile] = useState('')
    let [adhar,setAdhar]  = useState('')
 
    // const slider = document.querySelector("input");
    // const value = document.querySelector(".value");
    // value.textContent = slider.value;
    // slider.oninput = function(){
    //     value.textContent = this.value;
    // }


  return (
    <div className='profile' id='profile'>
        <div className="profile-img">
             <img src={pic} alt="" />
             <div className="round">
                <input type="file"/>
                <i class="fa-solid fa-camera"></i>
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
                        <div className="col-5 s-name">
                            <input type="text" name="s-name" id="s-name"
                            placeholder='Skill Name 1'
                            />
                        </div>
                        <div className="col-6 s-range">
                            <div className="slider">
                                <input type="range"/>
                            </div>
                            <div className="value">100%</div>
                        </div>
                    </div>
                    <div className="col-12 skill-item-1">
                        <div className="col-5 s-name">
                            <input type="text" name="s-name" id="s-name"
                            placeholder='Skill Name 2'
                            />
                        </div>
                        <div className="col-6  s-range">
                            <div className="slider">
                                <input type="range"/>
                            </div>
                            <div className="value">100%</div>
                        </div>
                        <div className="col-1 add">
                            <button><i class="fa-solid fa-plus"></i></button> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="done" onClick={onSubmit()}>
                        <i class="fa-regular fa-circle-check"></i>
                        <button onClick={onSubmit}>Done</button>
                        
                    </div>
        </div>
    </div>
  
  )
}
export default Profile;
