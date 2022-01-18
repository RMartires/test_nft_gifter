import React from "react";
import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { Button } from "@material-ui/core"


export default function ConnectButton(props) {
    const { status, connect, account } = useMetaMask();
    const [button, setButton] = useState({});

    useEffect(() => {
        Metamask();
        props.setAccount(account);
    }, [account, status]);

    function Metamask() {
        switch (status) {
            case "initializing":
                setButton({ content: "Synchronisation with MetaMask ongoing...", size: "large", primary: 'true', disabled: 'true' });
                break;
            case "unavailable":
                setButton({ content: "MetaMask not available :(", size: "large", plain: 'true', destructive: 'true', disabled: 'true' });
                break;
            case "notConnected":
                setButton({ content: "Connect to MetaMask", size: "large", primary: 'true' });
                break;
            case "connecting":
                setButton({ content: "Connect to MetaMask", size: "large", primary: 'true', loading: 'true' });
                break;
            case "connected":
                setButton({ content: `Connected account: ${account.substring(0, 5)}...`, size: "large", plain: 'true', primary: 'true' });
                break;
        }
    }

    return (
        <div>
            <Button onClick={connect} color="secondary" variant="outlined">
                {button.content}
            </Button>
            {(status == "unavailable") ? <p style={{ color: 'white', marginTop: '20px' }}>
                <a href="https://near-anteater-052.notion.site/How-to-setup-Metamask-for-TurtleNFT-a50bf244f91b4f3394d9638baeb5e19b"
                    target="_blank">Check out this tutorial to set up Metamask</a></p> : ""}
        </div>
    );
}