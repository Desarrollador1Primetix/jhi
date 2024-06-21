import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import './index.css'

// A custom theme for this app
const theme = createTheme({
  typography: {
    subtitle1: {
      fontFamily: 'BienaleRegular',
      fontWeight: 500,
      fontSize: '2rem',
    },
    subtitle2: {
      fontFamily: 'BienaleRegular',
      fontWeight: 400,
      fontSize: '1rem',
      color: 'white'
    },
    body1: {
      fontFamily: 'BienaleBold',  
      fontWeight: 700,
      fontSize: '1rem',
      color: 'black'
    },
    body2: {
      fontFamily: 'BienaleRegular',  
      fontWeight: 400,
      fontSize: '1rem',
      color: '#646464'
    },
    h1: {
      fontFamily: 'BienaleBold',
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h2: {
      fontFamily: 'BienaleRegular',
      fontWeight: 600,
      fontSize: '0.5rem',
      color: '#038B94'
    },
    h3: {
      fontFamily: 'BienaleBold',
      fontWeight: 500,
      fontSize: '1rem',
      color: '#646464'
    },
  },
  palette: {
    primary: {
      main: '#062E42'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    info: {
      main: '#FFFF'
    }
  }
});
 
export default theme;