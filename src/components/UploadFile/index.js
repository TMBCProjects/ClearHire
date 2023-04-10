import React, { useState } from 'react'
import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import "../UploadPic/UploadPic.css"
import { deletePhoto, uploadPhoto } from "../../utils/FirebaseUtils";
export default function UploadPic() {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const handleFileUpload = async (event) => {
    const imageUrl = await uploadPhoto(event.target.files[0]);
    setProfileImage(imageUrl);
    sessionStorage.setItem("profileImage", imageUrl);
    setPhotoLoading(true);
  };
  const removeImg = async (e) => {
    e.preventDefault();
    setProfileImage(await deletePhoto(profileImage));
    sessionStorage.removeItem("profileImage");
    setPhotoLoading(false);
  };
  return (
    <div className="input profilepic">
      <div className="profilepicture">
        <label
          htmlFor="photoInput"
          style={{
            width: "100%",
            background: `#FFFFFF`,
            border: "1px solid #00823B",
            cursor:"pointer",
            textAlign: "center",
            borderRadius: "0.375rem",
            padding: ".4vh",
            color:"#00823B",
            fontWeight:"bold",
            fontSize:"1rem"
          }}
          className="photoLabel">
          {photoLoading ? (
            <div onClick={removeImg}>
              <FileOutlined
                style={{
                  fontSize: "large",
                  backdropFilter: "blur(4px)",
                }}
              />
              &nbsp;View Resume
            </div>
          ) : (
            <>
              <PlusOutlined
                style={{
                  fontSize: "x-large",
                  backdropFilter: "blur(4px)",
                  color:"#00823B"
                }}
              />
              &nbsp;Add Resume
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
  );
}
