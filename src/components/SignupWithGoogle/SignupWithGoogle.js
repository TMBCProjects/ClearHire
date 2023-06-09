import React, { useState, useRef, useEffect } from "react";
import { Select, Space } from "antd";
import { Button, Input } from "antd";
import { Tag, Tooltip, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./SignupWithGoogle.css";
import Dropdown from "../../components/Dropdrowns/Dropdown";
import InputField from "../../components/Input/InputField";
import UploadPic from "../../components/UploadPic/UploadPic";
import { registerGoogleLogin } from "../../DataBase/SignUp/signUp";
import Loader from "../../components/Loader";


const initialValues = {
  email: "",
  password: "",
  name: "",
  profileImage: "",
  role: "",
};
const SignupWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
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
    padding: "2vh",
    display: "flex",
    alignItems: "center",
    gap: "1vh",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setInputValue(e.target.value);
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

  const onAssessmentTypeChange = (event) => {
    values.assessmentType = event;
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
  const handleSubmit = () => {
    const userGoogle = JSON.parse(sessionStorage.getItem("userGoogle"));
    values.email = userGoogle.email;
    values.profileImage = sessionStorage.getItem("profileImage");
    values.role = user;
    if (user === "Employer") {
      values.companyLocations = tags;
    }
    setLoading(true);
    registerGoogleLogin(values, userGoogle.id)
      .then(() => {
        sessionStorage.removeItem("profileImage");
        sessionStorage.removeItem("profileImage");
        window.location.href = "/signup-done";
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };

  return (
    <>
      {loading && (
        <Loader
          text={"Signing up..."}
          textColor={"#000"}
        />
      )}

      <div className="signup-container">
        <div className="signupHeader">
          {user === "Employer" ? (
            <span style={{ fontWeight: "bold" }}>Employer Signup</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>Employee Signup</span>
          )}
        </div>
        <form className="form-horizontal">
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
                style={{ display: "block", paddingBottom: "3vh" }}>
                <Space
                  size={[0, 8]}
                  wrap>
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
                        onClose={() => handleClose(tag)}>
                        <span
                          style={{ padding: "1vh", fontSize: "larger" }}
                          onDoubleClick={(e) => {
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                            }
                          }}>
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip
                        title={tag}
                        key={tag}>
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
                  <Tag
                    style={tagPlusStyle}
                    onClick={showInput}>
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

          {user === "Employer" ? (
            <>
              <label className="control-label">Assessment</label>
              <div className="dropdowns">
                <Select
                  placeholder="Select assessment type"
                  className="w-100 selectBoxAssessment"
                  onChange={(e) => onAssessmentTypeChange(e)}
                  options={[
                    {
                      value: "Monthly",
                      label: "Monthly",
                    },
                    {
                      value: "Once in 3 months",
                      label: "Once in 3 months",
                    },
                    {
                      value: "Twice a year",
                      label: "Twice a year",
                    },
                    {
                      value: "Annualy",
                      label: "Annualy",
                    },
                  ]}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <Button
            className="signupBtn"
            onClick={handleSubmit}>
            Signup
          </Button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
};

export default SignupWithGoogle;
