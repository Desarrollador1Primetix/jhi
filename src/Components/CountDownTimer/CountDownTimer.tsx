import {Snackbar, SnackbarContent, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppContext} from '../../Contexts/Api.Context';
import {unReservSeat} from '../../Services/Seat/Seat';
import {segundosAMinutos} from '../../Utils/SecondsToMinutes';

const CountdownTimer: React.FC = () => {
  const bookTime = 600;
  const [time, setTime] = React.useState(bookTime);
  const navigate = useNavigate();
  const {uuid, idEvent, messageSnackbar, showSnackbar, setShowSnackbar, setMessageSnackbar} =
    useAppContext();

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const startCountDown = () => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          unReservSeat(uuid, idEvent);

          setShowSnackbar(false);
          navigate('/');
          return 0;
        } else {
          const newTime = time - 1;
          setMessageSnackbar('Asiento reservado por ' + segundosAMinutos(time));
          return newTime;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (showSnackbar) {
      setTime(bookTime);
      startCountDown();
    }
  }, [showSnackbar]);

  const snackbarStyle = time <= 180 ? { backgroundColor: 'red', color: 'white' } : {};

  return (
    <Snackbar open={showSnackbar}>
      <SnackbarContent style={snackbarStyle} message={<Typography>{messageSnackbar}</Typography>} />
    </Snackbar>
  );
};

export default CountdownTimer;