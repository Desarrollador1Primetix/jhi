import {} from '@fb-ui/react';
import {Box, Grid, Typography} from '@mui/material';
import * as React from 'react';
import {Footer} from '../../Components/Footer/Footer';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import {TicketSecondaryAppBar} from '../../Components/TicketSecondaryAppBar/TicketSecondaryAppBar';
import QrCard from './QRCard';

import SendIcon from '@mui/icons-material/Send';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DocumentMeta from 'react-document-meta';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon
} from 'react-share';
import {RightBar} from '../../Components/RightBar/RightBar';
import {useAppContext} from '../../Contexts/Api.Context';
import {getPublicity} from '../../Services/Content/Content';
import {getEvent} from '../../Services/Event/Event';
import {Event, Publicity} from '../../Types/Types';

export const TicketQR = () => {
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = React.useState<Event | null>(null);
  const {state} = useLocation();

  const CargarUI = () => {
    // FB.ui({
    //   method: 'feed',
    //   link: 'https://developers.facebook.com/docs/'
    // }, function(response){});
  };

  React.useEffect(() => {
    const getEventDetail = async () => {
      console.log('eventId', state.eventId);
      const {eventId} = state;
      const response = await getEvent(eventId ?? '');
      setEventDetail(response);
    };
    getEventDetail();
  }, []);

  const [publicity, setPublicity] = React.useState<Publicity[]>([]);
  const imagenEvento =
    'https://www.guatemala.com/fotos/2024/01/Concierto-de-Air-Supply-en-Guatemala-885x500.jpg';
  const spotify = 'https://open.spotify.com/intl-es/artist/4xXCRXOfQKQ2gjWxNhNzYW';
  const {apiUrl} = useAppContext();

  const callWelcomeFunctions = () => {
    getublicityFunction();
  };

  React.useEffect(() => {
    callWelcomeFunctions();
  }, []);

  React.useEffect(() => {
    callWelcomeFunctions();
  }, [apiUrl]);

  const getublicityFunction = () => {
    getPublicity(1, apiUrl).then((publicity) => setPublicity(publicity));
    // setPublicity(fetchPublicity);
  };

  const eventLink = `https://www.primetix.fun/reserva/${eventDetail?.nombre}/${eventDetail?.artista}/${eventDetail?.codigo}`;

  const tituloCard = `YaTengoMieEntradaA${eventDetail?.artista}${eventDetail?.nombre}`;
  const tituloShare = `Hey! ya viste he comprado mi entrada para el concierto ${eventDetail?.nombre} de ${eventDetail?.artista}`;
  return (
    <Box>
      <DocumentMeta canonical={eventLink} title={tituloShare} description={tituloCard}>
        <SearchAppBar />
        <TicketSecondaryAppBar />
        <Grid
          container
          direction='row'
          justifyContent='space-around'
          alignItems='stretch'
          style={{backgroundColor: '#D9D9D9', paddingTop: 20}}
        >
          <Grid item xs={6} sm={8} md={8}>
            <Card sx={{display: 'flex'}}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                  <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <Typography component='div' variant='h5'>
                      {eventDetail?.nombre}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                      {eventDetail?.nombreUbicacion}
                    </Typography>
                  </Box>

                  <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={eventDetail?.eventoImagenes[0].urlImagen}
                      alt='Paella dish'
                    />
                  </Box>
                  <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <Typography variant='subtitle2'>Sector 310, Fila 18</Typography>
                  </Box>
                  <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <Typography variant='body1'>Boleto de reventa verificado</Typography>
                  </Box>

                  <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <Typography variant='subtitle2' color='text.secondary' component='div'>
                      Entrada 1 de 5
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                      <Button variant='contained' endIcon={<SendIcon />}>
                        Compartir
                      </Button>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                      <Button variant='contained' endIcon={<StorefrontIcon />}>
                        Revender
                      </Button>
                    </Box>
                  </Box>
                  <Grid>
                    <Grid item>
                      <TwitterIcon size={32} round={true} />
                      <FacebookShareButton url={eventLink} hashtag={eventDetail?.nombre}>
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <LinkedinShareButton url={eventLink}>
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton>
                    </Grid>
                  </Grid>
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}></Box>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                <QrCard Valor='Datos de la Entrada'></QrCard>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <RightBar images={publicity} />
          </Grid>
        </Grid>

        <Footer />
      </DocumentMeta>
    </Box>
  );
};
