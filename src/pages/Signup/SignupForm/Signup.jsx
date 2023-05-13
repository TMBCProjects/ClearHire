import { Button } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Dropdown from "../../../components/Dropdrowns/Dropdown";
import InputField from "../../../components/Input/InputField";
import UploadPic from "../../../components/UploadPic/UploadPic";
import { registerLogin } from "../../../DataBase/SignUp/signUp";
import "../SignupForm/Signup.css";
import Loader from "../../../components/Loader";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Tag, Tooltip, theme } from "antd";

const initialValues = {
  email: "",
  password: "",
  name: "",
  profileImage: "",
  role: "",
};

export default function Signup() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  let year = Array.from(
    { length: 123 },
    (_, i) => new Date().getFullYear() - i
  );
  let date = Array.from({ length: 31 }, (_, i) => i + 1);
  let month = Array.from({ length: 12 }, (_, i) => i + 1);
  var selectedYear = "";
  var user = sessionStorage.getItem("user");

  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-2);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };
  const tagInputStyle = {
    verticalAlign: "top",
    paddingBottom: "2vh",
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "1px solid #00823B ",
    padding: "1.5vh",
    display: "flex",
    alignItems: "center",
    gap: "1vh",
    justifyContent: "center",
    fontSize: "16px",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    values.profileImage = sessionStorage.getItem("profileImage");
    values.role = user;
    if (user === "Employer") {
      values.companyLocations = tags;
      console.log(values);
    }
    setLoading(true);
    registerLogin(values)
      .then(() => {
        sessionStorage.removeItem("profileImage");
        window.location.href = "/signup-done";
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  const handleYearChange = (e) => {
    selectedYear = e.target.value;
    setValues({
      ...values,
      companyEstablishmentYear: selectedYear,
    });
  };

  const handleDOBYearChange = (e) => {
    const selectedYear = e.target.value;
    values.dateOfBirth =
      values.dateOfBirth === undefined ? "" : values.dateOfBirth;
    const newDateOfBirth = `${values.dateOfBirth.split("/")[0]}/${
      values.dateOfBirth.split("/")[1]
    }/${selectedYear}`;
    setValues({
      ...values,
      dateOfBirth: newDateOfBirth,
    });
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    values.dateOfBirth =
      values.dateOfBirth === undefined ? "" : values.dateOfBirth;
    const newDateOfBirth = `${selectedMonth}/${
      values.dateOfBirth.split("/")[1]
    }/${values.dateOfBirth.split("/")[2]}`;
    setValues({
      ...values,
      dateOfBirth: newDateOfBirth,
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    values.dateOfBirth =
      values.dateOfBirth === undefined ? "" : values.dateOfBirth;
    const newDateOfBirth = `${
      values.dateOfBirth.split("/")[0]
    }/${selectedDate}/${values.dateOfBirth.split("/")[2]}`;
    setValues({
      ...values,
      dateOfBirth: newDateOfBirth,
    });
  };

  return (
    <>
      {loading && <Loader text={"Signing up..."} textColor={"#000"} />}

      <div className="signup-container">
        <div className="signupHeader">
          {user === "Employer" ? (
            <span style={{ fontWeight: "bold" }}>Employer Signup</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>Employee Signup</span>
          )}
        </div>
        <form className="form-horizontal">
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            value={values.email}
            onChange={handleInputChange}
            placeholder={
              "Input your company mail id, use an official email address."
            }
          />

          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            value={values.password}
            onChange={handleInputChange}
            placeholder={"Input your password in here."}
          />
          {user === "Employer" ? (
            <>
              <InputField
                label={"Company Name"}
                type={"text"}
                name={"name"}
                value={values.name}
                onChange={handleInputChange}
                placeholder={"Input your company name."}
              />

              <InputField
                label={"Company Website"}
                type={"url"}
                name={"companyWebsite"}
                value={values.companyWebsite}
                onChange={handleInputChange}
                placeholder={"Input your official company website link."}
              />
            </>
          ) : (
            <InputField
              label={"Your Name"}
              type={"text"}
              name={"name"}
              value={values.name}
              onChange={handleInputChange}
              placeholder={"Input your full name."}
            />
          )}

          {user === "Employer" ? (
            <>
              <label className="control-label">Company Location</label>
              <Space
                size={[0, 8]}
                wrap
                style={{ display: "block", paddingBottom: "1vh" }}
              >
                <Space size={[0, 8]} wrap>
                  {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                      return (
                        <Input
                          ref={editInputRef}
                          key={tag}
                          size="small"
                          style={tagInputStyle}
                          value={editInputValue}
                          onChange={handleEditInputChange}
                          onBlur={handleEditInputConfirm}
                          onPressEnter={handleEditInputConfirm}
                        />
                      );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={index !== -1}
                        style={{
                          userSelect: "none",
                        }}
                        onClose={() => handleClose(tag)}
                      >
                        <span
                          style={{ padding: "1vh", fontSize: "larger" }}
                          onDoubleClick={(e) => {
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                            }
                          }}
                        >
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                </Space>
                {inputVisible ? (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                ) : (
                  <Tag style={tagPlusStyle} onClick={showInput}>
                    <PlusOutlined /> Add Location
                  </Tag>
                )}
              </Space>
            </>
          ) : (
            <></>
          )}
          {user === "Employer" ? (
            <label className="control-label">Company Logo</label>
          ) : (
            <label className="control-label">Profile Image</label>
          )}
          <UploadPic />

          {user === "Employer" ? (
            <>
              <label className="control-label">
                Company Establishment Date
              </label>
              <div className="dropdowns">
                <Dropdown
                  values={year}
                  type={"number"}
                  name={"Year"}
                  id={"Year"}
                  onChange={handleYearChange}
                />
              </div>
            </>
          ) : (
            <>
              <label className="control-label">Date of Birth</label>
              <div className="dropdowns">
                <Dropdown
                  values={date}
                  type={"number"}
                  name={"Date"}
                  onChange={handleDateChange}
                />
                <Dropdown
                  values={month}
                  type={"number"}
                  name={"Month"}
                  onChange={handleMonthChange}
                />
                <Dropdown
                  values={year}
                  type={"number"}
                  name={"Year"}
                  onChange={handleDOBYearChange}
                />
              </div>
            </>
          )}
          <Button className="signupBtn" onClick={handleSubmit}>
            Signup
          </Button>
        </form>
      </div>
    </>
  );
}
