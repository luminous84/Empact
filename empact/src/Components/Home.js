import React from 'react';
import './Home.css';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      directed: false,
      text: ""
    };
    this.searchClicked = this.searchClicked.bind(this);
    this.scannerClicked = this.scannerClicked.bind(this);
  }

  testQuery(){
    const {loading, error, data} = useQuery(
      gql`
      {
        products(name:"prod"){
            id
            name
        }
      }
    `)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data);
    return <p>Loaded :)</p>;
  }

  searchClicked(event) {
    this.setState({
      redirect: true
    });
  };
  scannerClicked(event) {
    this.setState({
      directed: true
    });
  };

  collectSearchInput(event) {
    console.log(event.target.value);
    this.setState({text:event.target.value});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: "/SearchPage",
        state: {search:this.state.text}
      }}/>
    }
    else if (this.state.directed) {
      return <Redirect push to={{
        pathname: "/BarcodeScanner"
      }}/>
    }
    else{
      return (
        <div className="App">
          <header className="App-header">
            <h1>
              Search
            </h1>
            <input type="text" width="500px" onChange={this.collectSearchInput.bind(this)}>
            </input>
            <Button variant="contained" color="primary" onClick={this.searchClicked}>
              Search
            </Button>
            <h1>
              Barcode Scanner
            </h1>
            <Button variant="contained" color="primary" onClick={this.scannerClicked}>
              Scanner
            </Button>

          </header>
        </div>
      );
    }
  }
}

export default Home;
