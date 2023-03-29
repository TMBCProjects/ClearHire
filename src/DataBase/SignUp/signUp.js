// import {
//   arrayUnion,
//   collection,
//   query,
//   where,
// } from 'firebase/firestore'
// import { firestoreDB } from '../../firebase-config'
import Employee from '../../Modals/DB/Employee'
import Employer from '../../Modals/DB/Employer'
import { Collections } from '../../utils/Collections'
import { Fields } from '../../utils/Fields'
import { addDocument, createUser, getDocuments, getDocument, updateDocument, updateUser } from '../../utils/FirebaseUtils'

// export default async function defaultFn() {
// }

// //READS
// export async function readCompanies() {
//   let data = []
//   const querySnapshot = await getDocuments(query(
//     collection(firestoreDB, Collections.companies),
//     where(Fields.isActive, '==', true),
//   ))
//   querySnapshot.forEach((doc) => {
//     var company = new Company()
//     company = {
//       id: doc.id,
//       companyName: doc.data().companyName,
//       designations: doc.data().designations,
//     }
//     data.push(company)
//   })
//   return data
// }
// //WRITES

export async function addNewEmployee(docId, user) {
  var employee = new Employee()
  employee = {
    employeeName: user.employeeName || "",
    role: user.role,
    employeeCountry: user.country,
    employeeState: user.state,
    profileImage: user?.profileImage || "",
    isActive: true,
    employeeEmail: user.email,
    dateOfBirth: user.dateOfBirth,
  };
  await addDocument(Collections.employees, employee, docId)
}

export async function addNewEmployer(docId, user) {
  var employer = new Employer()
  employer = {
    companyWebsite: user.companyWebsite,
    companyName: user.companyName,
    companyLogo: user.companyLogo || "",
    companyCountry: user.country,
    companyState: user.state,
    isActive: true,
    employerEmail: user.email,
    companyEstablishmentYear: user.companyEstablishmentYear,
  };
  await addDocument(Collections.employers, employer, docId)
}
// //SIGNUP
export async function registerUser(doc, user) {
  if (user.role === Collections.Employer) {
    await addNewEmployer(doc, user);
  }
  else if (user.role === Collections.Employee) {
    await addNewEmployee(doc, user);
  }
}

export async function registerLogin(user) {
  const cred = await createUser(user)
  updateUser(user)
  await registerUser(cred.user.uid, user)
}


    // employeeName: user.employeeName || "",
    // role: user.role,
    // employeeCountry: user.country,
    // employeeState: user.state,
    // profileImage: user?.profileImage || "",
    // isActive: true,
    // employeeEmail: user.email,
    // dateOfBirth: user.dateOfBirth,
    // companyWebsite: user.companyWebsite,
    // companyName: user.companyName,
    // companyLogo: user.companyLogo || "",
    // companyCountry: user.country,
    // companyState: user.state,
    // isActive: true,
    // employerEmail: user.email,
    // companyEstablishmentYear: user.companyEstablishmentYear,
        
        
// export async function checkUser(email) {
//   let user = {};
//   const querySnapshot = await getDocuments(query(
//     collection(firestoreDB, Collections.managers),
//     where(Fields.managerEmail, '==', email),
//   ))
//   if (!querySnapshot.empty) {
//     querySnapshot.forEach((doc) => {
//       user = {
//         uid: doc.id,
//         photoURL: 'Manager'
//       }
//     })
//     return user;
//   } else {
//     const querySnapshot2 = await getDocuments(query(
//       collection(firestoreDB, Collections.teammates),
//       where(Fields.teammateEmail, '==', email),
//     ))
//     if (!querySnapshot2.empty) {
//       querySnapshot2.forEach((doc) => {
//         user = {
//           uid: doc.id,
//           photoURL: 'Teammate'
//         }
//       })
//       return user;
//     } else {
//       return null;
//     }
//   }
// }
