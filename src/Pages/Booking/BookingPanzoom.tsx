import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { TOOL_NONE } from 'react-svg-pan-zoom';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader, SvgLoaderSelectElement } from 'react-svg-pan-zoom-loader';
import { getSeats, getReservSeats } from '../../Services/Seat/Seat';
import { SeatsDetail } from '../../Types/Types';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const getLastSegment = () => {
  const path = window.location.pathname;
  const segments = path.split('/');
  return segments[segments.length - 1];
};

const eventId = getLastSegment();
// Generar o recuperar el UUID del almacenamiento local
const getUUID = () => {
  let uuid = localStorage.getItem('uuid');
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem('uuid', uuid);
  }
  return uuid;
};

const uuid = getUUID();


// Conectarse al servidor con UUID
const socket = io('http://localhost:3001', {
  query: { uuid, eventId }
});

socket.on('connect', () => {
  console.log('Conectado al servidor');
});

interface BookingPanzoomProps {
  onBooking?: (seatDetail: SeatsDetail, e?: HTMLElement) => void;
  setArrayofSeats?: (seats: SeatsDetail[]) => void;
  width: number;
  height: number;
  mapSrc?: string;
  Viewer: React.RefObject<UncontrolledReactSVGPanZoom>;
  codeEvent: number;
}

export const BookingPanzoom = ({
  onBooking,
  setArrayofSeats,
  Viewer,
  width,
  codeEvent,
  height,
  mapSrc = 'https://www.ticketmatic.com/docs/events/drawingseatingplans/larger.svg'
}: BookingPanzoomProps) => {
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState({});
  const [zoomCount, setZoomCount] = useState(0);
  const [seats, setSeats] = useState<SeatsDetail[]>([]);
  const [reservSeats, setReservSeats] = useState<SeatsDetail[]>([]);

  useEffect(() => {
    const getSeatsDetail = async () => {
      const response = await getSeats(codeEvent);
      setSeats(response);
      const mySeats = await getReservSeats(uuid, codeEvent);
      setArrayofSeats && setArrayofSeats(mySeats);
      setReservSeats(mySeats);
    };
    getSeatsDetail();
  }, [codeEvent]);

  useEffect(() => {
    // Escuchar el estado inicial de los asientos
    socket.on('initialSeatStatus', (initialSeats) => {
      console.log('Estado inicial de los asientos recibido:', initialSeats);
      setSeats((prevSeats) =>
        prevSeats.map((seat) => ({
          ...seat,
          ocupado: initialSeats[seat.codigo]?.occupied || seat.ocupado,
          uuid: initialSeats[seat.codigo]?.uuid || null,
        }))
      );
    });

    // Escuchar actualizaciones del estado de los asientos
    socket.on('seatStatus', ({ seatId, occupied, seatUuid }) => {
      console.log(`Actualización del estado del asiento ${seatId}: ${occupied}`);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.codigo === seatId ? { ...seat, ocupado: occupied, uuid: seatUuid } : seat
        )
      );
    });

    return () => {
      socket.off('initialSeatStatus');
      socket.off('seatStatus');
    };
  }, []);

  useEffect(() => {
    // Actualizar los colores de los asientos
    console.log('Actualizando colores de los asientos:', seats);
    seats.forEach((seat) => {
      const selectorCode = `#a_${seat.codigo}`;
      const seatElement = document.querySelector(selectorCode) as SVGElement;
      if (seatElement) {
        const color = getSeatColor(seat);
        console.log(`Seteando color del asiento ${seat.codigo} a ${color}`);
        seatElement.setAttribute('fill', color);
      }
    });
  }, [seats, reservSeats]);

  const handleSeatClick = async (seat, element) => {
    try {
      if (seat.ocupado && seat.uuid !== uuid) {
        console.log(`El asiento ${seat.codigo} ya está ocupado por otro usuario`);
        return; // Si el asiento ya está ocupado por otro usuario, no hacer nada
      }

      // Formato de la fecha de reserva
      const fechaReserva = moment().format('YYYY-MM-DDTHH:mm');

      console.log(`Fecha de reserva: ${fechaReserva}`);
      console.log(`UUID del usuario: ${uuid}`);
      console.log(`Código del asiento: ${seat.codigo}`);

      // Permitir deseleccionar el asiento si ya está seleccionado en esta sesión
      if (reservSeats.some(s => s.codigo === seat.codigo)) {
        console.log(`Deseleccionando asiento ${seat.codigo}`);
        const response = await axios.put('https://api2.primetix.fun/primetixapi/api/Asiento/ReservaAsiento/false', {
          codigoAsiento: seat.codigo,
          uuid,
          fechaReserva
        });
        console.log('Respuesta de la API al quitar reserva:', response.data);
        socket.emit('seatDeselected', { seatId: seat.codigo, seatUuid: uuid }); // Emite evento de deselección
        setReservSeats(prevSeats => prevSeats.filter(s => s.codigo !== seat.codigo));
      } else {
        console.log(`Seleccionando asiento ${seat.codigo}`);
        const response = await axios.put('https://api2.primetix.fun/primetixapi/api/Asiento/ReservaAsiento/true', {
          codigoAsiento: seat.codigo,
          uuid,
          fechaReserva
        });
        console.log('Respuesta de la API al reservar asiento:', response.data);
        socket.emit('seatSelected', { seatId: seat.codigo, seatUuid: uuid });
        setReservSeats(prevSeats => [...prevSeats, seat]);
      }

      onBooking && onBooking(seat, element);
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      if (error.response) {
        console.error('Datos de la respuesta del error:', error.response.data);
        console.error('Estado de la respuesta del error:', error.response.status);
        console.error('Encabezados de la respuesta del error:', error.response.headers);
      } else if (error.request) {
        console.error('Solicitud realizada:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const _fitToViewer = () => Viewer.current?.fitToViewer();

  const transformZoomCount = () => {
    if (zoomCount <= 0.122) return 10;
    else if (zoomCount > 0.122 && zoomCount <= 0.1478) return 9;
    else if (zoomCount > 0.1478 && zoomCount <= 0.1789) return 8;
    else if (zoomCount > 0.1789 && zoomCount <= 0.2165) return 7;
    else if (zoomCount > 0.2165 && zoomCount <= 0.2619) return 6;
    else if (zoomCount > 0.2619 && zoomCount <= 0.317) return 5;
    else if (zoomCount > 0.317 && zoomCount <= 0.3835) return 4;
    else if (zoomCount > 0.3835 && zoomCount <= 0.4641) return 3;
    else if (zoomCount > 0.4641 && zoomCount <= 0.5616) return 2;
    else return 1;
  };

  const OnMouseMove = (e) => {
    const svg = document.getElementById('tooltip-id') as unknown as SVGSVGElement;
    const tooltip = document.getElementById('tooltip');
    if (svg && tooltip) {
      const handleMouseMove = () => {
        const CTM = svg.getScreenCTM();
        if (CTM) {
          const mouseX = (e.clientX - CTM.e) / CTM.a;
          const mouseY = (e.clientY - CTM.f) / CTM.d;
          tooltip.setAttributeNS(null, 'x', (mouseX / CTM.a).toString());
          tooltip.setAttributeNS(null, 'y', (mouseY / CTM.d).toString());
          tooltip.setAttributeNS(null, 'visibility', 'visible');
          e.target.setAttribute('cursor', 'pointer');
          const scale = transformZoomCount();
          const x = (e.clientX - CTM.e) / (CTM.a * scale);
          const y = (e.clientY - CTM.f) / (CTM.d * scale);
          tooltip.setAttributeNS(
            null,
            'transform',
            ` scale(${scale}) translate(${x - 90} ${y - 138})`
          );
          e.target.setAttribute(
            'style',
            'stroke: #19857b; paint-order: fill markers; stroke-width: 3px;'
          );
          const tooltipText = tooltip.getElementsByTagName('text');
          let maxLength = 0;
          for (let i = 0; i < tooltipText.length; i++) {
            if (tooltipText[i].getComputedTextLength() > maxLength) {
              maxLength = tooltipText[i].getComputedTextLength();
            }
          }
          const tooltipRects = tooltip.getElementsByTagName('rect');
          for (let i = 0; i < tooltipRects.length; i++) {
            tooltipRects[i].setAttributeNS(null, 'width', (maxLength + 8).toString());
          }
        } else {
          // Si CTM es null, vuelve a intentar en el próximo frame.
          requestAnimationFrame(handleMouseMove);
        }
      };
  
      // Comienza el proceso de manejo del movimiento del ratón.
      requestAnimationFrame(handleMouseMove);
    }
  };
  
  
  

  const IncreaseZoomCount = (event) => {
    setZoomCount(event.a);
  };

  const getSeatColor = (seat) => {
    if (reservSeats.some(s => s.codigo === seat.codigo)) {
      return 'yellow'; // Asiento reservado por el usuario actual
    } else if (seat.ocupado && seat.uuid !== uuid) {
      return 'blue'; // Asiento ocupado por otro usuario
    } else if (seat.ocupado && seat.uuid === uuid) {
      return 'yellow'; // Asiento reservado por el mismo usuario
    } else {
      return 'green'; // Asiento disponible
    }
  };

  useEffect(() => {
    // Ajustar el SVG al tamaño del viewer al cargar
    _fitToViewer();
  }, []);

  return (
    <ReactSvgPanZoomLoader
      key={'reactPanZoom'}
      src={mapSrc}
      proxy={
        <>
          <SvgLoaderSelectElement selector='svg' id='tooltip-id' />
          {seats.map((seat) => {
            const {
              precio,
              fee,
              codigo,
              estadoAsiento,
              estadoLocalidad,
              nombre,
              nombreLocalidad,
              nombreSector,
              precioEspecial
            } = seat;
            const selectorCode = `#a_${codigo}`;
            return (
              <SvgLoaderSelectElement
                key={'svgLoader' + selectorCode}
                selector={selectorCode}
                onMouseLeave={(e) => {
                  const tooltip = document.getElementById('tooltip');
                  if (tooltip) {
                    tooltip.setAttributeNS(null, 'visibility', 'hidden');
                  }
                  
                  const price = document.getElementById('t_price');
                  const location = document.getElementById('t_location');
                  const nombreTooltip = document.getElementById('t_nombre');
                  if (price && location && nombreTooltip) {
                    price.textContent = `Q ${precio}`;
                    location.textContent = `${nombreLocalidad}`;
                    nombreTooltip.textContent = `${nombre}`;
                  }
                  
                  e.target.setAttribute(
                    'style',
                    'stroke: none; paint-order: fill markers; stroke-width: 3px;'
                  );
                }}
                onMouseMove={OnMouseMove}
                onClick={(e) => handleSeatClick(seat, e.target)}
                
              />
            );
          })}
          {reservSeats.map((seat) => {
            const {
              precio,
              fee,
              codigo,
              estadoAsiento,
              estadoLocalidad,
              nombre,
              nombreLocalidad,
              nombreSector,
              precioEspecial
            } = seat;
            const selectorCode = `#a_${codigo}`;
            return (
              <SvgLoaderSelectElement
                key={'svgLoader-Reserv' + selectorCode}
                selector={selectorCode}
                opacity='0.'
              />
            );
          })}
        </>
      }
      render={(content) => {
        return (
          <UncontrolledReactSVGPanZoom
            width={width}
            background='white'
            height={height}
            ref={Viewer}
            onZoom={IncreaseZoomCount}
            onChangeValue={(e) => console.log('event ', e)}
            miniatureProps={{ position: 'none', background: 'white', width: 10, height: 10 }}
          >
            <svg height={4500} width={2000} key={'svg_key'}>
              {content}
              <g id='tooltip' visibility='hidden'>
                <defs>
                  <clipPath id='round-corner'>
                    <rect x='0' y='0' width='180' height='120' rx='12' ry='12' />
                  </clipPath>
                </defs>
                <rect
                  x='4'
                  y='5'
                  width='180'
                  height='110'
                  fill='black'
                  opacity='0.4'
                  rx='12'
                  ry='12'
                />
                <rect width='180' height='110' fill='#FFFF' rx='12' ry='12' />
                <rect width='180' height='6' fill='#19857b' clipPath='url(#round-corner)' />
                <text
                  x='4'
                  id='t_price'
                  y='26'
                  fill='#062E42'
                  fontSize={20}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  Q 200
                </text>
                <text x='4' id='t_location' y='46' fill='#19857b' fontSize={16}>
                  Platinum
                </text>
                <text x='4' y='76' id='t_nombre' fontSize={14} fill='#062E42'>
                  Sector
                </text>
                <text x='4' y='96' id='t_status' fontSize={14} fill='#062E42'>
                  Disponible
                </text>
              </g>
            </svg>
          </UncontrolledReactSVGPanZoom>
        );
      }}
    />
  );
};
