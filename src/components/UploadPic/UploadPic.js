import React, { useState } from 'react'
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import "../UploadPic/UploadPic.css"

export default function UploadPic() {
    const [photoLoading, setPhotoLoading] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const handleFileUpload = (event) => {
        setProfileImage(event.target.value);
        // const file = event.target.files[0];
        // let newInput = { photoFile: file };
        // setUserDetails({ ...userDetails, ...newInput });
        setPhotoLoading(true);
    };
    const removeImg = (e) => {
        e.preventDefault();
        setProfileImage("")
        setPhotoLoading(false)
    }
    return (
        <div className='input profilepic'>
            <div className="profilepicture">
                <label
                    htmlFor="photoInput"
                    style={{
                        width: "100%",
                        background: `url(${profileImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        textAlign: "center",
                        borderRadius: "0.375rem",
                        padding: "1vh"
                    }}
                    className="photoLabel"
                >
                    {photoLoading ? (
                        <div onClick={removeImg}>
                            <CloseOutlined
                                style={{
                                    fontSize: "large",
                                    backdropFilter: "blur(4px)",
                                }}

                            />&nbsp;Remove Image
                        </div>
                    ) : (
                        <>
                            <UploadOutlined
                                style={{
                                    fontSize: "x-large",
                                    backdropFilter: "blur(4px)",
                                }}
                            />&nbsp;Upload Image
                            <input
                                id="photoInput"
                                type="file"
                                style={{
                                    width: "0",
                                    visibility: "hidden",
                                }}
                                onChange={(e) => {
                                    handleFileUpload(e);
                                }}
                            />
                        </>
                    )}
                </label>
            </div>
        </div>
    )
}
