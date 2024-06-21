import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Footer } from '../../Components/Footer/Footer';
import SearchAppBar from '../../Components/SearchAppbar/SearchAppbar';
import { Grid, ImageList, Container, Typography, Box, Paper, Select, TextField, Button, FormControlLabel, useAutocomplete, AutocompleteGetTagProps, autocompleteClasses, InputLabel, SelectChangeEvent, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CloseRounded } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Root = styled('div')(
    ({ theme }) => `
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    font-size: 14px;
  `,
  );
  
  const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;
  
  const InputWrapper = styled('div')(
    ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
      color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `,
  );
  
  interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
  }
  
  function Tag(props: TagProps) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
      </div>
    );
  }
  
  const StyledTag = styled(Tag)<TagProps>(
    ({ theme }) => `
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
    };
    border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;
  
    &:focus {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    }
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `,
  );
  
  const Listbox = styled('ul')(
    ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
      font-weight: 600;
  
      & svg {
        color: #1890ff;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
      cursor: pointer;
  
      & svg {
        color: currentColor;
      }
    }
  `,
  );

export const EventoPrivadoNuevo = () => {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

      const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
      } = useAutocomplete({
        id: 'customized-hook-demo',
        defaultValue: [top100Films[1]],
        multiple: true,
        options: top100Films,
        getOptionLabel: (option) => option.title,
      });

      


  
const columns: GridColDef<(typeof top100Films)[number]>[] = [
  { field: 'index', headerName: 'Index', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 50,
    editable: true,
  }
];

// const arrLocalidadSeleccionada;
//{ id:0, title: '0', year: 0 }

// function toDo(id:string, title:string, year:any) {
function toDo(str:any) {
  // arrLocalidadSeleccionada.push(id, title, year);
  // console.log(arrLocalidadSeleccionada);
  return "";
}

  return (
    
    <Box sx={{backgroundColor: '#D9D9D9'}}>
      <SearchAppBar />
      <Container>
        <Grid
          container
          flexDirection='row'
          spacing={2}
          sx={{
            paddingY: {
              xs: 2,
              sm: 8
            }
          }}
          flex={1}
        >
          <Grid item md={8} sm={8}>
            <Paper elevation={4} sx={{padding: 3, marginBottom: 3}}>
              <Typography variant='subtitle2' style={{fontSize: 20, paddingBottom: 10}}>
                Evento privado
              </Typography>
              <Typography variant='subtitle2' style={{color: '#3EDB84'}}>
                Crear - Evento 
              </Typography>
              <Typography variant='subtitle2' style={{fontWeight: 500}}>
                Ahora puedes crear tus propios eventos privados para invitar
                a tus amigos a fiestas inolvidables, únicas y con el apoyo de la 
                mejor ticketera del mundo Primetix.fun.
              </Typography>
            </Paper>
            <Paper elevation={4} sx={{padding: 3, display: 'flex', flex: 1}}>
              <Grid container item style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                {/* <Grid container flexDirection={'column'} spacing={4}> */}
                <Typography variant='subtitle2'>Datos del evento</Typography>
                <TextField label='Nombre del Evento' />
                <TextField label='Descripción del Evento' multiline maxRows={4} minRows={3} />

                <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload file
                <VisuallyHiddenInput type="file" />
                </Button>

                <div {...getRootProps()}>
                    <Label {...getInputLabelProps()}>Localidades</Label>
                    <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                    {value.map((option: FilmOptionType, index: number) => (
                        <StyledTag label={option.title} {...getTagProps({ index })} />
                    ))}
                    <input {...getInputProps()} />
                    </InputWrapper>
                </div>
                {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                    {(groupedOptions as typeof top100Films).map((option, index) => (
                        <li value={option.id} {...getOptionProps({ option, index })}>
                        <span>{option.title}</span>
                        <CheckIcon fontSize="small" />
                        </li>
                    ))}
                    </Listbox>
                ) : null}
                
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

                <Grid container item display='flex' spacing={2}>
                  <Grid item display={'flex'} xs={6}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      autoWidth
                    >
                      {value.map((option: FilmOptionType, index: number) => (
                            <MenuItem value={index}>{option.title}</MenuItem>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item  xs={6}>
                    <TextField label='Cantidad de asientos' />
                  </Grid>
                </Grid>

                


                <TextField label='Cantidad de asientos' />
                <Button
                  onClick={() => {
                    toDo('clicked');
                  }} >
                    Add
                </Button>
                
                <Grid container item display='flex' spacing={2}>
                  <Grid item display={'flex'} xs={6}>
                    <TextField fullWidth label='Fecha de expiración' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label='Código de seguridad' />
                  </Grid>
                </Grid>
                <TextField label='Pais' />
                <TextField label='Dirección' />
                <TextField label='Número de teléfono' />
                <TextField label='Correo' />

                <Typography variant='subtitle2' style={{fontWeight: 500}}>
                    Cargar fotos
                </Typography>

                

                <Grid item style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button sx={{color: '#3EDB84'}}>Cancelar</Button>
                  <Button color='secondary' variant='contained' sx={{backgroundColor: '#3EDB84'}}>
                    Agregar tarjeta
                  </Button>
                </Grid> 
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} sm={4} xs={12}>
            <Paper elevation={8} sx={{padding: 3, display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='subtitle2'>Total</Typography>
                <Typography variant='subtitle2'>Q</Typography>
              </div>
              <Button
                variant='text'
                sx={{color: '#3EDB84', marginTop: 2, justifyContent: 'flex-start'}}
              >
                Cancelar compra
              </Button>
              <Typography
                variant='subtitle2'
                sx={{fontWeight: 500, color: '#727272', fontSize: 10, paddingY: 1}}
              >
                Las compras procesadas no tienen cambios o reembolso
              </Typography>
              
            </Paper>
          </Grid>
        </Grid>
        
      </Container>
      <Footer />
    </Box>
    
  );
}

interface FilmOptionType {
    title: string;
    year: number;
  }
  
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { id:1, title: 'Gradas', year: 1991 },
    { id:2, title: 'VIP', year: 1992 },
    { id:3, title: 'VIP de pie', year: 1993 },
    { id:4, title: 'Mesas', year: 1994 },
    { id:5, title: 'Mesas Black', year: 1995 },
    { id:6, title: "Mesas Amex", year: 1996 },
    { id:7, title: 'Mesas Platinum', year: 1997 },
    { id:8, title: 'Mesas Oro', year: 1998 },
    { id:9, title: 'Amex', year: 1999 },
    { id:10, title: 'Platinum', year: 2000 },
    { id:11, title: 'Oro', year: 2001 },    
  ];