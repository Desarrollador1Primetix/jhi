import React from "react";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { months } from "moment";
import moment from "moment";
import isMobile from "ismobilejs";
import { Tune } from "@mui/icons-material";

const QrImage = ({valorQR}:any) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let time = Date.now();
  let timeFormated = moment(Date.now()).format('DD/MM/yyyy HH:mm:ss');

  
    
  return(
    <QRCode value={valorQR}></QRCode>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  );
}

export default QrImage;
// export function QR({valorQR}:any){
  
//   console.log('intento ' + Timer());
  
// }