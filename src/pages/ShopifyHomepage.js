import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactGA from 'react-ga';
import "./ShopifyHomepage.css";
import ShopifyLandingPage from "./ShopifyHomepage/demos/SaaSProductLandingPage";

export default function ShopifyHomepage() {

    // useEffect(() => {
    //     ReactGA.initialize('UA-148934470-2');
    //     ReactGA.pageview(window.location.pathname);
    // }, []);

    return (
        <ShopifyLandingPage />
    );
}