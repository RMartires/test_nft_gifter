import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, Tooltip, makeStyles, Card, CardContent } from "@material-ui/core";
import { MetaMaskProvider } from "metamask-react";
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

    useEffect(() => {

    }, [account]);

    const classes = useStyles();

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
            <div className="claimbg" style={{ color: 'white', textAlign: 'left' }}>
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

                        {props?.orderData?.tokens?.map(token => <NFT url={token.tokenMeta} />)}
                    </Container>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}>
                        <Tooltip title="Transfer">
                            <Button variant="outlined" disabled={account ? false : true}> Transfer</Button>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>
            <div style={{
                height: '20vh'
            }}>
                <MetaMaskProvider>
                    <ConnectButton setAccount={setAccount} />
                </MetaMaskProvider>
            </div>
            <Fotter />
        </div>
    );
}

export default Home;
