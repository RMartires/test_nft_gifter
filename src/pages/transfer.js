import React, { useEffect } from "react";
import { CssBaseline, Container, Divider, Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallets/Connectors";
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Transfer(props) {
    useEffect(() => {
    }, []);

    const { active, account, library, connector, activate, deactivate } = useWeb3React();

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
                    <p style={{ textAlign: 'left' }}>Owner: {"0x11HNSIXDHDN"}</p>
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
                    : (<Button onClick={connect} variant="contained" color="primary">Connect to MetaMask</Button>)}
                <Button variant="contained" color="primary" onClick={() => { }} disabled={!active}>Transfer</Button>
            </Container>
        </div>
    );
}

export default Transfer;
