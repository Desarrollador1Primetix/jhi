import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Typography } from '@mui/material';
import TicketTransferList from '../TickteTransferList/TicketTransferList';
import TicketReSaleList from '../TicketReSaleList/TicketReSaleList';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { putTicketTransferList } from '../../Services/Ticket/Tickets';
import secureLocalStorage from 'react-secure-storage';


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
  pb: 3,
};

// const ChildModal = (props:any) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     const eventosTransferir = JSON.parse(localStorage.getItem('listaTransferencia')||'""');
//     console.log("Enviar Entradas");    
//     console.log(localStorage.getItem('listaTransferencia'));
//     if(eventosTransferir.length > 0){
//         for (let i = 0; i < eventosTransferir.length; i++) {
//             console.log(`Props evento:${i}`);
//         }
//     }    
//     // putTicketTransferList(
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>{BotonPopUP2(props)}</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id="child-modal-title">Advertencia</h2>
//           <p id="child-modal-description">
//             ¿Usted está seguro que quiere realizar este movimiento?
//           </p>
//           <Button onClick={handleClose}>Aceptar</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }


const IconoBoton = (props:any) => {
    if(props.Tipo == 1){
        return (
            <StorefrontIcon/>
        )
    }else{
        return (
            <SendIcon/>
        )
    }
}

const Tipo = (props:any) => {
    if(props.Tipo == 1){
        return (
            <TicketReSaleList eventos={props.eventos}/>
        )
    }else{
        return (
            <TicketTransferList eventos={props.eventos}/>
        )
    }
}


const NestedModal = (props:any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="contained" endIcon={<IconoBoton  Tipo={props.Tipo}/>} onClick={handleOpen}>{props.Nombre}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
            <Tipo Tipo={props.Tipo} eventos={props.eventos} />          
        </Box>
      </Modal>
    </div>
  );
}

export default NestedModal;