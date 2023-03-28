import React from "react";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Login";
import Banner from "../../components/Bannner/Banner";

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Contact />
        </div>
    );
};

export default Home;