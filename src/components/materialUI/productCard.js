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
    maxWidth: 245,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  media: {
    height: 150,
  },
  options: {
    // alignSelf:"flex-end"
  },
});

export default function ProductCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={`/product/${props.product.id}`}>
        {/* <CardMedia
          className={classes.media}
          // image={props.product.image || "https://fulltummyfund.co.za/wp-content/uploads/2017/01/PlaceholderLogo.png"}
          title="Contemplative Reptile"
        >  */}
        <img src={props.product.image} className={classes.media} />

        {/* </CardMedia> */}
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.product.product_name.toUpperCase()}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {props.product.price}
            {props.product.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.options}>
        <Button
          size="small"
          color="primary"
          href={`/product/${props.product.id}`}
        >
          Edit
        </Button>
        {/* <Button size="small" color="primary" href={props.product.store_url}>
          View Site
        </Button> */}
      </CardActions>
    </Card>
  );
}
