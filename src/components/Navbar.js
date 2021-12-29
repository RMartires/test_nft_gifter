import React, { useState } from "react";
import TT from "./TT.png";

export default function Navbar(props) {
    return (
        <div style={props.style ? props.style : {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '5vw'
        }}>
            <div>
                <img
                    src={TT}
                    style={{ height: '10vh' }}
                />
            </div>
            <div style={{ color: 'white' }}>
                <p style={{ fontSize: '4vh', margin: 'auto', fontWeight: 'bold' }}>TophatTurtle</p>
            </div>
        </div>
    );
}