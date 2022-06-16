import React, { useState } from "react";
import FungyyLogo from "../images/FungyyLogo.jpg";

export default function Navbar(props) {
    return (
        <div style={props.style ? props.style : {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '20px'
        }}>
            <div>
                <img
                    src={FungyyLogo}
                    style={{ height: '10vh' }}
                />
            </div>
            <div style={{ color: 'white' }}>
                <p style={{ fontSize: '4vh', margin: 'auto', fontWeight: 'bold' }}></p>
            </div>
        </div>
    );
}