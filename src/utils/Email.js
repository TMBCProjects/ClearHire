import axios from "axios";

export default async function sendEmail(email, subject, output) {
  try {
    const res = await axios.post(
      "https://us-central1-clearhire-28c23.cloudfunctions.net/sendMail",
      {
        subject,
        email,
        output,
      }
    );
    if (res.status === 200) {
      alert("Sent Mail!");
      return true;
    } else {
      alert("Mail is not sent!");
      return false;
    }
  } catch (err) {
    return false;
  }
}