import React from 'react';
import './ProductPage';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Typography from '@material-ui/core/Typography';
import EcoIcon from '@material-ui/icons/Eco';

class ProductPage extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      id: props.location.state.id,
      barcode: props.location.state.barcode
    }
    console.log(this.state);
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
            distance
          }
        }
      }
    `);

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Missing Barcode</h1>;
    let product = data.products[0];
    if(product === undefined){
      return <h1>Missing Barcode</h1>
    }
    let a = [1,2,3,4,5]
    console.log(product);
    console.log(product.environmentalData.greenScore);
    return (
      <div>
          <Typography variant="h2">{product.company.name} - {product.name}</Typography>
          <Typography variant="h3"> Green score: {a.slice(0, product.environmentalData.greenScore).map(i => { return (<EcoIcon></EcoIcon>)})} </Typography>
          <Typography variant="h4">£{product.price}</Typography>
          <img src={product.imageURL} />
          <Typography variant="h4">Transport</Typography>
          <Typography variant="body2">
          This product was manufactured in {product.environmentalData.origin} and travelled {product.environmentalData.distance} km to get to you.
          <br />
          The product was transported by {product.environmentalData.transport} and this produced {product.environmentalData.transportCO2}g CO2.
          </Typography>
          <Typography variant="h4">Materials</Typography>
          <Typography variant="body2">
          This product and it's packaging contains {product.environmentalData.recyclablePlastic}g of Recyclable and {product.environmentalData.nonRecyclablePlastic}g of Non-Recyclable Plastic.
          </Typography>
          <Typography variant="h4">Production</Typography>
          <Typography variant="body2">
          This product required {product.environmentalData.waterConsumption} litres of water and {product.environmentalData.energyConsumption} kW of electricity to produce.
          </Typography>
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
