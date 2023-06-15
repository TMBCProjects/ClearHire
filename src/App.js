import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup/SignupForm/Signup";
import SignupChooseUser from "./pages/Signup/SignupChooseUser";
import SignupDone from "./pages/Signup/SignupDone";
import Approval from "./pages/Employer/Approval/Approval";
import SearchEmployee from "./pages/SearchEmployee/SearchEmployee";
import Navbar from "./components/NavBar/Navbar";
import VerficationRequest from "./pages/Employee/VerficationRequest/VerficationRequest";
import OnboardingForm from "./pages/Employer/OnboardingForm/OnboardingForm";
import OfferLetterSent from "./pages/Employer/OfferLetterSent/OfferLetterSent";
import EmployeeDetails from "./pages/Employer/EmployeeDetails/EmployeeDetails";
import Profile from "./pages/Employee/Profile/Profile";
import EmployeeOfferLetter from "./pages/Employee/EmployeeOfferLetter/EmployeeOfferLetter";
import EmployeeAssessment from "./pages/EmployeeAssessment/EmployeeAssessment";
import EmployeeAssessmentForm from "./pages/EmployeeAssessment/EmployeeAssesmentForm";
import Assessment from "./pages/Employee/Assessment/Assessment";
import EmployerProfile from "./pages/Employer/Profile/Profile";
import Requests from "./pages/Employer/Requests/Requests";
import RequestApproval from "./pages/Employer/RequestApproval/RequestApproval";
import ViewEmployeeProfile from "./pages/Employer/EmployeeDetails/ViewEmployeeProfile";
import ViewAssessment from "./pages/Employer/ViewAssessment/ViewAssessment";
import Offers from "./pages/Employee/OfferList/Offers";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SignupWithGoogle from "./components/SignupWithGoogle/SignupWithGoogle";
import SignUpChooseUserGoogle from "./components/SignupWithGoogle/SignUpChooseUserGoogle";
import RecruitmentPool from "./pages/Employer/RecruitmentPool/RecruitmentPool";

function App() {
  return (
    <div className="main">
      <Router>
        {!sessionStorage.getItem("LoggedIn") ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              ></Route>
              {/* <Route
                path="/user-options"
                element={<SignupOptions />}></Route> */}
              <Route
                path="/signup-google-options"
                element={<SignUpChooseUserGoogle />}
              ></Route>
              <Route
                path="/signup-with-google"
                element={<SignupWithGoogle />}
              ></Route>

              <Route
                path="/signup-options"
                element={<SignupChooseUser />}
              ></Route>
              <Route path="/signup-done" element={<SignupDone />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
            </Routes>
          </>
        ) : (
          <>
            {sessionStorage.getItem("LoggedIn") === "Employer" ? (
              <div style={{ backgroundColor: "#F5F7F9", height: "auto" }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<SearchEmployee />}></Route>
                  <Route path="/profile" element={<EmployerProfile />}></Route>
                  <Route
                    path="/employer-approval"
                    element={<Approval />}
                  ></Route>
                  <Route path="/requests" element={<Requests />}></Route>
                  <Route
                    path="/approvalRequest-form"
                    element={<RequestApproval />}
                  ></Route>
                  <Route
                    path="/ViewEmployeeProfile"
                    element={<ViewEmployeeProfile />}
                  ></Route>

                  <Route
                    path="/Assessment-form"
                    element={<EmployeeAssessmentForm />}
                  ></Route>
                  <Route
                    path="/EmployeeAssessment"
                    element={<EmployeeAssessment />}
                  ></Route>
                  <Route
                    path="/ViewAssessment"
                    element={<ViewAssessment />}
                  ></Route>
                  <Route
                    path="/employee-details"
                    element={<EmployeeDetails />}
                  ></Route>
                  <Route
                    path="/onboarding-form"
                    element={<OnboardingForm />}
                  ></Route>
                  <Route
                    path="/offerletter-sent"
                    element={<OfferLetterSent />}
                  ></Route>
                  <Route
                    path="/recruitment-pool"
                    element={<RecruitmentPool />}
                  ></Route>
                </Routes>
              </div>
            ) : (
              ""
            )}

            <>
              {sessionStorage.getItem("LoggedIn") === "Employee" ? (
                <div style={{ backgroundColor: "#F5F7F9", height: "auto" }}>
                  <Navbar />
                  <Routes>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route
                      path="/employeeOfferLetter"
                      element={<EmployeeOfferLetter />}
                    ></Route>
                    <Route path="/offerLetters" element={<Offers />}></Route>
                    <Route path="/" element={<SearchEmployee />}></Route>
                    <Route
                      path="/EmployeeAssessment"
                      element={<EmployeeAssessment />}
                    ></Route>
                    <Route
                      path="/employee-details"
                      element={<EmployeeDetails />}
                    ></Route>
                    <Route
                      path="/verification-request"
                      element={<VerficationRequest />}
                    ></Route>
                    <Route path="/Assessment" element={<Assessment />}></Route>
                  </Routes>
                </div>
              ) : (
                ""
              )}
            </>
          </>
        )}
      </Router>
      <Footer />
    </div>
  );
}

export default App;
