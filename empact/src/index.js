import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Components/Home';
import SearchPage from './Components/SearchPage';
import {Route, BrowserRouter, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

class Application extends React.Component {

  render () {
    return (
      <BrowserRouter basename = {"/"} >
        <Switch>
          <Route exact path = {"/"} component = {Home} />
          <Route path = {"/SearchPage"} component = {SearchPage}  />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
