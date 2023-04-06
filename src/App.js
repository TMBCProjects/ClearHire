import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup/SignupForm/Signup";
import SignupOptions from "./pages/Signup/SignupOptions";
import SignupChooseUser from "./pages/Signup/SignupChooseUser";
import SignupDone from "./pages/Signup/SignupDone";
import Approval from "./pages/Employer/Approval/Approval";
import SearchEmployee from "./pages/Employer/SearchEmployee/SearchEmployee";
import Navbar from "./components/NavBar/Navbar";
import VerficationRequest from "./pages/Employer/VerficationRequest/VerficationRequest";
import OnboardingForm from "./pages/Employer/OnboardingForm/OnboardingForm";
import OfferLetterSent from "./pages/Employer/OfferLetterSent";
import Assessment from "./pages/Employer/Assessment/Assessment";
import Employee from "./pages/Employer/EmployeeDetails/index";
import CREATE_EMPLOYEE from "./pages/Onboard/CREATE_EMPLOYEE";
import Profile from "./pages/Profile/Profile";
import EmployeeAssessment from "./pages/EmployeeAssessment/EmployeeAssessment";


function App() {
  return (
    <div>
      <Router>
        {!sessionStorage.getItem("LoggedIn") ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signup-options" element={<SignupOptions />}></Route>
              <Route path="/user-options" element={<SignupChooseUser />}></Route>
              <Route path="/signup-done" element={<SignupDone />}></Route>
              <Route path="/create-employee" element={<CREATE_EMPLOYEE />}></Route>
              <Route path="/Profile" element={<Profile/>}></Route>
              <Route path="/EmployeeAssessment" element={<EmployeeAssessment/>}></Route>

            </Routes>
          </>
        ) : (
          <>
            {sessionStorage.getItem("LoggedIn") === "Employer" ? (
              <div style={{ backgroundColor: "#F5F7F9" }}>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={<SearchEmployee />}></Route>
                  <Route
                    path="/employer-approval"
                    element={<Approval />}></Route>
                  <Route
                    path="/verification-request"
                    element={<VerficationRequest />}></Route>
                  <Route
                    path="/assessment"
                    element={<Assessment />}></Route>
                  <Route
                    path="/onboarding-form"
                    element={<OnboardingForm />}></Route>
                  <Route
                    path="/offerletter-sent"
                    element={<OfferLetterSent />}></Route>
                  <Route
                    path="/employee-details"
                    element={<Employee />}></Route>
                </Routes>
              </div>
            ) : (
              ""
            )}
          </>
        )}
        <div className="footer shadow shadow-sm bg-light">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
