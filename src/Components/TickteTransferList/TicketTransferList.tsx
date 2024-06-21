import {Box, Button, Modal, TextField} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import secureLocalStorage from 'react-secure-storage';
import {TicketTix} from '../../Types/Types';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
const TicketTransferList = (props: any) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const ChildModal = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      if (selectedItems.length > 0) {
        for (let i = 0; i < selectedItems.length; i++) {
          console.log(`Props evento:${i}`);
          // putTicketTransferList();
        }
      }
      // putTicketTransferList(
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button onClick={handleOpen} variant='contained'>
          {BotonPopUP2(props)}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='child-modal-title'
          aria-describedby='child-modal-description'
        >
          <Box sx={{width: 200}}>
            <h2 id='child-modal-title'>Advertencia</h2>
            <p id='child-modal-description'>
              ¿Usted está seguro que quiere realizar este movimiento?
            </p>
            <Button onClick={handleClose}>Aceptar</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  };

  const BotonPopUP2 = (props: any) => {
    if (props.Tipo == 1) {
      return 'Vender entradas';
    } else {
      return 'Transferir entradas';
    }
  };

  const [selectedItems, setSelectedItems] = React.useState<TicketTix[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: TicketTix) => {
    setSelectedItems((prevSelectedItems) => {
      console.log(id.codigo);
      if (prevSelectedItems.some((item) => item.codigo === id.codigo)) {
        console.log('Existe pero se Quita');
        console.log(id);
        const resultado = prevSelectedItems.filter((item) => item.codigo !== id.codigo);
        secureLocalStorage.setItem('listaTransferencia', {
          ...prevSelectedItems
        });
        return resultado;
      } else {
        console.log('No Existe pero se Agrega');
        console.log(id);
        const resultado = [...prevSelectedItems, id];
        secureLocalStorage.setItem('listaTransferencia', {
          ...prevSelectedItems
        });
        return resultado;
      }
    });
  };

  return (
    <React.Fragment>
      <List sx={{width: '100%', maxWidth: 560, bgcolor: 'background.paper'}}>
        {props.eventos.map((item: TicketTix) => {
          const labelId = `checkbox-list-label-${item.codigo}`;

          return (
            <ListItem
              key={item.codigo}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="comments">
              //     <CommentIcon />
              //   </IconButton>
              // }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(item.precio)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    onChange={(event) => handleCheckboxChange(event, item)}
                    // checked={selectedItems.includes(item.codigo)}
                    //   checked={checked.indexOf(item.codigo) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{'aria-labelledby': labelId}}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`Asiento: ${item.asiento}`}
                  secondary={`- Localidad: ${item.localidad}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <TextField id='outlined-basic' label='Correo' variant='outlined' />
      <ChildModal Tipo={props.Tipo} />
    </React.Fragment>
  );
};

export default TicketTransferList;
