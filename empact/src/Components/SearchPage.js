import React from 'react';
import "./SearchPage.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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

// class SearchPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       environmentalData: ['Company','Name','Score']
//     };
//   }
//   render(){
export default function ComplexGrid() {
  const classes = useStyles();

  let environmentalData = ['Company','Name','99%','https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg']

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="Photo" src={environmentalData[3]} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <h3>{environmentalData[1]}</h3>
                </Typography>
                <Typography variant="body2" gutterBottom>

                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {environmentalData[0]}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Score: {environmentalData[2]}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
//   }
// };
// export default SearchPage;
