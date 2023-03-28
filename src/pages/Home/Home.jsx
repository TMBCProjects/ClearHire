import React from "react";
import Login from "../../components/Login/Login";
import About from "../../components/About/About";
import Banner from "../../components/Bannner/Banner";

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Login />
        </div>
    );
};

export default Home;