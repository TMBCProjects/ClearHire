import React, { useState } from 'react'
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import "../UploadPic/UploadPic.css"
import { deletePhoto, uploadPhoto } from "../../utils/FirebaseUtils";
import { useEffect } from "react";
import { removeImageLink } from "../../DataBase/Employee/employee";

export default function UploadPic({ url }) {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    if (url) {
      setPhotoLoading(true);
    }
  }, []);
  const handleFileUpload = async (event) => {
    const imageUrl = await uploadPhoto(event.target.files[0]);
    setProfileImage(imageUrl);
    sessionStorage.setItem("profileImage", imageUrl);
    setPhotoLoading(true);
  };
  const removeImg = async (e) => {
    e.preventDefault();
    const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    userDatas.data.profileImage = "";
    sessionStorage.setItem("userData", JSON.stringify(userDatas));
    if (url === "") {
      setProfileImage(await deletePhoto(profileImage));
    } else {
      setProfileImage(await deletePhoto(url));
    }
    await removeImageLink(userDatas.id);
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
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            textAlign: "center",
            borderRadius: "0.375rem",
            padding: "1vh",
          }}
          className="photoLabel">
          {photoLoading ? (
            <div onClick={removeImg}>
              <CloseOutlined
                style={{
                  fontSize: "large",
                  backdropFilter: "blur(4px)",
                }}
              />
              &nbsp;Remove Image
            </div>
          ) : (
            <>
              <UploadOutlined
                style={{
                  fontSize: "x-large",
                  backdropFilter: "blur(4px)",
                }}
              />
              &nbsp;Upload Image
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
