import * as React from 'react';
import {Box, ImageListItem, ImageList as ImgList} from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {ResumeEvent, ResumeTickets, TicketTix} from '../../Types/Types';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Grid from '@mui/material/Grid';  
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from 'react-router-dom';
import TicketStepper from '../../Components/TicketStepper/TicketStepper';
import NestedModal from '../../Components/TicketTransferPopup/TicketTransferPopup';



const TicketCard = (props:any) => {
    
  console.log('props');  
  console.log(props);  

  const items = props.eventos;
  const evento = props.nombre;
  const artista = props.artista;
  const qrLink = `QR/`;
  return (

    <ImgList
      gap={16}
      cols={4}
      sx={{
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)!important',
          sm: 'repeat(2, 1fr)!important',
          md: 'repeat(3, 1fr)!important',
          lg: 'repeat(3, 1fr)!important'
        }
      }}
    >
      
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <ShareIcon />
            </IconButton>
          }
          title={`${evento}-${artista}`}
          subheader={''}
        />
        {/* <Link to={`${qrLink}/${evento}/${artista}/${props.codigo}`} style={{textDecoration: 'none'}}> */}
        {/* {items.map((item:TicketTix) => ( */}
        <TicketStepper imagen={props.imagen} eventos={props.eventos} />
        
        {/* ))} */}
        
        {/* </Link> */}
        <CardActions disableSpacing>
          <Grid sx={{ flexgrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  
                  <NestedModal Nombre={'Transferir'} Tipo={0} eventos={props.eventos} />
                </Grid>
                <Grid item>
                  <NestedModal Nombre={'Revender'} Tipo={1}  eventos={props.eventos} />
                  {/* <Button variant="contained" endIcon={<StorefrontIcon />}>
                    Revender
                  </Button> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box >
          </Box>
        </CardActions>
        </Card>
      


    </ImgList>
  );
};

export default TicketCard