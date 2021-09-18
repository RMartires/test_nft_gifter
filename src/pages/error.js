import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, TextField, Card, CircularProgress } from "@material-ui/core";

function Error(props) {

    useEffect(async () => {
    }, []);

    return (
        <div>
            <CssBaseline />
            <Container
                maxWidth="xs"
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                <Card
                    style={{
                        marginTop: '40vh',
                        padding: '10px',
                        display: "flex",
                        flexDirection: 'column'
                    }}
                >
                    <h2>Error 404</h2>
                </Card>
            </Container>
        </div>
    );
}

export default Error;