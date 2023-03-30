import "./App.css";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupEmployer from './pages/Signup/SignupForm/SignupEmployer';
import SIGNUP_OPTIONS from './pages/Signup/SIGNUP_OPTIONS';
import SIGNUP_CHOOSE_USER from './pages/Signup/SIGNUP_CHOOSE_USER';
import SIGNUP_DONE from './pages/Signup/SIGNUP_DONE';

function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signupEmployer" element={<SignupEmployer />}></Route>
          <Route path="/signup-options" element={<SIGNUP_OPTIONS />}></Route>
          <Route path="/user-options" element={<SIGNUP_CHOOSE_USER />}></Route>
          <Route path="/signup-done" element={<SIGNUP_DONE />}></Route>
        </Routes>
        <div className="footer shadow shadow-sm bg-light">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
