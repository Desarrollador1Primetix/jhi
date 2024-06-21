import {Grid} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export const TicketSecondaryAppBar = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static'>
        <Toolbar
          style={{
            display: 'flex'
          }}
        >
          <Grid
            container
            // direction={'row'}
            alignContent={'space-between'}
            justifyContent={'flex-start'}
            alignItems='flex-start'
          >
            <Grid item>
              <Typography variant='h5' style={{fontWeight: 'bold'}} noWrap component='div'>
                <span
                  style={{
                    borderBottomWidth: 3,
                    borderBottomColor: '#3EDB84',
                    borderBottomStyle: 'solid'
                  }}
                >
                  Mis En
                </span>
                tradas
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
