import "./App.css";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupEmployer from './pages/Signup/SignupForm/SignupEmployer';
import Signup_Options from './pages/Signup/Signup_Options';
import Signup_Choose_User from './pages/Signup/Signup_Choose_User';
import Signup_Done from './pages/Signup/Signup_Done';

function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signupEmployer" element={<SignupEmployer />}></Route>
          <Route path="/signup-options" element={<Signup_Options />}></Route>
          <Route path="/user-options" element={<Signup_Choose_User />}></Route>
          <Route path="/signup-done" element={<Signup_Done />}></Route>
        </Routes>
        <div className="footer shadow shadow-sm bg-light">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
