import React from 'react';
import QrImage from './QR';

function QrCard({Valor}:any) {
    return (
        <div style={styles.container}>
            <div style={styles.scanner}></div>
            <QrImage valorQR={Valor} />
        </div>
    );
}

const styles = {
  container: {
    position: 'relative' as 'relative',
    display: 'inline-block',
  },
  scanner: {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'url("https://primetiximages.s3.amazonaws.com/escaneo.gif")', // Ruta a tu gif animado
    backgroundSize: 'cover',
    animation: 'scanner-animation 3s infinite', // Ajusta la duración de la animación según tu gif
  },
  image: {
    display: 'block',
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    zIndex: 1,
  },
  '@keyframes scanner-animation': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-50%)' },
    '100%': { transform: 'translateY(0)' },
  },
};

export default QrCard;
