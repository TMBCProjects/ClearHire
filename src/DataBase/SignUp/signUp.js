import { query, where } from "firebase/firestore";
import Employee from "../../Modals/DB/Employee";
import Employer from "../../Modals/DB/Employer";
import { Collections } from "../../utils/Collections";
import {
  addDocument,
  createUser,
  getDocuments,
  setCollection,
  updateUser,
} from "../../utils/FirebaseUtils";
import { Fields } from "../../utils/Fields";

export async function addNewEmployee(docId, user) {
  var employee = new Employee();
  const dateParts = user.dateOfBirth.split("/");
  const timestamp = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
  employee = {
    employeeName: user.name,
    role: user.role,
    profileImage: user.profileImage,
    isActive: true,
    resume: "",
    employeeEmail: user.email,
    dateOfBirth: timestamp,
  };
  await addDocument(Collections.employees, employee, docId);
}

export async function addNewEmployer(docId, user) {
  var employer = new Employer();
  employer = {
    companyWebsite: user.companyWebsite,
    companyName: user.name,
    companyLogo: user.profileImage,
    companyLocations: user.companyLocations,
    isActive: true,
    employerEmail: user.email,
    companyEstablishmentYear: user.companyEstablishmentYear,
  };
  await addDocument(Collections.employers, employer, docId);
}
// //SIGNUP
export async function registerUser(doc, user) {
  if (user.role === Collections.Employer) {
    await addNewEmployer(doc, user);
  } else if (user.role === Collections.Employee) {
    await addNewEmployee(doc, user);
  }
}

export async function registerLogin(user) {
  const cred = await createUser(user);
  updateUser(user);
  await registerUser(cred.user.uid, user);
}

export async function checkUser(email) {
  let user = {};
  const querySnapshot = await getDocuments(
    query(
      setCollection(Collections.employers),
      where(Fields.employerEmail, "==", email)
    )
  );
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      user = {
        uid: doc.id,
        photoURL: "Employer",
      };
    });
    return user;
  } else {
    const querySnapshot2 = await getDocuments(
      query(
        setCollection(Collections.employees),
        where(Fields.employeeEmail, "==", email)
      )
    );
    if (!querySnapshot2.empty) {
      querySnapshot2.forEach((doc) => {
        user = {
          uid: doc.id,
          photoURL: "Employee",
        };
      });
      return user;
    } else {
      return null;
    }
  }
}
