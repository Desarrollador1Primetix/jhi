import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography, 
  Link, 
  Chip
} from '@mui/material';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Footer} from '../../Components/Footer/Footer';
import ListOfReservs from '../../Components/ListOfReservs/ListOfReservs';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import {useAppContext} from '../../Contexts/Api.Context';
import {getTermsAndConditions} from '../../Services/Content/Content';
import {registerPayment, registerSale} from '../../Services/Payment/Payment';
import {getReservSeats} from '../../Services/Seat/Seat';
import {getUser} from '../../Services/Session/Session';
import {RegisterSaleRequestType, SeatsDetail} from '../../Types/Types';
import { keyframes } from '@emotion/react';

const shakeKeyframes = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const Checkout = () => {
  const {state} = useLocation();
  const [showTermsAndConditions, setShowTermsAndConditions] = React.useState(false);
  const [termsAndConditions, setTermsAndConditions] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [card, setCard] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const {apiUrl, uuid} = useAppContext();
  const [mySeats, setMySeats] = React.useState<SeatsDetail[]>([]); // SeatsDetail[
  const [shake, setShake] = React.useState(false);
  const navigate = useNavigate();

  const onPressTermsAndConditions = () => {
    setShowTermsAndConditions(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleTermsClick = () => {
    setShowTermsAndConditions(true);
  };

  const handleClose = () => {
    setShowTermsAndConditions(false);
  };

  useEffect(() => {
    getTermsAndConditions(apiUrl).then((terms) => setTermsAndConditions(terms));
    const init = async () => {
      const mySeats = await getReservSeats(uuid, state.eventId);
      setMySeats(mySeats);
    };
    init();
  }, []);

  const goToQR = async () => {
    //Validar si ya acepto terminos y condiciones 
    if (isChecked) {
      const userResponse = await getUser(email, phone);
      const paymentResponse = await registerPayment(total);
      console.log('paymentResponse', paymentResponse);
      paymentResponse?.pago.codigo;
      const body: RegisterSaleRequestType = {
        codigo: 0,
        codigoEmpresa: 1,
        codigoPago: paymentResponse?.pago.codigo ?? 0,
        codigoCliente: userResponse.codigo,
        codigoDescuento: 0,
        fecha: moment().format('YYYY-MM-DDTHH:mm:ss'),
        descuento: 0,
        total: total,
        estado: '',
        correoElectronico: '',
        numeroCelular: '',
        ventaDetalles: mySeats.map((seat) => ({
          codigo: seat.codigo,
          codigoVenta: paymentResponse?.pago.codigo ?? 0,
          codigoAsiento: seat.codigo,
          cantidad: 1,
          precioUnitario: seat.precio + seat.fee
        })),
        ventaPropiedads: [
          {
            codigoVenta: paymentResponse?.pago.codigo ?? 0,
            codigoPropiedad: 1,
            valor: email
          },
          {
            codigoVenta: paymentResponse?.pago.codigo ?? 0,
            codigoPropiedad: 2,
            valor: card
          },
          {
            codigoVenta: paymentResponse?.pago.codigo ?? 0,
            codigoPropiedad: 6,
            valor: phone
          }
        ]
      };
      const registerSaleResponse = await registerSale(body);
      const {eventId} = state;
      navigate('/ticketqr', {state: {eventId}});
    }
    else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
  };

  return (
    <Box sx={{backgroundColor: '#D9D9D9'}}>
      <SearchAppBar />
      <Container>
        <Grid
          container
          flexDirection='row'
          spacing={2}
          sx={{
            paddingY: {
              xs: 2,
              sm: 8
            }
          }}
          flex={1}
        >
          <Grid item md={8} sm={8}>
            <Paper elevation={4} sx={{padding: 3, marginBottom: 3}}>
              <Typography variant='subtitle2' style={{fontSize: 20, paddingBottom: 10}}>
                Entrega
              </Typography>
              <Typography variant='subtitle2' style={{color: '#3EDB84'}}>
                Móvil - Gratis
              </Typography>
              <Typography variant='subtitle2' style={{fontWeight: 500}}>
                Tu celular es tu ticket. Puedes encontrar tu entrada digital en tu cuenta o en la
                página web de Primetix.fun. Todas las entradas que compres se enviarán a tu correo
                electrónico.
              </Typography>
            </Paper>
            <Paper elevation={4} sx={{padding: 3, display: 'flex', flex: 1}}>
              <Grid container item style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                {/* <Grid container flexDirection={'column'} spacing={4}> */}
                <Typography variant='subtitle2'>Pago</Typography>
                <TextField
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label='Número de teléfono'
                  required
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label='Correo'
                  required
                />
                <TextField label='Nombre del Propietario' />
                <TextField
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  label='Numero de tarjeta'
                />
                <Grid container item display='flex' spacing={2}>
                  <Grid item display={'flex'} xs={6}>
                    <TextField fullWidth label='Fecha de expiración' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label='Código de seguridad' />
                  </Grid>
                </Grid>
                <TextField label='Pais' />

                {/* <Grid item style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button sx={{color: '#3EDB84'}}>Cancelar</Button>
                  <Button color='secondary' variant='contained' sx={{backgroundColor: '#3EDB84'}}>
                    Agregar tarjeta
                  </Button>
                </Grid> */}
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} sm={4} xs={12}>
            <Paper elevation={8} sx={{padding: 3, display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='subtitle2'>Total</Typography>
                <Typography variant='subtitle2'>Q{total}</Typography>
              </div>
              <ListOfReservs setTotal={setTotal} tickets={mySeats} />
              
             {/*<Typography
                variant='subtitle2'
                sx={{fontWeight: 500, color: '#727272', fontSize: 10, paddingY: 1}}
              >
                Las compras procesadas no tienen cambios o reembolso
              </Typography>*/}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, marginBottom:2 }}>
                <Link
                  component="button"
                  variant="subtitle2"
                  onClick={handleTermsClick}
                  sx={{ fontSize: { xs: 12, sm: 12, md: 12 }, fontWeight: 500 }}
                >
                  Términos y condiciones de uso
                </Link>
                <Chip
                  label={isChecked ? 'Aceptados' : 'No aceptados'}
                  size="small"
                  sx={{ 
                    ml: 4, 
                    backgroundColor: isChecked ? '#9DDE8B' : 'default', 
                    color: isChecked ? 'white' : 'default',
                    animation: shake ? `${shakeKeyframes} 0.5s` : 'none',
                    borderColor: shake ? 'red' : 'default',
                    borderWidth: shake ? '1px' : '0',
                    borderStyle: shake ? 'solid' : 'none', }}
                />
              </Box>
              <Button onClick={goToQR} variant='contained' sx={{backgroundColor: '#3EDB84' }} > {/*disabled={!isChecked}*/} 
                Realizar compra
              </Button>
              <Button onClick={goToQR} variant='contained' sx={{backgroundColor: '#EE4E4E', marginTop:2}}>
                Cancelar compra
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          keepMounted
          open={showTermsAndConditions}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              overflowY: 'auto',
              width: {
                xs: 350,
                sm: 600,
                md: 1000
              },
              height: 600
            }}
          >
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Terminos y condiciones
            </Typography>
            <Typography id='modal-modal-description' sx={{mt: 2, overflowY: 'auto'}}>
              {termsAndConditions}
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
              label="Aceptar términos y condiciones de uso"
            />
          </Box>
        </Modal>
      </Container>
      <Footer />
    </Box>
  );
};
