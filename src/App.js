import "./App.css";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from './pages/Signup/SignupForm/Signup';
import SignupOptions from './pages/Signup/SignupOptions';
import SignupChooseUser from './pages/Signup/SignupChooseUser';
import SignupDone from './pages/Signup/SignupDone';
import Approval from "./pages/Employer/Approval/Approval";
import SearchEmployee from "./pages/Employer/SearchEmployee/SearchEmployee";
import EmployerNavbar from "./pages/Employer/NavBar/EmployerNavbar";
import VerficationRequest from "./pages/Employer/VerficationRequest/VerficationRequest";

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
            </Routes>
          </>
        )
          :
          (
            <>
              {sessionStorage.getItem("LoggedIn") === "Employee" ? (
                <div style={{ backgroundColor: "#F5F7F9" }}>
                  <EmployerNavbar />
                  <Routes>
                    <Route path="/" element={<SearchEmployee />}></Route>
                    <Route path="/employer-approval" element={<Approval />}></Route>
                    <Route path="/verification-request" element={<VerficationRequest />}></Route>
                  </Routes>
                </div>
              )
                :
                ""
              }
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
