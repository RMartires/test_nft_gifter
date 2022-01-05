import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, makeStyles, Card, CardContent, Typography, CardMedia, Divider } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        backgroundColor: '#242222',
        margin: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: 'white',
        textAlign: 'left'
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 140,
        marginBottom: 10
    }
});


function NFT(props) {
    const [NFTData, setNFTData] = useState(props?.meta);
    let history = useHistory();

    const classes = useStyles();

    useEffect(async () => {
    }, []);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <CardMedia
                    className={classes.media}
                    image={`https://ipfs.io/ipfs/${NFTData?.URL.split("ipfs://")[1]}`}
                    title={NFTData?.Title}
                />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Title: {NFTData?.Title}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Description: {NFTData?.Description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default NFT;

// <div>
//             {
//                 NFTData ? (
//                     <div
//                         style={{
//                             color: 'white',
//                         }}
//                     >
//                         <img
//                             src={`https://ipfs.io/ipfs/${NFTData?.URL.split("ipfs://")[1]}`}
//                             alt={NFTData?.Title}
//                             width="200px" height="auto"
//                         />
//                         <div>
//                             <p>Title: {NFTData?.Title}</p>
//                             <p>Description: {NFTData?.Description}</p>
//                             {/* <a href={props?.url} target="_blank"><p>{props.url.split("ipfs://")[1].slice(0, 15)}...</p></a> */}
//                         </div>
//                     </div >
//                 ) : (<CircularProgress />)
//             }
//         </div>