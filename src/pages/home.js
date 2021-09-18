import React, { useEffect } from "react";
import { CssBaseline, Container, Button } from "@material-ui/core";
import NFT from "../components/NFT";

function Home(props) {
    useEffect(() => {
    }, []);

    return (
        <div>
            <CssBaseline />
            <Container
                maxWidth="sm"
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column"
                }}
            >
                <div>
                    <NFT
                        url={props?.ipfs}
                        setNFTData={props.setNFTData}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        onClick={() => {
                            props.changeView("transfer")
                        }}>
                        Transfer
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Home;
