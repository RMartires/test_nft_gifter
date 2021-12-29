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
                setButton({ content: `Connected account: ${account}`, size: "large", plain: 'true', primary: 'true' });
                break;
        }
    }

    return (
        <Button onClick={connect} color="secondary" variant="outlined">
            {button.content}
        </Button>
    );
}