import { query, where } from "firebase/firestore";
import { Collections } from "../../utils/Collections";
import {
  getDocument,
  getDocuments,
  setCollection,
  setDocument,
  signIn,
} from "../../utils/FirebaseUtils";
import { Fields } from "../../utils/Fields";

export default async function LoginUser(email, password) {
  const userCred = await signIn(email, password);
  return userCred.user;
}

export async function readEmployer(user) {
  let employer = null;
  const q = setDocument(Collections.employers, user);
  const docSnap = await getDocument(q);
  if (docSnap.exists()) {
    employer = { id: docSnap.id, data: docSnap.data() };
  }
  return employer;
}

export async function readEmployee(user) {
  let employee = null;
  const q = setDocument(Collections.employees, user);
  const docSnap = await getDocument(q);
  if (docSnap.exists()) {
    employee = { id: docSnap.id, data: docSnap.data() };
  }
  return employee;
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
