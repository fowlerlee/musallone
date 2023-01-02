import { Grid, Typography } from '@mui/material';

const Welcome = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Typography variant="h6" >
          grid 1
        </Typography>
      </Grid>
      <Typography variant="h6" >
          grid 2
        </Typography>

      <Grid item xs={12} sm={6}>
      <Typography variant="h6" >
          grid 3
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
      <Typography variant="h6" >
          grid 4
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;