import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home';
import SearchPage from './Components/SearchPage';
import BarcodeScanner from './Components/BarcodeScanner';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const apolloClient = new ApolloClient({
  uri: window.location.protocol + "//" + window.location.hostname + ":4000/graphql",
});

class Application extends React.Component {

  render () {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter basename = {"/"} >
          <Switch>
            <Route path = {"/"} component = {Home} exact />
            <Route path = {"/SearchPage"} component = {SearchPage}  />
            <Route path = {"/ScanBarcode"} component = {BarcodeScanner}  />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
