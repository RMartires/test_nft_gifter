import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { useHistory } from "react-router-dom";

function NFT(props) {
    const [NFTData, setNFTData] = useState(null);
    let history = useHistory();

    useEffect(async () => {
        try {
            let res = await axios({
                method: "GET",
                url: `https://ipfs.io/ipfs/${props.url.split("ipfs://")[1]}`
            });
            setNFTData(res.data);
            props.setNFTData(res.data);
        } catch (err) {
            console.log(err);
            history.push("/404");
        }
    }, []);

    return (
        <div>
            {
                NFTData ? (
                    <div
                        style={{
                            color: 'white'
                        }}
                    >
                        <img
                            src={`https://ipfs.io/ipfs/${NFTData?.image.split("ipfs://")[1]}`}
                            alt={NFTData?.name}
                            width="320px" height="auto"
                        />
                        <p>Name: {NFTData?.name}</p>
                        <p>Description: {NFTData?.description}</p>
                        <a href={props?.url} target="_blank"><p>{props.url.split("ipfs://")[1].slice(0, 15)}...</p></a>
                    </div >
                ) : (<CircularProgress />)
            }
        </div>
    );
}

export default NFT;
