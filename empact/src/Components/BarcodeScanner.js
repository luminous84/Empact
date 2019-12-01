import Quagga from 'quagga';
import React from 'react';
import './BarcodeScanner.css';
import {Redirect} from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

class BarcodeScanner extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        redirect: false
      };
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                target: "#interactive",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true,
            },
            numOfWorkers: 4,
            decoder: {
                readers : [ "ean_reader"],
            },
            locate: true,

        }, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("Starting Quagga")
            Quagga.start();
        });
        Quagga.onDetected(this.quaggaOnDetected.bind(this));
    }

    componentWillUnmount() {
        Quagga.offDetected(this.quaggaOnDetected);
        Quagga.stop();
    }

    quaggaOnDetected(result) {
        console.log(result.codeResult.code);
        this.setState({barcode: result.codeResult.code, redirect: true})
    }

    render() {
        if (this.state.redirect) {
          console.log("asd");
          return <Redirect push to={{
            pathname: "/ProductPage",
            state: {barcode: this.state.barcode}
          }}/>
        }else{
          return (
            <div id="interactive" className="viewport"/>
          );
        }
      }
}

export default BarcodeScanner;
