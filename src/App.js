import "./App.css";
import Header from "./components/Header/Header";
import Home from './pages/Home/Home';
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignupEmployer from './pages/Signup/SignupForm/SignupEmployer';
import SignupEmployee from './pages/Signup/SignupForm/SignupEmployee';
import SignupOptions from './pages/Signup/SignupOptions';
import SignupChooseUser from './pages/Signup/SignupChooseUser';
import SignupDone from './pages/Signup/SignupDone';

function App() {
  return(
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signupEmployer" element={<SignupEmployer />}></Route>
          <Route path="/signupEmployee" element={<SignupEmployee />}></Route>
          <Route path="/signup-options" element={<SignupOptions />}></Route>
          <Route path="/user-options" element={<SignupChooseUser />}></Route>
          <Route path="/signup-done" element={<SignupDone />}></Route>
        </Routes>
        <div className="footer shadow shadow-sm bg-light">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
