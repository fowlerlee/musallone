import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ColorBlobAnimation from "./ColorBlobAnimation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000",
    minHeight: "100vh",
  },
  card: {
    width: "80%",
    margin: theme.spacing(2),
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorBlobAnimation />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 1
          </Typography>
          <Typography variant="body2" component="p">
            Some content for card 1...
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 2
          </Typography>
          <Typography variant="body2" component="p">
            Some content for card 2...
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 3
          </Typography>
          <Typography variant="body2" component="p">
            Some content for card 3...
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default LandingPage;
