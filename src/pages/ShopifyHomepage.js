import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactGA from 'react-ga';
import "./ShopifyHomepage.css";

export default function ShopifyHomepage() {

    useEffect(() => {
        ReactGA.initialize('UA-148934470-2');
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <iframe src="https://stoic-albattani-34d893.netlify.app/components/landingPages/SaaSProductLandingPage"
            // title="W3Schools Free Online Web Tutorials"
            // width="100%"
            style={{
                // position: 'absolute',
                height: '100vh',
                width: '100%',
                border: 'none',
                backgroundColor: 'white'
            }}
        >

        </iframe >
    );
}