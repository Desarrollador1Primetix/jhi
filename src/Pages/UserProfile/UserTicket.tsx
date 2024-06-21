import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TicketCard from '../Ticket/TicketCard';
import { Footer } from '../../Components/Footer/Footer';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import { ResumeEvent, ResumeTicketsObject, ResumeTickets, ResumeTicketHistorial } from '../../Types/Types';
import { getEvents } from '../../Services/Event/Event';
import { getTickets } from '../../Services/Ticket/Tickets';
import { getHistory } from '../../Services/History/History';
import { Grid, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StorefrontIcon from '@mui/icons-material/Storefront';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ShareIcon from '@mui/icons-material/Share';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useFech } from '../../useFech';
import HistoryIcon from '../../Components/HistoryIcon/HistoryIcon';
import { Item } from '../../Components/Carousel/Carousel';

const meta = {
  title: 'Primetix.fun',
  description: 'Prueba descripcion primetix.fun',
  canonical: 'http://Primetix.fun',
  meta: {
      charset: 'utf-8',
      name: {
          keywords: 'react,meta,document,html,tags'
      }
  }
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const UserTicket = () => {
  const [value, setValue] = React.useState(0);
  const [tix, setTickets] = React.useState<ResumeTickets>();
  const [history, setHistory] = React.useState<ResumeTicketHistorial[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    const getTicketsFunction = async () => {
      getTickets(2, 'https://api2.primetix.fun').then((tix) => setTickets(tix))
      console.log(tix);
      //setTickets(fetchTickets);
    };
    getTicketsFunction();
  }, []);

  
  React.useEffect(() => {
    const getHistoryFunction = async () => {
      getHistory(2, 'https://api2.primetix.fun').then((history) => setHistory(history))
      console.log(history);
      //setTickets(fetchTickets);
    };
    getHistoryFunction();
  }, []);

  return (
    
    <Box>
        <SearchAppBar />
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Próximos eventos " {...a11yProps(0)} />
              <Tab label="Eventos pasados" {...a11yProps(1)} />
              <Tab label="Historial" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          {tix?.eventos.map((item) => (
            <TicketCard eventos={item.tickets} imagen={item.imagenEvento} nombre={item.evento} artista={item.evento} codigo={item.codigoEvento}/>
          ))}
            
          
          </CustomTabPanel> 
          <CustomTabPanel value={value} index={1}>
            
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {history.map((item) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HistoryIcon icono={item.estado} />
                </Avatar> 
              </ListItemAvatar>
              <ListItemText primary={item.descripcionEstado} secondary={item.fecha} />
            </ListItem> 
          ))}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ShareIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Entrada Transferida a diegolopezsantos@gmail.com" secondary="9 de Enero del 2024 a las 14:37:03hrs." />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <StorefrontIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Entrada Comprada" secondary="1 de Enero del 2024 a las 11:21:50hrs." />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HowToRegIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="¡Iniciaste tu aventura con Primetix!" secondary="25 de Diciembre del 2023 a las 01:25:45hrs." />
            </ListItem>
          </List>
          </CustomTabPanel>
          
        </Box>
        
        <Footer />
      </Box>
    
  );
}
