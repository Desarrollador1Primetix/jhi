import * as React from 'react'

import {ChangeEvent, FormEvent, useState} from 'react';
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

interface TokenProps {
    textoError: string,
    errorToken: boolean,
    handleTokenChange: (e: ChangeEvent<HTMLInputElement>) => void,
    enviarDeNeuvo: () => void
}
export const Token = (
    {
        textoError,
        errorToken,
        handleTokenChange,
        enviarDeNeuvo
    }:
    TokenProps
) => {
    return(
        <React.Fragment>
        <Box gridColumn={"span 12"}>
                <Typography variant='subtitle1' align='left'>
                Ingresa el codigo que enviamos a tu correo 
                </Typography>
            </Box>
            <Box gridColumn={"span 12"} sx={{marginTop:0}}>
                <TextField 
                type='text'
                fullWidth
                sx={{height:4}}
                variant='standard'
                onChange={handleTokenChange}
                error={errorToken}
                helperText={
                    errorToken ? (
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
                ¿No recibiste el correo?
                </Typography>
                <Button sx={{color:'#999999'}} onClick={enviarDeNeuvo}>
                    Enviar de nuevo
                </Button>
            </Box>
            <Box gridColumn={"span 12"}>
                <Button type='submit' variant='contained' sx={{backgroundColor: "#038B94"}}>Iniciar Sesión</Button>
            </Box>
        </React.Fragment>
    );
}