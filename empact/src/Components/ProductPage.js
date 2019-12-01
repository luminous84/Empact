import React from 'react';
import './ProductPage';

class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"",
      name:"Avacado",
      imageURL:"",
      price:"£10",
      weight:"5kg",
      company:"Asda",
      //environmentalData
      origin:"Mexico",
      transport:"Boat",
      transportCO2:"400g",
      recyclablePlastic:"50%",
      nonRecyclablePlastic:"50%",
      waterConsumption:"10L",
      energyConsumption:"50j",
      greenscore:"3"

    }
    console.log("made product page");
  }

  render() {
    return (
      <div>
        <ul>
          <h1>Company: {this.state.company} Name: {this.state.name} </h1>
          <h2>Price: {this.state.price} Green score: {this.state.greenscore}</h2>
          <p>Picture goes here</p>
          <li>Weight: {this.state.weight}</li>
          <li>Origin: {this.state.origin}</li>
          <li>Transport: {this.state.transport}</li>
          <li>TransportCO2: {this.state.transportCO2}</li>
          <li>Recyclable Plastic: {this.state.recyclablePlastic}</li>
          <li>Non-Recyclable Plastic:{this.state.nonRecyclablePlastic}</li>
          <li>Water Consumption: {this.state.waterConsumption}</li>
          <li>Energy Consumption: {this.state.energyConsumption}</li>

        </ul>
      </div>
    );
  }
}

export default ProductPage;
