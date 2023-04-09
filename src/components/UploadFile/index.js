import React, { useState } from 'react'
import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import "../UploadPic/UploadPic.css";
import { deleteFile, uploadFile } from "../../utils/FirebaseUtils";
import { Fields } from "../../utils/Fields";
export default function UploadPic({ name, url }) {
  const [fileLoading, setFileLoading] = useState(false);
  const [fileData, setFileData] = useState("");
  const handleFileUpload = async (event) => {
    const fileUrl = await uploadFile(
      Fields.resumes,
      name,
      event.target.files[0]
    );
    setFileData(fileUrl);
    sessionStorage.setItem("resume", fileUrl);
    setFileLoading(true);
  };
  const removeImg = async (e) => {
    e.preventDefault();
    setFileData(url === "" ? fileData : url);
    setFileData(await deleteFile(Fields.resumes, fileData));
    sessionStorage.removeItem("resume");
    setFileLoading(false);
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
            cursor: "pointer",
            textAlign: "center",
            borderRadius: "0.375rem",
            padding: ".4vh",
            color: "#00823B",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
          className="photoLabel">
          {fileLoading ? (
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
                  color: "#00823B",
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
