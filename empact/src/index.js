import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home';
import SearchPage from './Components/SearchPage';
import BarcodeScanner from './Components/BarcodeScanner';
import ProductPage from './Components/ProductPage';
import {Link,Route, BrowserRouter, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const apolloClient = new ApolloClient({
  uri: window.location.protocol + "//" + window.location.hostname + ":4000/graphql",
});

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      homePage:false,
      barcodePage:false,
      searchPage:false,
      productPage:false
    }
  }

  render () {
    return (
      <div>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter basename = {"/"} >
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
              </IconButton>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/BarcodeScanner">Barcode Scanner Page</Button>
            </Toolbar>
          </AppBar>
            <Switch>
              <Route exact path = {"/"} component = {Home}/>
              <Route path = {"/SearchPage"} component = {SearchPage}  />
              <Route path = {"/BarcodeScanner"} component = {BarcodeScanner}  />
              <Route path = {"/ProductPage"} component = {ProductPage} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
