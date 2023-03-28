import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Banner from "./components/Bannner/Banner";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
