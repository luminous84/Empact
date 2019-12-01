import React from 'react';
import "./SearchPage.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Redirect} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import EcoIcon from '@material-ui/icons/Eco';
import { styled } from '@material-ui/styles';
import { Visibility } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.location.state.search,
      redirect: false
    };

  }

  productClicked(event, id){
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(id);
    this.setState({
      product: id,
      redirect: true
    });
  };

  grid(props){
    const {data, loading, error} = useQuery(
      gql`
      {
        products(name:"${props.search}"){
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

    const classes = useStyles();

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Error :(</h1>;

    let a = [1,2,3,4,5]; 

    return (
      <div className={classes.root} >
        {data.products.map((product, index) => {
          return (<Paper className={classes.paper} onClick={(e) => props.parent.productClicked(e, product.id)} key={product.id} id={product.id}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="Photo" src={product.imageURL} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    <h3>{product.name}</h3>
                  </Typography>
                  <Typography variant="body2" gutterBottom>

                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.company.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Score: {a.slice(0, product.environmentalData.greenScore).map(i => { return (<EcoIcon></EcoIcon>)})}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>);
        })}
      </div>
    );
    
  }

  render(){
    if(!this.state.redirect) {
      return(
        <this.grid search={this.state.search} parent={this}></this.grid>
      )
    }else{
      console.log(this.state.product);
      return <Redirect push to={{
        pathname: "/ProductPage",
        state: {id: this.state.product}
      }}/>
    }

  }
}
export default SearchPage;
