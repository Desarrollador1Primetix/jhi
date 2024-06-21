import React from 'react';
import {Grid} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const SecondaryAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar
          style={{
            display: 'flex',
            backgroundColor: 'white',
          }}
        >
          <Grid
            container
            // direction={'row'}
            alignContent={'space-between'}
            justifyContent={'center'}
            alignItems='center'
          >
            <Grid item>
            <Typography variant='h5' style={{ fontWeight: 'bold', color: 'black', alignContent: 'center', }} noWrap component='div'>
                <span>PRÓXIM</span>
                <span
                  style={{
                    borderBottomWidth: 3,
                    borderBottomColor: '#3EDB84',
                    borderBottomStyle: 'solid'
                  }}
                >
                  OS EV
                </span>
                <span>EVENTOS</span>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
