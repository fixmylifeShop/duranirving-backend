import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 245,
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",
    margin:10,

  },
  media: {
    height: 200,
  },
  options: {

  }
});

export default function ShopCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardActionArea  href={`/shop/${props.shop.id}`}>
        {/* <CardMedia
          className={classes.media}
          // image={props.shop.store_logo}
          title="Contemplative Reptile"
        > */}
          <img src={props.shop.store_logo} className={classes.media}/>
        {/* </CardMedia> */}
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.shop.store_name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.shop.products.length} Products
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.options}>
        <Button size="small" color="primary" href={`/shop/${props.shop.id}`}>
          Edit
        </Button>
        <Button size="small" color="primary" href={props.shop.store_url}>
          View Site
        </Button>
      </CardActions>
    </Card>
  );
}
