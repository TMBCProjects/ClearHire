import React, { useEffect } from "react";
import Login from "../../components/Login/Login";
import About from "../../components/About/About";
import Banner from "../../components/Bannner/Banner";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const Home = () => {

    const makeAPICall = async () => {
        try {
            await fetch("https://worldtimeapi.org/api/ip")
                .then(response => response.json())
                .then(data => console.log(data.datetime));
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        makeAPICall();
    }, [])
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