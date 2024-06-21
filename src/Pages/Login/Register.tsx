import { 
  Container,
  Card,
  TextField,
  Grid,
  Paper,
  Box,
  Typography,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  FormHelperText,
  Button
} from '@mui/material';
import {ChangeEvent, FormEvent, useState} from 'react';
import {createAccount, getUser} from '../../Services/Session/Session';
import {CreateAccountType, ResumeEvent, User} from '../../Types/Types';
import sideImage from '../../assets/Image/sideImage.png';
import logo from '../../assets/Image/logo.png';
import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [textoError, setTextoError] = useState<string>('');
  const [terms, setTerms] = useState<boolean>(false);
  const [notification, setNotificacion] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorLastName, setErrorLast] = useState<boolean>(false);
  const [errorTerms, setErrorTerms] = useState<boolean>(false);
  const [errorNoti, setErrorNoti] = useState<boolean>(false);
  const navigate = useNavigate();

  const mail =  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const numeros = /^[0-9]*$/;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    
    if(email.trim() === ""){
      setErrorEmail(true);
      setTextoError('Campo requerido');
      return;
    }
    if(name.trim() === ""){
      setErrorName(true);
      return;
    }
    if(lastName.trim() === ""){
      setErrorLast(true);
      return;
    }

    if(!terms){
      setErrorTerms(true);
      return;
    }
    if(!notification){
      setErrorNoti(true);
      return;
    }
    
    const comprobarEmail = await getUser(email.trim(), phone.trim());

    if(comprobarEmail.codigo != undefined){
      setErrorEmail(true);
      setTextoError("este correo electronico ya esta registrado"); 
      return;
    }

    const lista:CreateAccountType = {
      codigoPromotor: 0,
      nombre: name.trim() + ' ' + lastName.trim(),
      correoElectronico: email.trim(),
      numeroCelular: phone.trim(),
      usuario: email.trim().split('@')[0],
      contrasena: '',
      codigoRol: 1
    };

    console.log(lista);

    const response = await createAccount(lista ?? '');

    if(response.toString().includes("correctamente")){
      navigate("/login");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    if(e.target.value.trim() !== ""){
      setErrorName(false);
      setName(e.target.value.trim());
    }
    else{
      setErrorName(true);
      setName("");
    }
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.trim() !== ""){
      setErrorLast(false);
      setLastName(e.target.value.trim());
    }
    else{
      setErrorLast(true);
      setLastName("");
    }
  };

  const handleEmailChange = async(e: ChangeEvent<HTMLInputElement>) => {
    if(!mail.test(e.target.value.trim())){
      setErrorEmail(true);
      setTextoError("el texto ingresado debe ser un correo valido");
    }
    else{
      const response = await getUser(e.target.value.trim() ?? '', phone);
      if(response.codigo !== undefined){
        setErrorEmail(true);
        setTextoError("Este correo electronico ya esta registrado");
      }
      else{
        setErrorEmail(false);
        setEmail(e.target.value.trim());
        setTextoError("");
      }
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(numeros.test(e.target.value.trim())){
      setPhone(e.target.value.trim());
    }
    else{
      e.target.value = "";
    }
  };

  const handleTerminosChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.checked){
      setErrorTerms(true);
      setTerms(false);
    }else{
      setErrorTerms(false);
      setTerms(true);
    }
  }

  const handleNotificationsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.checked){
      setErrorNoti(true);
      setNotificacion(false);
    }
    else{
      setErrorNoti(false);
      setNotificacion(true);
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
                  <Box display={"grid"} gridTemplateColumns={"repeat(12,1fr)"} sx={{width:"100%", height:"100%", padding:5}} gap={1}>
                    <Box gridColumn={"span 12"}>
                      <Typography variant='subtitle1' align='left'>
                        Registrate
                      </Typography>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        ¿ya tienes una cuenta?
                        <Link to="/login"  style={{color:'#038B94'}}>
                          Iniciar Sesion
                        </Link>
                      </Typography>
                    </Box>
                    <Box gridColumn={"span 12"} sx={{marginTop:0}}>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        Correo electronico
                      </Typography>
                      <TextField 
                        type='email'
                        fullWidth
                        sx={{height:4}}
                        variant='standard'
                        onChange={handleEmailChange}
                        error={errorEmail}
                        helperText={
                          errorEmail ? (
                            textoError
                          ):
                          (
                            ""
                          )
                        }
                      ></TextField>
                    </Box>
                    <Box gridColumn={"span 10"} sx={{}}>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        Contraseña
                      </Typography>
                      <Typography variant='subtitle2' align='left' sx={{color: '#999999'}}>
                        Se enviara un codigo a tu correo para registrarte. por tu seguridad
                      </Typography>
                    </Box>
                    <Box gridColumn={"span 6"}>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        Nombre
                      </Typography>
                      <TextField 
                        type='text'
                        fullWidth
                        sx={{height:4}}
                        variant='standard'
                        onChange={handleNameChange}
                        error={errorName}
                        helperText={
                          errorName ? (
                            "Campo requerido"
                          ):
                          (
                            ""
                          )
                        }
                      ></TextField>
                    </Box>
                    <Box gridColumn={"span 6"}>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        Apellido
                      </Typography>
                      <TextField 
                        type='text'
                        fullWidth
                        sx={{height:4}}
                        variant='standard'
                        onChange={handleLastNameChange}
                        error={errorLastName}
                        helperText={
                          errorLastName ? (
                            "Campo requerido"
                          ):
                          (
                            ""
                          )
                        }
                      ></TextField>
                    </Box>
                    <Box gridColumn={"span 6"}>
                      <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                        Numero
                      </Typography>
                      <TextField 
                        type='text'
                        fullWidth
                        sx={{height:4}}
                        variant='standard'
                        onChange={handlePhoneChange}
                      ></TextField>
                    </Box>
                    <Box gridColumn={"span 12"}>
                      <FormControl 
                        component={"fieldset"}
                        sx={{m:0}}
                        variant='standard'>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox
                              onChange={handleTerminosChange}
                            ></Checkbox>} label="Acepto la Politica de Privacidad y Cookies.">
                            </FormControlLabel>
                          </FormGroup>
                          <FormHelperText error={errorTerms}>
                            {
                              errorTerms ? (
                                `Campo requerido`
                              ):
                              (
                                ``
                              )
                            }
                          </FormHelperText>
                        </FormControl>
                        <FormControl 
                        component={"fieldset"}
                        sx={{m:0}}
                        variant='standard'>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox
                              onChange={handleNotificationsChange}
                            ></Checkbox>} label="Quiero recibir comunicaciones comerciales personalizadas de Primetix a través del email."
                              
                            >
                            </FormControlLabel>
                          </FormGroup>
                          <FormHelperText error={errorNoti}>
                            {
                              errorNoti ? (
                                `Campo requerido`
                              ):
                              (
                                ``
                              )
                            }
                          </FormHelperText>
                        </FormControl>
                    </Box>
                    <Box gridColumn={"span 12"}>
                      <Button type='submit' variant='contained' sx={{backgroundColor: "#038B94"}}>Siguiente</Button>
                    </Box>
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
