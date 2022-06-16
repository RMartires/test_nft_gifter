import React, { useEffect, useState } from "react";
import {
    CssBaseline, Container, Button, Tooltip, makeStyles, Card,
    CardContent, CircularProgress
} from "@material-ui/core";
import { MetaMaskProvider } from "metamask-react";
import { doc, updateDoc, getDocs, query, collection, where } from "firebase/firestore";
import axios from "axios";
import db from "../utill/db";
import NFT from "../components/NFT";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import ConnectButton from "../components/ConnectButton";

const blockchainScans = {
    "polygonMainnet": "https://polygonscan.com/tx/",
    "polygonTestnet": "https://mumbai.polygonscan.com/tx/"
};

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

    const getData = async () => {
        let uuid = window.location.href.split("/nft?id=")[1];
        try {
            let data = null;
            let querySnapshot = await getDocs(query(collection(db, "orders"), where("uuid", "==", uuid)));
            querySnapshot.forEach((doc) => {
                data = doc.data();
            });
            if (!data) throw new Error();
            props.setOrderData(data);
            console.log(data);
            setTransfer(data.progress);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const claim = async () => {
        console.log(transfer);
        if (transfer == null) {
            try {
                setLoading(true);
                await updateDoc(doc(db, "orders", props.orderData.uuid), {
                    buyerWallet: account,
                    progress: "claimResponse"
                });
                await fetch(`${process.env.REACT_APP_TRANSFER}?orderId=${props.orderData.uuid}`, {
                    method: 'GET'
                });
                setLoading(false);
                setTransfer("claimResponse");
                setInterval(async () => {
                    await getData();
                }, 30 * 1000);
            } catch (err) {
                console.log(err);
            }
        } else if (transfer == "failed") {
            try {
                setLoading(true);
                await fetch(`${process.env.REACT_APP_TRANSFER}?orderId=${props.orderData.uuid}`, {
                    method: 'GET'
                });
                setLoading(false);
                setTransfer("claimResponse");
                setInterval(async () => {
                    await getData();
                }, 30 * 1000);
            } catch (err) {
                console.log(err);
            }
        }
    };


    const classes = useStyles();

    const showInfo = () => {
        switch (transfer) {
            case "claimResponse":
                return <h4 style={{ color: 'white' }}> <CircularProgress /> claim processing, should take around 5 mins :)</h4>
                break;
            case "transfered":
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h4 style={{ color: 'green' }}>
                            Transfer complete
                        </h4>
                        {props?.orderData.tokens.map(x =>
                        (<a href={`${blockchainScans[x.blockchain]}${x.hash}`} target="_blank">
                            <h4 style={{ color: 'green' }}>{x?.hash?.slice(0, 10)}...</h4>
                        </a>))}
                    </div>
                );
                break;
            case "failed":
                return (<Button color="secondary" onClick={claim}>Retry</Button>);
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
                                onClick={claim}
                            > {loading ? (<CircularProgress />) : "Claim"} </Button>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>
            {showInfo()}
            {/* <Fotter /> */}
        </div>
    );
}

export default Home;
