import React from 'react';
import './Home.css';
import {Redirect} from "react-router-dom"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.searchClicked = this.searchClicked.bind(this);
  }

  searchClicked(event) {
    console.log("as");
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      console.log("asd");
      return <Redirect push to={{
        pathname: "/SearchPage"
      }}/>
    }else{
      return (
        <div className="App">
          <header className="App-header">
            <h1>
              Search
            </h1>
            <input type="text" width="500px">
            </input>
            <button onClick={this.searchClicked}>
              Search
            </button>
            <h1>
              Barcode Scanner
            </h1>
            <button>
              Scanner
            </button>
          </header>
        </div>
      );
    }
  }
}

export default Home;
