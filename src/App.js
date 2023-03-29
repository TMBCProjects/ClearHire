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

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup-options" element={<SignupOptions />}></Route>
          <Route path="/user-options" element={<SignupChooseUser />}></Route>
          <Route path="/signup-done" element={<SignupDone />}></Route>
          <Route path="/employer-approval" element={<Approval />}></Route>
        </Routes>
        <div className="footer shadow shadow-sm bg-light">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
