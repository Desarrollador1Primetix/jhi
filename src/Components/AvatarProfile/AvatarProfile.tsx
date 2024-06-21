import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Logout from '@mui/icons-material/Logout';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PinIcon from '@mui/icons-material/Pin';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {User} from '../../Types/Types';

export default function AccountMenu(userSession: User) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Typography variant='h3' align='right' sx={{color:'white'}} >{`Hola, ${userSession.nombre}`}</Typography>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ml: 2}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar {...stringAvatar(userSession.nombre)} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={handleClose}>
          <Avatar {...stringAvatar(userSession.nombre)} /> Perfil
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EventSeatIcon fontSize='small' />
          </ListItemIcon>
          Próximos Eventos
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AssignmentTurnedInIcon fontSize='small' />
          </ListItemIcon>
          Eventos Pasados
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ManageSearchIcon fontSize='small' />
          </ListItemIcon>
          Historial
        </MenuItem>

        <Divider />

        <MenuItem>Eventos Privados</MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PinIcon fontSize='small' />
          </ListItemIcon>
          Ingresar Código de Evento
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LocalActivityIcon fontSize='small' />
          </ListItemIcon>
          Mis Eventos
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <InsertInvitationIcon fontSize='small' />
          </ListItemIcon>
          Crear Nuevo Evento
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
