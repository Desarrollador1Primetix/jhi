import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { TicketEventos, TicketTix } from '../../Types/Types';
import TextField from '@mui/material/TextField';

const TicketReSaleList = (props:any) => {
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

  return (
    <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
      {props.eventos.map((item:TicketTix) => {
        const labelId = `checkbox-list-label-${item.codigo}`;

        return (
            <React.Fragment>
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
                        edge="start"
                        //   checked={checked.indexOf(item.codigo) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                        
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Asiento: ${item.asiento}`} secondary={`- Localidad: ${item.localidad}`} />

                    <TextField id="outlined-basic" label="Precio" variant="outlined" />
                    </ListItemButton>
                </ListItem>

            </React.Fragment>
          
        );
      })}
    </List>
  );
}

export default TicketReSaleList;