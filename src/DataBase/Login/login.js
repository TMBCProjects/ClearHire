import { Collections } from "../../utils/Collections";
import { getDocument, setDocument, signIn } from "../../utils/FirebaseUtils";

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
