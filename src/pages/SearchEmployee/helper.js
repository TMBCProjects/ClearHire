import { readColleagues } from "../../DataBase/Employee/employee";
import { readEmployees } from "../../DataBase/Employer/employer";

export const fetchCollegueDetails = async () => {
    try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = userDatas1.data.currentEmployerId
            ? await readColleagues(
                userDatas1.id,
                userDatas1.data.currentEmployerId
            )
            : [];
        return data;
    } catch (error) {
        console.log(error);
    }

};

export const fetchEmployeeDetails = async () => {
    try {
        const userDatas1 = JSON.parse(sessionStorage.getItem("userData"));
        const data = await readEmployees(userDatas1.id);
        return data;
    } catch (error) {
        console.log(error);
    }
};

