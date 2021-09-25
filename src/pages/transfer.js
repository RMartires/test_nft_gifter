import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Divider, Button, CircularProgress } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallets/Connectors";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import db from "../utill/db";
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Transfer(props) {
    const [owner, setOwner] = useState(null);
    const [transfered, setTransfered] = useState(props.transfered);
    const [transferReq, setTransferReq] = useState(false);

    useEffect(() => {
        refreshOwner();
    }, []);

    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    function refreshOwner() {
        setOwner(null);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/ownerOf`,
            data: {
                tokenId: props.id
            }
        }).then(res => {
            setOwner(res.data.owner);
        }).catch(err => {
            console.log(err);
        });
    }

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }

    function safeTransferFrom() {
        setTransferReq(true);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/safeTransferFrom`,
            data: {
                from: owner,
                to: account,
                tokenId: props.id
            }
        }).then(res => {
            const docRef = doc(db, "nfts", `${props.id}`);
            return updateDoc(docRef, {
                transfered: true
            });
        }).then(res => {
            console.log("transfer req sent");
            setTransferReq(false);
            setTransfered(true);
            refreshOwner();
        }).catch(err => {
            setTransferReq(false);
            console.log(err);
        });
    }

    function showTransfered() {
        if (owner === account) {
            return <p>you already own this NFT</p>
        } else if (owner !== account && transfered) {
            return <p>transfer request has been made, refresh this page in 5-10 mins</p>
        } else if (owner !== account && !transfered) {
            return <Button variant="contained" color="primary" onClick={() => { safeTransferFrom() }} disabled={!active}>
                Transfer to me
                {transferReq ? (<CircularProgress />) : ""}
            </Button>
        }
    }

    return (
        <div>
            <CssBaseline />
            <Container
                maxWidth="xs"
                style={{
                    color: 'white',
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                {/* <ArrowBackIcon fontSize="large" /> */}
                <div style={{ marginTop: '30vh' }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <img
                            src={`https://ipfs.io/ipfs/${props?.NFTData?.image.split("ipfs://")[1]}`}
                            alt={props?.NFTData?.name}
                            width="100px" height="auto"
                        />
                        <div style={{ margin: '5px' }}></div>
                        <div style={{ textAlign: 'left' }}>
                            <p>
                                Name: {props?.NFTData?.name}
                            </p>
                            <p>
                                Description: {props?.NFTData?.description}
                            </p>
                        </div>
                    </div>
                    {owner ? (<p style={{ textAlign: 'left' }}>Owner: {owner}</p>) : (<CircularProgress />)}
                    <div style={{
                        backgroundColor: 'white',
                        height: '1px'
                    }}></div>
                    <p style={{ textAlign: 'left', marginTop: '30px' }}>Note: This NFT is held under the tophatturtle's wallet, you can transfert it to your wallet, check this
                        <a href="https://near-anteater-052.notion.site/How-to-setup-metamask-for-tophatTurtlesNFTs-a50bf244f91b4f3394d9638baeb5e19b" target="_blank">  tutorial</a>
                    </p>
                </div>
                {active ?
                    (<p style={{ textAlign: 'left' }} >Connected: {account}</p>)
                    : (<Button onClick={connect} variant="contained"
                        color="primary" disabled={!owner} >Connect to MetaMask</Button>)}
                {showTransfered()}
            </Container>
        </div>
    );
}

export default Transfer;
