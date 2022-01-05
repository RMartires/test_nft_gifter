import React, { useEffect, useState } from "react";
import {
    CssBaseline, Container, Button, Tooltip, makeStyles, Card,
    CardContent, CircularProgress
} from "@material-ui/core";
import { MetaMaskProvider } from "metamask-react";
import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import db from "../utill/db";
import NFT from "../components/NFT";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import ConnectButton from "../components/ConnectButton";

const useStyles = makeStyles({
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left'
    },
    pos: {
        marginBottom: 12,
    }
});


function Home(props) {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transfer, setTransfer] = useState(null || props?.orderData?.progress);

    useEffect(() => {

    }, [account]);

    const classes = useStyles();

    const showInfo = () => {
        switch (transfer) {
            case "claimResponse":
                return <h4 style={{ color: 'white' }}>claim processing, should take around 5 mins :)</h4>
                break;
            case "transfered":
                return <h4 style={{ color: 'white' }}>Transfer complete</h4>;
                break;
            default:
                return (
                    <div style={{
                        height: '20vh'
                    }}>
                        <MetaMaskProvider>
                            <ConnectButton setAccount={setAccount} />
                        </MetaMaskProvider>
                    </div>
                );
                break;
        }
    };

    return (
        <div>
            <CssBaseline />
            <div style={{
                height: '12vh',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#0c0c0c'
            }}>
                <Navbar />
            </div>
            <div className="claimbg" style={{ color: 'white', textAlign: 'center' }}>
                <h1>Claim your NFTs</h1>
            </div>
            <div className="claimbgPic"></div>
            <Card className={"transferPanel"} variant="outlined">
                <CardContent>
                    <Container
                        style={{
                            minHeight: "50vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >

                        {props?.orderData?.tokens?.map(token => <NFT meta={token.tokenMeta} />)}
                    </Container>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}>
                        <Tooltip title="Transfer">
                            <Button variant="outlined" disabled={account ? false : true}
                                onClick={async () => {
                                    if (transfer == null) {
                                        setLoading(true);
                                        await updateDoc(doc(db, "orders", props.orderData.uuid), {
                                            buyerWallet: account,
                                            progress: "claimResponse"
                                        });
                                        await axios({
                                            method: 'POST',
                                            url: process.env.REACT_APP_TRANSFER,
                                            data: {
                                                orderId: props.orderData.uuid
                                            }
                                        });
                                        setLoading(false);
                                        setTransfer("claimResponse");
                                    }
                                }}
                            > {loading ? (<CircularProgress />) : "Claim"} </Button>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>
            {showInfo()}
            <Fotter />
        </div>
    );
}

export default Home;
