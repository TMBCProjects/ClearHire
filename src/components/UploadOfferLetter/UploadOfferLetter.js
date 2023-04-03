import React, { useState } from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import "../UploadOfferLetter/UploadOfferLetter.css";
import {
  deleteOfferLetter,
  uploadOfferLetter,
} from "../../utils/FirebaseUtils";

export default function UploadOfferLetter({ name }) {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [offerLetter, setOfferLetter] = useState("");
  const handleFileUpload = async (event) => {
    const imageUrl = await uploadOfferLetter(name, event.target.files[0]);
    setOfferLetter(imageUrl);
    sessionStorage.setItem("offerLetter", imageUrl);
    setPhotoLoading(true);
  };
  const removeImg = async (e) => {
    e.preventDefault();
    setOfferLetter(await deleteOfferLetter(offerLetter));
    sessionStorage.removeItem("offerLetter");
    setPhotoLoading(false);
  };
  return (
    <div className="input profilepic">
      <div className="profilepicture">
        <label
          htmlFor="photoInput"
          style={{
            width: "100%",
            background: `url(${offerLetter})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
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
              &nbsp;Remove Offer Letter
            </div>
          ) : (
            <>
              <UploadOutlined
                style={{
                  fontSize: "x-large",
                  backdropFilter: "blur(4px)",
                }}
              />
              &nbsp;Upload Offer Letter
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
