import {Grid, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import {SeatsDetail} from '../../Types/Types';

interface LitOfReservsProps {
  tickets: SeatsDetail[];
  setTotal: (total: number) => void;
}

export default function ListOfReservs({tickets, setTotal}: LitOfReservsProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderTickets = () => {
    let total = 0;
    return tickets.map((ticket, index) => {
      total += ticket.precio + ticket.fee;
      if (index === tickets.length - 1) {
        setTotal(total);
      }
      return (
        <ListItemButton>
          <ListItemText
            primary={
              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography
                  sx={{display: 'inline'}}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {ticket.nombre}
                </Typography>
                <Typography
                  sx={{display: 'inline'}}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {'Q' + (ticket.precio + ticket.fee)}
                </Typography>
              </Grid>
            }
            secondary={
              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography
                  sx={{display: 'inline'}}
                  component='span'
                  variant='body1'
                  color='text.primary'
                >
                  {'Precio: Q' + ticket.precio}
                </Typography>
                <Typography
                  sx={{display: 'inline'}}
                  component='span'
                  variant='body1'
                  color='text.primary'
                >
                  {'Fee: Q' + ticket.fee}
                </Typography>
              </Grid>
            }
          />
        </ListItemButton>
      );
    });
  };

  return (
    <List
      sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {renderTickets()}
      {/* <ListItemButton>
        <ListItemText primary='Sent mail' />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary='Drafts' />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary='Inbox' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{pl: 4}}>
            <ListItemText primary='Starred' />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}
