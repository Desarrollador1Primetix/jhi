import React from 'react';
import { useState, useEffect } from 'react';
import { Box, ImageList as ImgList, Typography, Grid, Card, CardContent, IconButton, SvgIcon, useMediaQuery, useTheme } from '@mui/material';
import { Link} from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ResumeEventsByCountry, ResumeEvent } from '../../Types/Types';
import { useSwipeable } from 'react-swipeable';

interface ImageListProps {
    eventsByCountry: ResumeEventsByCountry[];
    cols?: number;
}

const getRecentEvents = (eventsByCountry: ResumeEventsByCountry[], count: number): ResumeEvent[] => {
    const allEvents = eventsByCountry.flatMap(country => country.eventos);
    return allEvents.sort((a, b) => new Date(b.fechaHoraInicio).getTime() - new Date(a.fechaHoraInicio).getTime()).slice(0, count);
};

const getEventsByGenre = (eventsByCountry: ResumeEventsByCountry[], genre: string): ResumeEvent[] => {
    const allEvents = eventsByCountry.flatMap(country => country.eventos);
    return allEvents.filter(event => event.genero === genre);
};




const CustomIcon = ({ rotate, ...props }) => (
    <SvgIcon {...props} viewBox="0 0 30 24" style={{ transform: rotate ? 'rotate(180deg)' : 'none' }}>
        <path d="M28.7318 13.5694C29.1868 13.1138 29.4424 12.4962 29.4424 11.8523C29.4424 11.2083 29.1868 10.5908 28.7318 10.1352L19.5695 0.968027C19.1137 0.51219 18.4954 0.256103 17.8508 0.256103C17.2061 0.256103 16.5879 0.51219 16.132 0.968027C15.6762 1.42386 15.4201 2.04211 15.4201 2.68676C15.4201 3.33141 15.6762 3.94966 16.132 4.4055L21.1473 9.42239L2.46152 9.42239C1.81707 9.42239 1.19902 9.67839 0.743331 10.1341C0.287641 10.5898 0.0316348 11.2078 0.0316348 11.8523C0.0316347 12.4967 0.287641 13.1148 0.743331 13.5705C1.19902 14.0261 1.81707 14.2821 2.46151 14.2821L21.1473 14.2821L16.132 19.2974C15.9063 19.5231 15.7273 19.7911 15.6051 20.086C15.483 20.3809 15.4201 20.697 15.4201 21.0162C15.4201 21.3354 15.483 21.6514 15.6051 21.9463C15.7273 22.2412 15.9063 22.5092 16.132 22.7349C16.3577 22.9606 16.6257 23.1396 16.9206 23.2618C17.2155 23.3839 17.5316 23.4468 17.8508 23.4468C18.17 23.4468 18.486 23.3839 18.7809 23.2618C19.0758 23.1396 19.3438 22.9606 19.5695 22.7349L28.7318 13.5694Z" fill="white" />
    </SvgIcon>
);

const CircularButton = ({ onClick, rotate = false, currentPage, maxPages }) => {
  return (
      <IconButton
          onClick={() => onClick(currentPage, maxPages)}
          sx={{
              borderRadius: '50%',
              backgroundColor: '#038B94',
              width: 30,
              height: 30,
              '&:hover': {
                  backgroundColor: '#038B94',
              },
              position: 'absolute',
              top: '50%',
              right: rotate ? 'auto' : '0%',
              left: rotate ? '0%' : 'auto',
              transform: 'translateY(-150%)',
              zIndex: 1,
          }}
      >
          <CustomIcon sx={{ width: 20, height: 20, fill: 'white' }} rotate={rotate} />
      </IconButton>
  );
};



export const ImageList = ({ eventsByCountry, cols = 2 }: ImageListProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.only('md'));



    

    const getEventsPerPage = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        return 3; // Default to 3 for larger screens
    };

    const [eventsPerPage, setEventsPerPage] = useState(getEventsPerPage());

    useEffect(() => {
        setEventsPerPage(getEventsPerPage());
    }, [isXs, isSm, isMd]);

    const recentEvents = getRecentEvents(eventsByCountry, 4);
    const concertEvents = getEventsByGenre(eventsByCountry, 'Conciertos');
    const sportsEvents = getEventsByGenre(eventsByCountry, 'Eventos deportivos');
    const theaterEvents = getEventsByGenre(eventsByCountry, 'Obras de teatro');

    const [concertPage, setConcertPage] = useState(0);
    const [sportsPage, setSportsPage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [theaterPage, setTheaterPage] = useState(0);

    const handleExpandClick = () => {
      setIsExpanded(!isExpanded);
    };
  
  

    const handleNextCard = (setter, currentPage, totalCards) => {
      setter(currentPage < totalCards - 1 ? currentPage + 1 : currentPage);
  };
  
  const handlePrevCard = (setter, currentPage, maxCards?: any) => {
      setter(currentPage > 0 ? currentPage - 1 : currentPage);
  };
  
  

    const handlers = (setter, max) => useSwipeable({
        onSwipedLeft: () => handleNextPage(setter, max),
        onSwipedRight: () => handlePrevPage(setter, max),
        trackMouse: true
    });

    return (
        <Box>
            {/* Sección de eventos próximos */}
            <Grid container alignContent={'space-between'} justifyContent={'center'} alignItems='center' margin={3}>
                <Grid item>
                <Typography
    variant="body1"
    sx={{
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
       fontSize: {
            xs: '1rem',
            sm: '2rem',
            },
        "& span:nth-of-type(2)": { // Estilo para el segundo span
            borderBottomWidth: '5px',
            borderBottomColor: '#FF4C13',
            borderBottomStyle: 'solid'
        }
    }}
    noWrap
    component="div"
>
    <span>PRÓXIM</span>
    <span>OS EV</span>
    <span>ENTOS</span>
</Typography>

                </Grid>
            </Grid>
            <Box>
    <ImgList
        gap={16}
        cols={cols}
        sx={{
            gridTemplateColumns: {
                xs: 'repeat(1, 1fr)!important',
                sm: 'repeat(2, 1fr)!important',
                md: 'repeat(2, 1fr)!important',
                lg: 'repeat(2, 1fr)!important',
            }
        }}
    >
        {recentEvents.map((event) => {
            const eventLink = `/reserva/${event.nombre}/${event.artista}/${event.codigo}`;
            const fechaFormateada2 = format(new Date(event.fechaHoraInicio), "EEEE - d 'de' MMMM", { locale: es });
            const fechaFormateada = format(new Date(event.fechaHoraInicio), "EEEE  d 'de' MMMM", { locale: es });
            const horaFormateada = format(new Date(event.fechaHoraInicio), "h:mm a");


            return (
                <Link to={eventLink} key={event.codigo} style={{ textDecoration: 'none' }}>
                    <Box sx={{
                        width: '100%',
                        boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: 2,
                        position: 'relative',
                        '&:hover': {
                            transform: 'scale(1)',
                            boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.6)',
                        },
                        '&:hover img': {
                            filter: 'brightness(0.3)',
                        },
                        '&:hover .info': {
                            opacity: 1, // Hace que la información sea visible al pasar el ratón
                            visibility: 'visible'
                        }
                    }}>
                        <img src={event.imagenEvento} style={{
                            width: '100%',
                            height: window.innerWidth <= 600 ? '100px' : '300px',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
                        }} />
                        <Box className="info" sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', // Centra el contenido verticalmente
                            alignItems: 'center', // Centra el contenido horizontalmente
                            color: 'white',
                            textAlign: 'center',
                            gap: '8px',
                            padding: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo oscuro con transparencia
                            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                            opacity: 0, // Inicialmente invisible
                            visibility: 'hidden',
                            borderRadius: '10px',
                        }}>
                            <Typography variant="subtitle1">{event.artista}</Typography>
                            {/* SVG de calendario */}
                            <svg width="20" height="20" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.41633 29.3206H21.6825C23.1216 29.3206 24.2919 28.0388 24.2919 26.4627V6.45757C24.2919 4.88145 23.1216 3.59969 21.6825 3.59969H19.073V0.741821H16.4636V3.59969H8.63522V0.741821H6.02578V3.59969H3.41633C1.97722 3.59969 0.806885 4.88145 0.806885 6.45757V26.4627C0.806885 28.0388 1.97722 29.3206 3.41633 29.3206ZM21.6825 9.31544L21.6838 26.4627H3.41633V9.31544H21.6825Z" fill="white"/>
                            </svg>
                            <Typography variant="subtitle2">{fechaFormateada}</Typography>
                            <Typography variant="subtitle2">{horaFormateada}</Typography>
                            {/* SVG de ubicación */}
                            <svg width="20" height="20" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5492 15.1466C10.5101 15.1466 9.51359 14.7338 8.77884 13.999C8.04409 13.2643 7.63131 12.2677 7.63131 11.2287C7.63131 10.1896 8.04409 9.19303 8.77884 8.45828C9.51359 7.72354 10.5101 7.31076 11.5492 7.31076C12.5883 7.31076 13.5848 7.72354 14.3196 8.45828C15.0543 9.19303 15.4671 10.1896 15.4671 11.2287C15.4671 11.7432 15.3658 12.2526 15.1689 12.728C14.972 13.2033 14.6834 13.6352 14.3196 13.999C13.9558 14.3628 13.5239 14.6514 13.0485 14.8483C12.5732 15.0452 12.0637 15.1466 11.5492 15.1466ZM11.5492 0.258545C8.63976 0.258545 5.84947 1.41432 3.79217 3.47162C1.73488 5.52891 0.579102 8.3192 0.579102 11.2287C0.579102 19.4562 11.5492 31.6017 11.5492 31.6017C11.5492 31.6017 22.5193 19.4562 22.5193 11.2287C22.5193 8.3192 21.3635 5.52891 19.3062 3.47162C17.249 1.41432 14.4587 0.258545 11.5492 0.258545Z" fill="white"/>
                            </svg>
                            <Typography variant="subtitle2">{event.ubicacion}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2">{event.subgenero}</Typography>
                    <Typography variant="body2">{fechaFormateada2}</Typography>
                    <Typography variant="h1">{event.artista}</Typography>

                </Link>
            );
        })}
    </ImgList>
</Box>

            {/* Sección de eventos vistos recientemente */}
            <Box>
                <Grid item style={{ margin: '3%' }}>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                            }
                        }}
                        noWrap
                        component='div'
                    >
                        <span>VISTOS RE</span>
                        <span
                            style={{
                                borderBottomWidth: 3,
                                borderBottomColor: '#3EDB84',
                                borderBottomStyle: 'solid'
                            }}
                        >
                            CIENTE
                        </span>
                        <span>NTEMENTE</span>
                    </Typography>
                </Grid>
                <ImgList
                    gap={16}
                    cols={1}
                    sx={{
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)!important',
                            sm: 'repeat(1, 1fr)!important',
                            md: 'repeat(1, 1fr)!important',
                            lg: 'repeat(1, 1fr)!important',
                        }
                    }}
                >
                    {getRecentEvents(eventsByCountry, 1).map((event) => {
                        const eventLink = `/reserva/${event.nombre}/${event.artista}/${event.codigo}`;
                        const fechaFormateada = format(new Date(event.fechaHoraInicio), 'dd/MM/yyyy');

                        return (
                            <Grid item xs={12} md={12} lg={12} key={event.codigo} style={{ width: '100%' }}>
                                <Card sx={{ boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', border: '1px solid black', position: 'relative' }}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton sx={{ position: 'absolute', top: 0, right: 0, color: '#646464' }} aria-label="close">
                                            <HighlightOffIcon />
                                        </IconButton>
                                        <Box sx={{ flex: 1 }}>
                                            <img src={event.imagenEvento} alt={event.nombre} style={{ borderRadius: '10px', width: '90%', height: 'auto', marginRight: '10px' }} />
                                        </Box>
                                        <Box sx={{ flex: 3, padding: '0 10px' }}>
                                            <Typography variant="h1" component="div">
                                                {event.artista}
                                            </Typography>
                                            <Typography variant="h3" color="text.secondary">
                                                {fechaFormateada}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </ImgList>
            </Box>

            <Grid container alignContent={'space-between'} justifyContent={'center'} alignItems='center' margin={3}>
                <Grid item>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                            }
                        }}
                        noWrap
                        component='div'
                    >
                        <span>PREVENTA </span>
                        <span
                            style={{
                                borderBottomWidth: 3,
                                borderBottomColor: '#3EDB84',
                                borderBottomStyle: 'solid'
                            }}
                        >
                            Y PRO
                        </span>
                        <span>MOCIONES</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignContent={'space-between'} justifyContent={'flex-end'} alignItems='flex-end' margin={1}>
                <Grid item>
                  <Typography
                      variant='h2'
                      sx={{
                          fontWeight: 'bold',
                          color: '#038B94',
                          textAlign: 'right',
                          fontSize: {
                              xs: '0.8rem',
                              sm: '1rem',
                          },
                      
                          marginTop: '0',
                          flex: 'flex-end',
                      }}
                      component={Link}
                      to='/eventos/teatro'
                  >
                      Ver todos
                  </Typography>
                </Grid>
              </Grid>

            {/* Sección de Conciertos */}
            <Grid container alignContent={'space-between'} justifyContent={'flex-start'} alignItems='flex-start' margin={3}>
                <Grid item>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                            }
                        }}
                        noWrap
                        component='div'
                    >
                        <span>CON</span>
                        <span
                            style={{
                                borderBottomWidth: 3,
                                borderBottomColor: '#3EDB84',
                                borderBottomStyle: 'solid'
                            }}
                        >
                            CIER
                        </span>
                        <span>TOS</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignContent={'space-between'} justifyContent={'flex-end'} alignItems='flex-end' margin={1}>
                <Grid item>
          <Typography variant='body2' sx={{ fontWeight: 'bold', color: '#038B94', textAlign: 'right', fontSize: { xs: '0.8rem', sm: '1rem' } }} component='a' onClick={handleExpandClick}>
            {isExpanded ? 'Ver menos' : 'Ver todos los conciertos'}
          </Typography>
        </Grid>
              </Grid>
              <Box position="relative" {...handlers(setConcertPage, concertEvents.length)} sx={{ overflow: 'hidden' }}>
    <CircularButton onClick={(currentPage, maxCards) => handlePrevCard(setConcertPage, currentPage, maxCards)} rotate={true} currentPage={concertPage} maxPages={concertEvents.length} />
    <Grid container spacing={2} wrap="nowrap" sx={{ transition: 'transform 0.5s ease', transform: `translateX(-${concertPage * (100 / eventsPerPage)}%)` }}>
        {concertEvents.map((event, index) => {
            const eventLink = `/reserva/${event.nombre}/${event.artista}/${event.codigo}`;
            const fechaFormateada = format(new Date(event.fechaHoraInicio), "EEEE - d 'de' MMMM", { locale: es });

            return (
                <Grid item xs={12} sm={6} md={4} key={event.codigo} style={{ flex: `0 0 ${100 / eventsPerPage}%`, maxWidth: `${100 / eventsPerPage}%` }}>
                    <Link to={eventLink} style={{ textDecoration: 'none' }}>
                        <Card sx={{ boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px', overflow: 'hidden' }}>
                            <Box
                                component='img'
                                sx={{
                                  height: window.innerWidth <= 600 ? '150px' : '300px',
                                    width: '100%',
                                    transition: 'transform 0.5s ease-in-out',
                                    borderRadius: '5px 5px 0 0'
                                }}
                                src={event.imagenEvento}
                            />
                        </Card>
                        <Typography variant='body2' sx={{ textAlign: 'flex-start', marginTop:'5px' }}>
                            {event.genero}
                        </Typography>
                        <Typography variant='body2' sx={{ textAlign: 'flex-start' }}>
                            {fechaFormateada}
                        </Typography>
                        <Typography variant='h1' sx={{  textAlign: 'flex-start', marginTop: '5px' }}>
                            {event.artista}
                        </Typography>
                    </Link>
                </Grid>
            );
        })}
    </Grid>
    <CircularButton onClick={(currentPage, maxCards) => handleNextCard(setConcertPage, currentPage, maxCards)} rotate={false} currentPage={concertPage} maxPages={concertEvents.length} />
</Box>


            {/* Sección de Deportes */}
            <Grid container alignContent={'space-between'} justifyContent={'flex-start'} alignItems='flex-start' margin={3}>
                <Grid item>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                            }
                        }}
                        noWrap
                        component='div'
                    >
                        <span>DE</span>
                        <span
                            style={{
                                borderBottomWidth: 3,
                                borderBottomColor: '#3EDB84',
                                borderBottomStyle: 'solid'
                            }}
                        >
                            PORT
                        </span>
                        <span>ES</span>
                    </Typography>
                </Grid>
                <Grid container alignContent={'space-between'} justifyContent={'flex-end'} alignItems='flex-end' margin={1}>
                <Grid item>
                  <Typography
                      variant='body2'
                      sx={{
                          fontWeight: 'bold',
                          color: '#038B94',
                          textAlign: 'right',
                          fontSize: {
                              xs: '0.8rem',
                              sm: '1rem',
                          },
                      
                          marginTop: '0',
                          flex: 'flex-end',
                      }}
                      component={Link}
                      to='/eventos/deportes'
                  >
                      Ver todos los eventos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Box position="relative" {...handlers(setSportsPage, sportsEvents.length)} sx={{ overflow: 'hidden' }}>
    <CircularButton onClick={(currentPage, maxCards) => handlePrevCard(setSportsPage, currentPage, maxCards)} rotate={true} currentPage={sportsPage} maxPages={sportsEvents.length} />
    <Grid container spacing={2} wrap="nowrap" sx={{ transition: 'transform 0.5s ease', transform: `translateX(-${sportsPage * (100 / eventsPerPage)}%)` }}>
        {sportsEvents.map((event, index) => {
            const eventLink = `/reserva/${event.nombre}/${event.artista}/${event.codigo}`;
            const fechaFormateada = format(new Date(event.fechaHoraInicio), "EEEE - d 'de' MMMM", { locale: es });

            return (
                <Grid item xs={12} sm={6} md={4} key={event.codigo} style={{ flex: `0 0 ${100 / eventsPerPage}%`, maxWidth: `${100 / eventsPerPage}%` }}>
                    <Link to={eventLink} style={{ textDecoration: 'none' }}>
                        <Card sx={{ boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px', overflow: 'hidden' }}>
                            <Box
                                component='img'
                                sx={{
                                    height: '200px',
                                    width: '100%',
                                    transition: 'transform 0.5s ease-in-out',
                                    borderRadius: '5px 5px 0 0'
                                }}
                                src={event.imagenEvento}
                            />
                        </Card>
                        <Typography variant='body2' sx={{ fontSize: '13px', fontWeight: 400, textAlign: 'center', marginTop: '10px' }}>
                            {event.genero}
                        </Typography>
                        <Typography variant='body2' sx={{ fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>
                            {fechaFormateada}
                        </Typography>
                        <Typography variant='body2' sx={{ fontSize: '12px', textAlign: 'center', marginTop: '5px' }}>
                            {event.artista}
                        </Typography>
                    </Link>
                </Grid>
            );
        })}
    </Grid>
    <CircularButton onClick={(currentPage, maxCards) => handleNextCard(setSportsPage, currentPage, maxCards)} rotate={false} currentPage={sportsPage} maxPages={sportsEvents.length} />
</Box>


            {/* Sección de Teatros y Artes */}
            <Grid container alignContent={'space-between'} justifyContent={'flex-start'} alignItems='flex-start' margin={3}>
                <Grid item>
                    <Typography
                        variant='body1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                sm: '2rem',
                            }
                        }}
                        noWrap
                        component='div'
                    >
                        <span>TEAT</span>
                        <span
                            style={{
                                borderBottomWidth: 3,
                                borderBottomColor: '#3EDB84',
                                borderBottomStyle: 'solid'
                            }}
                        >
                            RO Y A
                        </span>
                        <span>RTES</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignContent={'space-between'} justifyContent={'flex-end'} alignItems='flex-end' margin={1}>
                <Grid item>
                  <Typography
                      variant='body2'
                      sx={{
                          fontWeight: 'bold',
                          color: '#038B94',
                          textAlign: 'right',
                          fontSize: {
                              xs: '0.8rem',
                              sm: '1rem',
                          },
                      
                          marginTop: '0',
                          flex: 'flex-end',
                      }}
                      component={Link}
                      to='/eventos/teatro'
                  >
                      Ver todos los eventos
                  </Typography>
                </Grid>
              </Grid>
                    
              <Box position="relative" {...handlers(setTheaterPage, theaterEvents.length)} sx={{ overflow: 'hidden' }}>
    <CircularButton onClick={(currentPage, maxCards) => handlePrevCard(setTheaterPage, currentPage, maxCards)} rotate={true} currentPage={theaterPage} maxPages={theaterEvents.length} />
    <Grid container spacing={2} wrap="nowrap" sx={{ transition: 'transform 0.5s ease', transform: `translateX(-${theaterPage * (100 / eventsPerPage)}%)` }}>
        {theaterEvents.map((event, index) => {
            const eventLink = `/reserva/${event.nombre}/${event.artista}/${event.codigo}`;
            const fechaFormateada = format(new Date(event.fechaHoraInicio), "EEEE - d 'de' MMMM", { locale: es });

            return (
                <Grid item xs={12} sm={6} md={4} key={event.codigo} style={{ flex: `0 0 ${100 / eventsPerPage}%`, maxWidth: `${100 / eventsPerPage}%` }}>
                    <Link to={eventLink} style={{ textDecoration: 'none' }}>
                        <Card sx={{ boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px', overflow: 'hidden' }}>
                            <Box
                                component='img'
                                sx={{
                                  height: window.innerWidth <= 600 ? '150px' : '300px',
                                    width: '100%',
                                    transition: 'transform 0.5s ease-in-out',
                                    borderRadius: '5px 5px 0 0'
                                }}
                                src={event.imagenEvento}
                            />
                        </Card>
                        <Typography variant='body2' sx={{ textAlign: 'flex-start', marginTop: '10px' }}>
                            {event.subgenero}
                        </Typography>
                        <Typography variant='body2' sx={{ textAlign: 'flex-start' }}>
                            {fechaFormateada}
                        </Typography>
                        <Typography variant='h1' sx={{ textAlign: 'flex-start', margin: '0 0 10px 0' }}>
                            {event.artista}
                        </Typography>
                    </Link>
                </Grid>
            );
        })}
    </Grid>
    <CircularButton onClick={(currentPage, maxCards) => handleNextCard(setTheaterPage, currentPage, maxCards)} rotate={false} currentPage={theaterPage} maxPages={theaterEvents.length} />
</Box>

        </Box>
    );
};
function handleNextPage(setter: any, max: any): void {
    throw new Error('Function not implemented.');
}

function handlePrevPage(setter: any, max: any): void {
    throw new Error('Function not implemented.');
}

