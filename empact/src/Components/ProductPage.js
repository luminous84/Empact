import React from 'react';
import './ProductPage';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      id: props.location.state.id, 
      barcode: props.location.state.barcode
    }
    console.log("made product page");
  }

  query(props){
    const {data, loading, error} = useQuery(
      gql`
      {
        products(${(props.id === undefined) ? "barcode" : "id"}:"${(props.id === undefined) ? props.barcode : props.id }"){
          id
          name
          imageURL
          price
          weight
          company {
            name,
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

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error :(</h1>;
    let product = data.products[0];
    return (
      <div>
        <ul>
          <h1>Company: {product.company.name} Name: {product.name} </h1>
          <h2>Price: {product.price} Green score: {product.environmentalData.greenscore}</h2>
          <p>Picture goes here</p>
          <li>Weight: {product.weight}</li>
          <li>Origin: {product.environmentalData.origin}</li>
          <li>Transport: {product.environmentalData.transport}</li>
          <li>TransportCO2: {product.environmentalData.transportCO2}</li>
          <li>Recyclable Plastic: {product.environmentalData.recyclablePlastic}</li>
          <li>Non-Recyclable Plastic:{product.environmentalData.nonRecyclablePlastic}</li>
          <li>Water Consumption: {product.environmentalData.waterConsumption}</li>
          <li>Energy Consumption: {product.environmentalData.energyConsumption}</li>

        </ul>
      </div>
    );
  }

  render() {
    return(
      <this.query id={this.state.id} barcode={this.state.barcode}></this.query>
    );
  }
}

export default ProductPage;
