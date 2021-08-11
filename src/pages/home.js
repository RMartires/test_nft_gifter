import React, { useEffect } from "react";
import createApp from '@shopify/app-bridge';
import { Cart } from '@shopify/app-bridge/actions';


function Home() {
    useEffect(() => {
        console.log(process.env.REACT_APP_SHOPIFY_API_KEY, process.env.REACT_APP_SHOP);
        const app = createApp({
            apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
            shopOrigin: process.env.REACT_APP_SHOP,
            host: Buffer.from(`${process.env.REACT_APP_SHOP}/admin`).toString('base64')
        });
        var cart = Cart.create(app);
        cart.subscribe(Cart.Action.UPDATE, function (payload) {
            console.log('[Client] cart update', payload);
        });
        console.log('hit2');
    }, []);

    return (
        <h2>testing cart part</h2>
    );
}

export default Home;
