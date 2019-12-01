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
        Quagga.onDetected(this.quaggaOnDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this.quaggaOnDetected);
    }

    async quaggaOnDetected(result) {
        console.log(result.codeResult.code);
        const {data} = await useQuery(gql`
            {
                products(barcode:"${result.codeResult.code}"){
                    id
                    name
                    imageURL
                    price
                    weight
                    company{
                      id
                      name
                      logoURL
                    }
                    environmentalData {
                        origin
                        transport
                        transportCO2
                        recyclablePlastic
                        nonRecyclablePlastic
                        waterConsumption
                        energyConsumption
                        greenScore
                    }
                }
            }
        `);
        console.log(data);
        return data;
    }

    render() {
        if (this.state.redirect) {
          console.log("asd");
          return <Redirect push to={{
            pathname: "/ScanBarcode"
          }}/>
        }else{
          return (
            <div id="interactive" className="viewport"/>
          );
        }
      }
}

export default BarcodeScanner;
