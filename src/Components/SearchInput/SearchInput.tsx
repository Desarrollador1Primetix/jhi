import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Calendar from '../Calendar/Calendar';
import Select from '../Select/Select';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 32,
  backgroundColor: '#40515F',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: 0, // Para que se ajuste mejor a la pantalla del móvil
  },
  '&:hover': {
    backgroundColor: alpha('#40515F', 0.85),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  padding: '0 8px', // Añadir padding al contenedor para evitar que los elementos toquen los bordes
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: 0,
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    left: 'auto',
  },
}));

const ActionsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0, // Sin margen a la izquierda para móvil
    marginTop: theme.spacing(1),
    flexDirection: 'column', // Ajuste para móvil
  },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  flexGrow: 1,
  
  '& .MuiInputBase-input': {
    fontSize: '1vw',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%', // Asegura que el ancho sea 100% en dispositivos de tamaño medio y superior
    [theme.breakpoints.up('md')]: {
      width: '20ch', // Ajusta el ancho según tus necesidades
    },
  },
}));

interface SearchInputProps {
  onFilterByName: (name: string) => void;
  onFilterByDate: (startDate: string, endDate: string) => void;
  onResetEvents: () => void;
}

export const SearchInput = ({ onFilterByName, onFilterByDate, onResetEvents }: SearchInputProps) => {
  const [changeText, setChangeText] = React.useState('');
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByName(event.target.value);
    setChangeText(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Buscar...'
        value={changeText}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChangeText}
      />
      
        <Select />
        <Calendar onSearch={onFilterByDate} onResetEvents={onResetEvents} />
      
    </Search>
  );
};

export default SearchInput;
