import React, { useEffect, useState } from "react";
import { Paper } from '@material-ui/core';
import axios from "axios";
function NFT(props) {
    const [NFTData, setNFTData] = useState(null);

    useEffect(async () => {
        try {
            let res = await axios({
                method: "GET",
                url: `https://ipfs.io/ipfs/${props.url.split("ipfs://")[1]}`
            });
            setNFTData(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div
            style={{
                color: 'white'
            }}
        >
            <img
                src={`https://ipfs.io/ipfs/${NFTData?.image.split("ipfs://")[1]}`}
                alt="doge"
                width="320px" height="auto"
            />
            <p>Name: {NFTData?.name}</p>
            <p>Description: {NFTData?.description}</p>
            <a href={props?.url} target="_blank"><p>{props.url.split("ipfs://")[1].slice(0, 15)}...</p></a>
        </div>
    );
}

export default NFT;
