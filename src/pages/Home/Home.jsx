import React from "react";
import Login from "../../components/Login/Login";
import About from "../../components/About/About";
import Banner from "../../components/Bannner/Banner";
import Footer from "../../components/Footer/Footer";

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Login />
            <Footer />

        </div>
    );
};

export default Home;