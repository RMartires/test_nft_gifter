import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, TextField, Card, CircularProgress } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";

function Error(props) {

    useEffect(async () => {
    }, []);

    return (
        <div>
            <CssBaseline />
            <Navbar style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#541212'
            }} />
            <Container
                maxWidth="xs"
                style={{
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                <Card
                    style={{
                        marginTop: '30vh',
                        padding: '10px',
                        display: "flex",
                        flexDirection: 'column'
                    }}
                >
                    <h2>Error 404</h2>
                </Card>
            </Container>
            <Fotter />
        </div>
    );
}

export default Error;