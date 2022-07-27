import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, TextField, Card, CircularProgress } from "@material-ui/core";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../utill/db";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";

function Login(props) {
    const [password, setPassword] = useState("");
    const [passwordError, setError] = useState(false);
    const [data, setData] = useState(null);
    const [p, setP] = useState(null);
    let history = useHistory();

    const getData = async (uuid) => {
        try {
            let data = null;
            let querySnapshot = await getDocs(query(collection(db, "orders"), where("uuid", "==", uuid)));
            querySnapshot.forEach((doc) => {
                data = doc.data();
            });
            if (!data) throw new Error();
            setData(data);
            props.setOrderData(data);
            return data;
        } catch (err) {
            console.log(err);
            history.push("/404");
        }
    };

    useEffect(async () => {
        let uuid = window.location.href.split("/nft?id=")[1];
        if (uuid.includes("&")) {
            setP(uuid.split("&p=")[1]);
            uuid = uuid.split("&")[0];
        }
        if (uuid) {
            await getData(uuid);
        } else {
            history.push("/404");
        }
    }, []);

    useEffect(async () => {
        if (data && p == data.password) {
            setError(false);
            props.changeView("view");
        }
    }, [data]);

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
            <Navbar style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#0b0b0b'
            }}
            />
            <Container
                maxWidth="xs"
                style={{
                    height: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                {data ? (
                    <Card
                        style={{
                            marginTop: '20vh',
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
                            value={`Order Id: ${data?.uuid}`}
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