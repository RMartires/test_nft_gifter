import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, TextField, Card, CircularProgress } from "@material-ui/core";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../utill/db";
import { useHistory } from "react-router-dom";

function Login(props) {
    const [password, setPassword] = useState("");
    const [passwordError, setError] = useState(false);
    const [data, setData] = useState(null);
    let history = useHistory();

    const getData = async (uuid) => {
        try {
            const q = query(collection(db, "nfts"), where("uuid", "==", uuid));
            const querySnapshot = await getDocs(q);
            let data = null;
            querySnapshot.forEach((doc) => {
                data = doc.data();
            });
            if (!data) throw new Error("Error: wrong id");
            props.setIpfs(data.url);
            setData(data);
            return data;
        } catch (err) {
            console.log(err);
            history.push("/404");
        }
    };

    useEffect(async () => {
        let uuid = window.location.href.split("/nft?Id=")[1];
        if (uuid) {
            await getData(uuid);
        } else {
            history.push("/404");
        }
    }, []);

    const checkPassword = () => {
        if (password === data.password) {
            setError(false);
            props.changeView("view");
        }
        setError(true);
        return;
    }

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
                {data ? (
                    <Card
                        style={{
                            marginTop: '40vh',
                            padding: '10px',
                            display: "flex",
                            flexDirection: 'column'
                        }}
                    >
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            defaultValue="Normal"
                            variant="filled"
                            value={`Token Id: ${data?.tokenId}`}
                            disabled={true}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            color="warning"
                            style={{ marginTop: '30px' }}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            value={password}
                        />
                        <Button
                            style={{ marginTop: '30px' }}
                            onClick={checkPassword}
                        >Login</Button>
                        {passwordError ?
                            (<p
                                style={{ marginTop: '10px', color: 'red' }}
                                severity="error">
                                Error: wrong password
                            </p>) : ""}
                    </Card>
                ) : (<CircularProgress />)}
            </Container>
        </div>
    );
}

export default Login;