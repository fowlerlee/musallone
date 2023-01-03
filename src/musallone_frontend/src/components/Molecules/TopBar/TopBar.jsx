import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

  const TopBar = ({}) => {
    return (
        <AppBar >
            <Toolbar>
            <Box
                component="form"
                sx={{ mb: 1 }}
                noValidate
                autoComplete="off"
                >
                <Button> Hamburger button </Button>
                <Typography variant="h3" sx={{ mb: 2 }}>MUSALLDAO</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
  };

  export default TopBar;