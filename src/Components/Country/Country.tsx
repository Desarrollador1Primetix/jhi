import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Avatar, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import {useAppContext} from '../../Contexts/Api.Context';
import {Country as CountryInterface} from '../../Types/Types';

interface CountryProps {
  countries: CountryInterface[];
}

const MapCountries: {[key: string]: string} = {
  CR: 'https://apicr.primetix.fun',
  HN: 'https://apihn.primetix.fun',
  SV: 'https://apisv.primetix.fun',
  NC: 'https://apini.primetix.fun',
  BZ: 'https://apibz.primetix.fun',
  MX: 'https://apimx.primetix.fun',
  PN: 'https://apipa.primetix.fun',
  GT: 'https://api2.primetix.fun'
};

export const Country = ({countries}: CountryProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const {setApiUrl} = useAppContext();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    setApiUrl(MapCountries[countries[index].iso]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant='text' ref={anchorRef} style={{alignItems: 'center'}}>
        <Avatar
          variant='circular'
          src={countries[selectedIndex]?.urlImagen}
          sx={{height: '23px', width: 'auto', marginLeft: 7}}
        />
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon color='info' />
        </Button>
        <Typography variant='subtitle2' sx={{color: 'white', paddingLeft: 1}}>
          {countries[selectedIndex]?.iso}
        </Typography>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {countries.map((country, index) => (
                    <MenuItem
                      key={country.codigo}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {country.nombre}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};
