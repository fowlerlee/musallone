import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: '20rem',
    },
    toolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    logo: {
      height: theme.spacing(4),
    },
    title: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flexGrow: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    buttons: {},
  }));

  const TopBar = ({}) => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Button> Hamburger button </Button>
                <Typography>Musall is here!</Typography>
            </Toolbar>
        </AppBar>
    );
  };

  export default TopBar;