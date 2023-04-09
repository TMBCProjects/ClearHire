import React, { useState } from 'react'
import { FileOutlined, PlusOutlined } from "@ant-design/icons";
import "../UploadPic/UploadPic.css";
export default function UploadPic() {
  const [fileLoading, setFileLoading] = useState(false);
  const handleFileUpload = async (event) => {
    console.log(event.target);
    sessionStorage.setItem("resume", { file: event.target.files[0] });
    let resume = JSON.parse(sessionStorage.getItem("resume"));
    console.log(resume);
    setFileLoading(true);
  };
  const removeImg = async (e) => {
    e.preventDefault();
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
