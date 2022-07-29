import React, {useEffect, useState} from "react";
import {
    CssBaseline, Container, Button, Tooltip, makeStyles, Card,
    CardContent, CircularProgress
} from "@material-ui/core";
import {MetaMaskProvider} from "metamask-react";
import {doc, updateDoc, getDocs, query, collection, where} from "firebase/firestore";
import axios from "axios";
import db from "../utill/db";
import NFT from "../components/NFT";
import Navbar from "../components/Navbar";
import Fotter from "../components/Fotter";
import ConnectButton from "../components/ConnectButton";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {DappProvider, DappUI, getAccount, useGetAccountInfo} from "@elrondnetwork/dapp-core";
import {useAuth} from "@elrond-giants/erd-react-hooks";
import {AuthProviderType} from "@elrond-giants/erd-react-hooks/dist/types";
import QRCode from "qrcode.react";

const {
    DappCorePages: {UnlockPage}
} = DappUI;

const blockchainScans = {
    "polygonMainnet": "https://polygonscan.com/tx/",
    "polygonTestnet": "https://mumbai.polygonscan.com/tx/"
};

const WalletType = {
    Elrond: "elrond",
    Polygon: "polygon",
}

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
    const [walletType, setWalletType] = useState(WalletType.Polygon);
    const [url, setUrl] = useState(null);
    // const accountElrond = useGetAccountInfo();
    // const { address } = accountElrond;
    const {address, authenticated, login, logout} = useAuth();

    useEffect(async () => {
        // getting initial data to check wallet type to enable
        let tokens = props?.orderData?.tokens
        if (tokens[0].blockchain === "elrondTestnet") {
            setWalletType(WalletType.Elrond)
        }

       console.log(address)
        if (address !== null) {
            console.log("setting")
            setAccount(address)
        }
        console.log(address);


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
                return <h4 style={{color: 'white'}}><CircularProgress/> claim processing, should take around 5 mins :)
                </h4>
                break;
            case "transfered":
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h4 style={{color: 'green'}}>
                            Transfer complete
                        </h4>
                        {props?.orderData.tokens.map(x =>
                            (<a href={`${blockchainScans[x.blockchain]}${x.hash}`} target="_blank">
                                <h4 style={{color: 'green'}}>{x?.hash?.slice(0, 10)}...</h4>
                            </a>))}
                    </div>
                );
                break;
            case "failed":
                return (<Button color="secondary" onClick={claim}>Retry</Button>);
            default:
                return (address === null && walletType === WalletType.Elrond ?
                        <div style={{
                            height: '10vh'
                        }}>
                            <div>
                                <button onClick={async () => {
                                    let url = await login(AuthProviderType.MAIAR);
                                    setUrl(url);
                                }}>
                                    Login
                                </button>
                                {url !== null? <QRCode
                                    value={`${url}`} style={{marginTop: 30}}/> : null}
                            </div>
                        </div> :
                        <div style={{
                            height: '20vh'
                        }}>
                            <MetaMaskProvider>
                                <ConnectButton setAccount={setAccount}/>
                            </MetaMaskProvider>
                        </div>
                )
        }
    };

    return (
        <div>
            <CssBaseline/>
            <div style={{
                height: '12vh',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#0c0c0c'
            }}>
                <Navbar/>
            </div>
            <div className="claimbg" style={{color: 'white', textAlign: 'center'}}>
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

                        {props?.orderData?.tokens?.map(token => <NFT meta={token.tokenMeta}/>)}
                    </Container>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}>
                        <Tooltip title="Transfer">
                            <Button variant="outlined" disabled={account ? false : true}
                                    onClick={claim}
                            > {loading ? (<CircularProgress/>) : "Claim"} </Button>
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
