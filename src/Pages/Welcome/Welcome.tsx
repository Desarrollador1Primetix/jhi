import {Box, Divider, Grid, Typography, Toolbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import {useState, useEffect} from 'react';
import * as React from 'react';
import {Country} from '../../Types/Types';
import {Banner} from '../../Components/Banner/Banner';
import {Footer} from '../../Components/Footer/Footer';
import {ImageList} from '../../Components/ImageList/ImageList';
import SimpleSlider from '../../Components/OtherEvents/OtherEvents';
import {RightBar} from '../../Components/RightBar/RightBar';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import {useAppContext} from '../../Contexts/Api.Context';
import {Country as CountryComponent} from '../../Components/Country/Country';
import {getCountries} from '../../Services/Country/Country';
import {getPublicity} from '../../Services/Content/Content';
import {getCarrousel, getEventByDate, getEvents, getEventsByName, getEventsByCountry} from '../../Services/Event/Event';
import {CarouselEvent, Publicity, ResumeEvent, ResumeEventsByCountry} from '../../Types/Types';


export default function Welcome() {
  const [events, setEvents] = React.useState<ResumeEvent[]>([]);
  const [eventsByCountry, setEventsByCountry] = React.useState<ResumeEventsByCountry[]>([]);
  const [eventsCarousel, setEventsCarousel] = React.useState<CarouselEvent[]>([]);
  const [publicity, setPublicity] = React.useState<Publicity[]>([]);
  const {apiUrl, idCountry} = useAppContext();
  const [countries, setCountries] = React.useState<Country[]>([]);

  const getEventsFunction = () => {
    getEvents(apiUrl).then((events) => setEvents(events));
  };
  const getCountriesFunction = async () => {
    const fetchCountries = await getCountries();
    setCountries(fetchCountries);
  };
  React.useEffect(() => {
    getCountriesFunction();
  }, []);

  const getEventsByCountryIdFunction = async () => {
    const eventsCountry = await getEventsByCountry(idCountry, apiUrl);
    const filterEventsCountry = eventsCountry.filter(category => category.eventos.length > 0);
    setEventsByCountry(filterEventsCountry);
  }

  const callWelcomeFunctions = () => {
    //getEventsFunction();
    getEventsByCountryIdFunction();
    getImageCarousel();
    getublicityFunction();
  };

  React.useEffect(() => {
    console.log('Updated Events by Country:', eventsByCountry);
  }, [eventsByCountry]);

  React.useEffect(() => {
    callWelcomeFunctions();
  }, []);

  React.useEffect(() => {
    callWelcomeFunctions();
  }, [apiUrl]);

  const eventsByDate = async (startDate: string, endDate: string) => {
    const fetchEvents = await getEventByDate(startDate, endDate, apiUrl);
    setEvents(fetchEvents);
  };

  const eventsByName = async (name: string) => {
    const fetchEvents = await getEventsByName(name, apiUrl);
    setEvents(fetchEvents);
  };

  const getImageCarousel = () => {
    getCarrousel(apiUrl).then((carrousel) => setEventsCarousel(carrousel));
  };

  const getublicityFunction = () => {
    getPublicity(idCountry, apiUrl).then((publicity) => setPublicity(publicity));
  };
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);

  useEffect(() => {
    const timeoutExpired = localStorage.getItem('timeoutExpired');
    if (timeoutExpired === 'true') {
      setShowTimeoutPopup(true);
      localStorage.removeItem('timeoutExpired');
    }
  }, []);

  const handleClosePopup = () => {
    setShowTimeoutPopup(false);
  };

  return (
    <Box>
      <Toolbar
        variant='dense'
        style={{
          backgroundColor: 'black',
          height: '2px',
          minHeight: '30px',
        }}
      >
        <CountryComponent countries={countries}  />
      </Toolbar>
      <SearchAppBar
        onFilterByName={eventsByName}
        onFilterByDate={eventsByDate}
        onResetEvents={getEventsByCountryIdFunction}
      />
      <Banner events={eventsCarousel} />
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='stretch'
        style={{backgroundColor: 'white', paddingTop: 20}}
      >
        <Grid item xs={6} sm={8} md={8}>
          <ImageList eventsByCountry={eventsByCountry}  />
          <Divider color='black' />
          <Divider color='black' />
        </Grid>
        <Grid item xs={5} sm={3} md={2}>
          <RightBar images={publicity} />
        </Grid>
      </Grid>

      <Footer />
      <Dialog
        open={showTimeoutPopup}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tiempo de reserva agotado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se han eliminado tus reservas, el tiempo para reservar tus boletos ha expirado.
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
}

const Events = React.memo(() => <SimpleSlider />);
