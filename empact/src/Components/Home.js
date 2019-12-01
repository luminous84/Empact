import React from 'react';
import './Home.css';
import {Redirect} from "react-router-dom"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      text: ""
    };
    this.searchClicked = this.searchClicked.bind(this);
  }

  searchClicked(event) {
    this.setState({
      redirect: true
    });
  };

  collectSearchInput(event) {
    console.log(event.target.value);
    this.setState({text:event.target.value});
  }

  render() {
    if (this.state.redirect) {
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
            <input type="text" width="500px" onChange={this.collectSearchInput.bind(this)}>
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
