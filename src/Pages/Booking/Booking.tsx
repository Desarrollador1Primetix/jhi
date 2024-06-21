import { Box, Button, Divider, Grid, Paper, Typography, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';
import 'moment/locale/es';
import DocumentMeta from 'react-document-meta';
import { useNavigate, useParams } from 'react-router-dom';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { Footer } from '../../Components/Footer/Footer';
import { useAppContext } from '../../Contexts/Api.Context';
import { getEvent } from '../../Services/Event/Event';
import { reservSeat } from '../../Services/Seat/Seat';
import { Event, SeatsDetail } from '../../Types/Types';
import { BookingPanzoom } from './BookingPanzoom';

const getUUID = () => {
  let uuid = localStorage.getItem('uuid');
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem('uuid', uuid);
  }
  return uuid;
};

const quitarReservasYRecargar = async (uuid, codeEvent, onTimeExpired) => {
  try {
    await axios.put(`https://api2.primetix.fun/primetixapi/api/Asiento/QuitarReservas/${uuid}?codigoEvento=${codeEvent}`);
    console.log("Reservas eliminadas con éxito");
  } catch (error) {
    console.error("Error eliminando reservas:", error);
  } finally {
    localStorage.removeItem(`timeLeft-${codeEvent}`);
    onTimeExpired();
  }
};

const quitarReservas = async (uuid, codeEvent) => {
  try {
    await axios.put(`https://api2.primetix.fun/primetixapi/api/Asiento/QuitarReservas/${uuid}?codigoEvento=${codeEvent}`);
    console.log("Reservas eliminadas con éxito");
  } catch (error) {
    console.error("Error eliminando reservas:", error);
  }
}

const TimerComponent = ({ uuid, codeEvent, onTimeExpired }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem(`timeLeft-${codeEvent}`);
    return savedTime ? parseInt(savedTime, 10) : 600; // 10 minutos en segundos
  });
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTimeLeft = prev - 1;
        localStorage.setItem(`timeLeft-${codeEvent}`, newTimeLeft.toString());

        if (newTimeLeft <= 0) {
          clearInterval(interval);
          quitarReservasYRecargar(uuid, codeEvent, onTimeExpired);
          return 0;
        }
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [uuid, codeEvent, onTimeExpired]);

  useEffect(() => {
    if (timeLeft <= 180 && timeLeft > 0) {
      setWarning(`Te quedan ${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)} minutos para reservar.`);
    } else {
      setWarning('');
    }
  }, [timeLeft]);

  return (
    <div>
      <p style={{margin:'0 0 0 15px'}}>Tiempo restante: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)} min</p>
      {warning && <p style={{ color: 'red', margin:'0 0 0 15px' }}>{warning}</p>}
    </div>
  );
};





const Counter = ({ count, setCount }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button onClick={() => setCount(count - 1)} disabled={count <= 1}>-</Button>
    <Typography variant="body1" style={{ margin: '0 10px' }}>{count}</Typography>
    <Button onClick={() => setCount(count + 1)}>+</Button>
  </div>
);

export const Booking = () => {
  const navigate = useNavigate();
  const bookTime = 240;
  const ref = React.useRef(null);
  const [tickets, setTickets] = React.useState<{ [key: string]: SeatsDetail }>({});
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const refDiv = React.useRef<any>(null);
  const Viewer = React.useRef<UncontrolledReactSVGPanZoom>(null);
  const [eventDetail, setEventDetail] = React.useState<Event | null>(null);
  const { eventId } = useParams();
  const [uuid, setUuid] = useState(getUUID());
  const { setIdEvent, setShowSnackbar } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);

  const handleTimeExpired = () => {
    localStorage.setItem('timeoutExpired', 'true');
    navigate('/');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleReset = () => {
    quitarReservas(uuid, eventId);
    // actualizar el estado de los tickets
    setTickets({});
    // actualizar estado de asientos en el bookingPanZoom

    

  };

  React.useEffect(() => {
    if (!refDiv.current) return;
    const resizeObserver = new ResizeObserver(() => {
      const currentHeight = refDiv.current?.clientHeight;
      setWidth(refDiv.current?.clientWidth);
      setHeight(currentHeight === 0 ? 500 : currentHeight);
    });
    resizeObserver.observe(refDiv.current);
    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    const getEventDetail = async () => {
      const response = await getEvent(eventId ?? '');
      setEventDetail(response);
    };
    getEventDetail();
  }, [eventId]);

  React.useEffect(() => {
    Viewer.current?.fitToViewer();
  }, [eventDetail]);

  const url = window.location.href;

  const onReservSeat = async (reserva: boolean, codigoAsiento: number) => {
    const fechaReserva = moment().format('YYYY-MM-DD');
    const response = await reservSeat(reserva, { codigoAsiento, uuid, fechaReserva });
  };

  const onBooking = (seatDetail: SeatsDetail, target?: HTMLElement) => {
    const customId = seatDetail.codigo;
    const copyTickets = { ...tickets };
    const findTicket = tickets[customId];
    var customTotal = seatDetail.precio + seatDetail.fee;
    var tempTotal = total;
    if (findTicket) {
      target?.textContent;
      target?.setAttribute('opacity', '1');
      delete copyTickets[customId];
      tempTotal -= customTotal;
    } else {
      target?.setAttribute('opacity', '0.6');
      copyTickets[customId] = seatDetail;
      tempTotal += customTotal;
      setIdEvent(eventId ?? '');
      setShowSnackbar(true);
    }
    if (target) onReservSeat(!findTicket, seatDetail.codigo);
    setTickets({ ...copyTickets });
    setTotal(tempTotal);
  };

  const setArrayOfSeats = (seats: SeatsDetail[]) => {
    let total = 0;
    const mapTikets: { [key: string]: SeatsDetail } = {};
    seats.forEach((seat) => {
      total += seat.precio + seat.fee;
      mapTikets[seat.codigo] = seat;
    });
    setTotal(total);
    setTickets(mapTikets);
  };

  const onContinue = () => {
    navigate('/checkout', { state: { eventId } });
  };

  const FormatDate = () => {
    return moment(eventDetail?.fechaHoraInicio)
      .locale('es')
      .format('dddd, DD [de] MMMM [de] YYYY HH [hrs]');
  };

  const tituloCard = `${eventDetail?.artista} ${eventDetail?.nombre}`;
  const tituloShare = `Hey! ya viste he comprado mi entrada para el concierto ${eventDetail?.nombre} de ${eventDetail?.artista}`;

  const [count, setCount] = useState(1);

  return (
    <Box>
      <DocumentMeta canonical={url} title={tituloShare} description={tituloCard}>
        <SearchAppBar />
        <Box
          sx={{
            position: 'relative',
            height: '200px',  // Ajusta esta altura según tus necesidades
            overflow: 'hidden'
          }}
        >
          <img
            src={eventDetail?.eventoImagenes[0]?.urlImagen ?? ''}
            alt={`${eventDetail?.artista} - ${eventDetail?.nombre}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
          <Grid
            container
            alignContent='flex-start'
            spacing={2}
            sx={{
              position: 'absolute',
              height: '100%',
              zIndex: 10,
              bottom: 0,
              right: 0,
              padding: 2,
              background: 'rgba(6, 46, 66, 0.75)'
            }}
          >
            <Grid
              item
              alignSelf='center'
              sm={7}
              md={8}
              sx={{
                display: 'flex',
                alignContent: 'center',
                flexDirection: 'row'
              }}
            >
              <Box
                component='img'
                sx={{
                  height: {
                    xs: '100px',
                    sm: '150px',
                    md: '140px'
                  },
                  width: {
                    xs: '200px',
                    sm: '300px',
                    md: '250px'
                  },
                  borderRadius: '10px',
                  marginLeft: 5,
                  marginRight: 5
                }}
                src={eventDetail?.eventoImagenes[0]?.urlImagen ?? ''}
                style={{ objectFit: 'fill' }}
              />
              <div style={{ paddingLeft: 10 }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontSize: {
                      xs: 10,
                      sm: 20,
                      md: 23.7
                    }
                  }}
                  color='white'
                >
                  {eventDetail?.artista} - {eventDetail?.nombre}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: {
                      xs: 10,
                      sm: 20,
                      md: 23.7
                    }
                  }}
                  color='white'
                >
                  {FormatDate()}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: {
                      xs: 10,
                      sm: 20,
                      md: 23.7
                    }
                  }}
                  color='white'
                >
                  {eventDetail?.nombreUbicacion}
                </Typography>
                <Button
                  style={{
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: 3,
                    borderRadius: 24,
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    margin: '0px 0 20px 0px'
                  }}
                  variant='outlined'
                >
                  Más información
                </Button>
              </div>
            </Grid>
            <Grid
              item
              alignSelf='flex-start'
              sm={5}
              md={4}
              sx={{ display: 'flex', height: { xs: '50%', sm: '100%' } }}
              justifyContent='flex-start'
              flexDirection={'column'}
            >
              {eventDetail?.spotify && (
                <iframe
                  src={`${eventDetail?.spotify.replace('intl-es', 'embed')}?utm_source=generator`}
                  width='100%'
                  height='100%'
                  frameBorder='0'
                  allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                  loading='lazy'
                ></iframe>
              )}
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          sx={{
            minHeight: {
              xs: 30,
              sm: 200,
              md: 720
            },
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            paddingTop: { xs: 2, sm: 0 }
          }}
        >
          <Grid item xs={12} sm={9} md={9} ref={refDiv}>
            {eventDetail && (
              <BookingPanzoom
                key={'bookinng-' + eventDetail.codigo}
                onBooking={onBooking}
                setArrayofSeats={setArrayOfSeats}
                width={width}
                height={height}
                mapSrc={eventDetail?.mapaUrl}
                Viewer={Viewer}
                codeEvent={eventDetail?.codigo}
              />
            )}
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={3}
            md={3}
            direction='column'
            justifyContent='space-between'
          >
            <Paper
              elevation={7}
              sx={{
                marginLeft: { xs: 0, sm: 2 },
                width:'100%',
                backgroundColor: '#F6F6F6',
                margin: { xs: 0, sm: 0 },
                padding: { xs: 0, sm: 0 },
                paddingTop: { xs: 2, sm: 0 },
                minHeight: {
                  xs: 350,
                  sm: 720,
                  md: 720
                },
                maxHeight: {
                  xs: 450,
                  sm: 700,
                  md: 700
                },
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleReset} color="primary" style={{margin:5}}>
                  Resetear
                </Button>
              </div>
              <TimerComponent uuid={uuid} codeEvent={eventId} onTimeExpired={handleTimeExpired} />
              <Typography variant='h1' fontSize={'1.5rem'} margin={2}>Tickets seleccionados</Typography>
              <Grid item xs={12} md={12} lg={12} style={{ width: '100%' }}>
                {Object.values(tickets).map((ticket, index) => (
                  <Card key={ticket.codigo} sx={{ boxShadow: '0px 8px 10px rgba(0, 0, 0, 0)', borderRadius: '10px', border: '0.2px solid black', position: 'relative', margin:'0 0 10px 0' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box component="img" sx={{ height: 70, width: 90, borderRadius: '10px', marginRight: 2 }} src={eventDetail?.eventoImagenes[0]?.urlImagen ?? ''} alt="event image" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight="bold">Boleto de reventa verificado</Typography>
                        <Typography variant="h3">{eventDetail?.artista}</Typography>
                        <Typography variant="body2">{ticket.nombre}</Typography>
                        <div style={{ margin:'10px 0 0 0'}}>
                        <Typography variant="body2">Q{(ticket.precio + ticket.fee).toFixed(2)}</Typography>
                        <Typography variant="body2"> Q{ticket.precio.toFixed(2)} + Q{ticket.fee.toFixed(2)} Fee</Typography>
                        <Counter count={count} setCount={setCount} />
                        </div>
                      </Box>
                      <IconButton sx={{ position: 'absolute', top: 0, right: 0, color: '#646464' }} aria-label="close">
                        <HighlightOffIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
              <Grid
                container
                item
                flexDirection='column'
                style={{ overflowY: 'scroll', flex: 1, height: 500 }}
              >
                <div>
                  {Object.values(tickets).map((ticket, index) => {
                    return (
                      <>
                        <Grid
                          sx={{ padding: 1 }}
                          container
                          justifyContent='space-between'
                          alignItems='center'
                          key={ticket.codigo}
                        >
                          <Grid item>
                            <Typography variant='subtitle2'>{ticket.nombre}</Typography>
                            <Typography variant='body1'>Boleto de reventa verificado</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='subtitle2'>
                              {ticket.precio.toFixed(2) + ticket.fee.toFixed(2)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider />
                      </>
                    );
                  })}
                </div>
              </Grid>
              <Card sx={{ padding: 2, borderRadius: '9px 9px 0 0', backgroundColor: 'white', width: '100%', height:'40%' }}>
                <Grid container item flexDirection='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h1' fontSize={20}>
                    Total:
                  </Typography>
                  <Typography variant='h1' style={{ fontSize: 20, margin: '0 10px 0 0' }}>
                    Q{total.toFixed(2)}
                  </Typography>
                </Grid>

                <Button
                  sx={{
                    backgroundColor: '#3B8B94',
                    color: 'white',
                    borderRadius: '30px',
                    padding: '10px 20px',
                    marginTop: '20px',
                    width: '100%',
                    fontSize: '20px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#3B8B94',
                    },
                  }}
                  onClick={onContinue}
                >
                  Ir a pagar
                </Button>
                <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: '10px' }}>
                  Incluye Fee
                </Typography>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </DocumentMeta>

      <Dialog
        open={showPopup}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tiempo de reserva agotado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El tiempo para reservar tus boletos ha expirado. Serás redirigido a la página principal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
