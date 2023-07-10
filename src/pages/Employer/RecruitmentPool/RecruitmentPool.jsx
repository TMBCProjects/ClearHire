import React, { useEffect, useState } from "react";
import "./RecruitmentPool.css";
import { Empty } from "antd";

import { readUnemployed } from "../../../DataBase/Employer/employer";
import RecruitmentCard from "../../../components/Cards/RecruitmentCard";

export default function RecruitmentPool() {
    const userDatas = JSON.parse(sessionStorage.getItem("userData"));
    const user = sessionStorage.getItem("LoggedIn");
    const [employeeList, setEmployeeList] = useState([]);
    const [filters, setFilters] = useState({
        typeOfEmployment: "",
        salary: "",
        location: "",
        designation: "",
    });
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                setFilters({
                    typeOfEmployment: "",
                    salary: "",
                    location: "",
                    designation: "",
                })
                const data = await readUnemployed();
                return data;
            } catch (error) {
                console.log(error);
            }
        };
        fetchEmployeeDetails().then((data) => {
            setEmployeeList(data);
        });
    }, [user]);

    return (
        <div className="employer-home">
            <div className="search">
                <div className="result-employees">
                    <div className="row1">
                        <div className="result-count">
                            {employeeList.length > 1 ? `${employeeList.length} records` : ""}
                        </div>
                    </div>
                    <div className="row2"
                        style={
                            employeeList.length === 0 ? { justifyContent: "center" } : {}
                        }
                    >
                        {employeeList.length === 0 && (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No Records"
                            />
                        )}
                        {employeeList
                            .filter((item) => {
                                const { typeOfEmployment, designation, salary, location } =
                                    filters;
                                return (
                                    (typeOfEmployment === "" ||
                                        item.typeOfEmployment.toLowerCase() ===
                                        typeOfEmployment.toLowerCase()) &&
                                    (designation === "" ||
                                        item.designation.toLowerCase().includes(designation)) &&
                                    (salary === "" || +item?.salary <= +salary) &&
                                    (location === "" ||
                                        item.companyLocation.toLowerCase() ===
                                        location.toLowerCase())
                                );
                            })
                            .map((info) => {
                                return (
                                    <RecruitmentCard
                                        info={info}
                                        employerId={userDatas.id}
                                        name={info.employeeName}
                                        companyLocation={info.companyLocation}
                                        designation={info.designation}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
