import * as React from 'react';
import {ChangeEvent, FormEvent, useState} from 'react';
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
import {Link} from 'react-router-dom';

interface CorreoProps {
    textoError: string,
    errorEmail: boolean,
    handleEmailChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Correo = ({
        textoError,
        errorEmail,
        handleEmailChange
    }:
    CorreoProps) => {

    return(
        <React.Fragment>
        <Box gridColumn={"span 12"}>
                <Typography variant='subtitle1' align='left'>
                Inicia sesion
                </Typography>
                <Typography variant='subtitle2' align='left' sx={{color:'black'}}>
                ¿No tienes cuenta?
                <Link  to="/register"  style={{color:'#038B94'}}>
                    Registrate
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
            <Box gridColumn={"span 12"}>
                <Button type='submit' variant='contained' sx={{backgroundColor: "#038B94"}}>Siguiente</Button>
            </Box>
        </React.Fragment>
    );
} 
