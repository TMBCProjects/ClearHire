import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
