import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import CountdownTimer from './Components/CountDownTimer/CountDownTimer';
import {AppProvider} from './Contexts/Api.Context';
import {Booking} from './Pages/Booking/Booking';
import {Checkout} from './Pages/Checkout/Checkout';
import {ForgotPassword} from './Pages/Login/ForgotPassword';
import {Login} from './Pages/Login/Login';
import {Register} from './Pages/Login/Register';
import {TicketQR} from './Pages/Ticket/TicketQR';
import {UserTicket} from './Pages/UserProfile/UserTicket';
import Welcome from './Pages/Welcome/Welcome';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import React from 'react';

import { EventoPrivadoNuevo } from './Pages/EventoPrivado/EventoPrivadoNuevo';


export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <AppProvider>
      <Router>
        <div>
          <CountdownTimer />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/reserva/:eventName/:eventArtist/:eventId' element={<Booking />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/ticketqr' element={<TicketQR />} />
            <Route path='/userticket' element={<UserTicket />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/EventoPrivadoNuevo' element={<EventoPrivadoNuevo />} />
            <Route path='/qr/:eventName/:eventArtist/:eventId' element={<TicketQR />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
    </ThemeProvider>
  );
}
