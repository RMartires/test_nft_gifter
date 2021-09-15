import React, { useEffect } from "react";
import { CssBaseline, Container } from "@material-ui/core";
import NFT from "../components/NFT";

function Home() {
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
                    justifyContent: "space-around"
                }}
            >
                <NFT
                    url={"ipfs://QmXmirhTL5HQMi79xV2Mb4PK5Wqahhv2fEcd5YUPyvieVz"}
                />
            </Container>
        </div>
    );
}

export default Home;
