import { 
  Container,
  Card,
  TextField,
  Grid,
  Paper,
  Box,
  Typography,
  Link,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  FormHelperText,
  Button
} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from 'react';
import {generatePassword, getUser, login} from '../../Services/Session/Session';
import sideImage from '../../assets/Image/sideImage.png';
import logo from '../../assets/Image/logo.png';
import * as React from 'react';
import { Correo } from './correo';
import {Token} from './Token';
import { useNavigate } from 'react-router-dom';
import {useAppContext} from '../../Contexts/Api.Context';


export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [textoError, setTextoError] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorToken, setErrorToken] = useState<boolean>(false);
  const [cambio, setCambio] = useState<boolean>(false);
  const {setUserSession, userSession} = useAppContext();
  const navigate = useNavigate();

  const mail =  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setTextoError("");
    if(!cambio){
      if(email === ""){
        setErrorEmail(true);
        setTextoError('Campo requerido');
        return;
      }
      if(!mail.test(email)){
        setErrorEmail(true);
        setTextoError("el texto ingresado debe ser un correo valido");
      }

      const list = {
        email: email
      }

      console.log(list)

      
      const response = await getUser(email, '');

      if(response.codigo != undefined){
        const respuesta = await generatePassword(email);
        
        let valores = Object.values(respuesta);

        if(valores[0]){
          setCambio(true);
        }
      }
      else{
        setTextoError('Este correo electronico no es valido');
        return;
      }
    }
    else{
      if(token === ""){
        setErrorToken(true);
        setTextoError('Campo requerido');
        return;
      }

      const respuesta = await login(email, token);

      let valores = Object.values(respuesta);

      let valor = valores[0];
      console.log(valores);

      if(valor){
        setTextoError("");
        setErrorToken(false);
        let usuario = valores[2];
        setUserSession(
          {
            codigo: usuario.codigo,
            codigoPromotor: usuario.codigoPromotor,
            nombre: usuario.nombre,
            usuario: usuario.usuario1,
            tokenPrivado: usuario.tokenPrivado,
            activo: usuario.activo,
            ultimaConexion: usuario.ultimaConexion,
            codigoRol: usuario.codigoRol,
            rol: usuario.rol,
            estadoRol: usuario.estadoRol,
            paginasAcceso : usuario.paginaAcceso,
            rols: []
          }
        )
        navigate("/")
      }
      else{
        setTextoError("contraseña invalida");
        setErrorToken(true);
        return;
      }
    }
  };

  const handleEmailChange = async(e: ChangeEvent<HTMLInputElement>) => {
    if(!mail.test(e.target.value)){
      setErrorEmail(true);
      setTextoError("el texto ingresado debe ser un correo valido");
    }
    else{
      const response = await getUser(e.target.value.trim(), '');

      if(response.codigo == undefined){
        setErrorEmail(true);
        setTextoError("el correo ingresado no esta registrado");
      }
      else{
        setErrorEmail(false);
        setEmail(e.target.value.trim());
        setTextoError("");
      }
    }
  };

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== ""){
      setTextoError("");
      setErrorToken(false);
      setToken(e.target.value);
    }
  }

  const enviarDeNeuvo = async() => {
    const response = await getUser(email, '');

      if(response.codigo != undefined){
        const respuesta = await generatePassword(email);
        
      }
  }
  return (
    <React.Fragment>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Container component={"form"} sx={{borderRadius: 10}} onSubmit={handleRegister} >
          <Paper elevation={10} style={{height: 750, maxWidth:1244, marginTop:"37px", marginLeft:"20px", borderRadius:10 }}>
            <Card style={{borderRadius:10}}>
            <Box>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <Box sx={{width:"100%", height:"100%"}}>
                    <img src={sideImage} style={{width:"100%", height:750}} />
                    <Typography variant='subtitle1' align='left' sx={{position:"fixed", bottom:0, top:"120px", color:'white', width: "320px", marginLeft:"25px"}}>
                      La forma más segura y emocionante de disfrutar eventos
                    </Typography>
                    <img src={logo} style={{position:"fixed", width:"35px", height:"60px", bottom: "80px", marginLeft:"20px"}} />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box display={"grid"} gridTemplateColumns={"repeat(12,1fr)"} sx={{width:"100%", height:"100%", paddingTop:"200px",
                    paddingBottom:"200px", paddingLeft:"40px", paddingRight:"40px"
                    }} gap={0}>
                      {
                        cambio ? (
                          <Token textoError={textoError} errorToken={errorToken} handleTokenChange={handleTokenChange} enviarDeNeuvo={enviarDeNeuvo} />
                        ) :
                        (
                          <Correo textoError={textoError} errorEmail={errorEmail} handleEmailChange={handleEmailChange} />
                        )
                      }
                  </Box>
                </Grid>
              </Grid>
            </Box>
            </Card>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};
