import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Home from './pages/home.js'
import Transfer from './pages/transfer.js';
import Login from './pages/login.js';
import Error from './pages/error.js';
import PP from './pages/pp';
import Homepage from './pages/homepage/index';

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {

  const [orderData, setOrderData] = useState(null);
  const [view, setView] = useState("login");
  const [transfered, setTransfered] = useState(null);
  const changeView = (type) => { setView(type) };
  const returnView = () => {
    switch (view) {
      case "view":
        return (<Home
          changeView={changeView}
          orderData={orderData}
        />);
        break;
      case "transfer":
        return (
          <Web3ReactProvider getLibrary={getLibrary}>
            {/* <Transfer NFTData={NFTData} id={id} transfered={transfered} /> */}
          </Web3ReactProvider>);
        break;
      case "login":
        return (<Login
          changeView={changeView}
          setTransfered={setTransfered}
          setOrderData={setOrderData}
        />);
        break;
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/nft">
            {returnView()}
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/404">
            <Error />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/privacy">
            <PP />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
