export enum RequestVerbs {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export interface ApiRequest {
  verb: RequestVerbs;
  url: string;
  body?: any;
  isTokenRequired?: boolean;
  otpData?: {otp: string; phone: string};
  baseUrl?: string;
  onbToken?: string;
  transferToken?: string;
  accessToken?: string;
  isHmac?: boolean;
  contentSha?: string;
  headers?: {[key: string]: string};
}

export interface ResumeEvent {
  artista: string;
  codigo: number;
  //codigoEstado: 'PR';
  codigoEstado: 'ED'
  codigoTipo: number;
  codigoPais: number; 
  codigoPreventa: number; 
  estado: 'Evento disponible';
  fechaHoraFin: string;
  fechaHoraInicio: string;
  imagenEvento: string;
  nombre: string;
  ubicacion: string;
  subgenero: string;
  tipoEvento: string;
  genero: string;
  fechaInicioPreventa: string;
  fechaFinalPreventa: string;
}

export interface ResumeEventos {
  Eventos: ResumeTickets[];
}

export interface ResumeEventsByCountry {
  nombre: string; 
  eventos: ResumeEvent[]; 
}

export interface ResumeTicketsObject {
  objeto: ResumeTickets;
}

export interface ResumeTicketHistorial {
  codigoTicket: number;
  estado: string;
  nombreEstado: string;
  descripcionEstado: string;
  fecha: string;
}

export interface ResumeTickets {
  codigoUsuario: number;
  eventos: TicketEventos[];
}

export interface TicketEventos {
  codigoEvento: number;
  evento: string;
  artista: string;
  fechaEvento: string;
  imagenEvento: string;
  tickets: TicketTix[];
}

export interface TicketTix {
  codigo: number;
  codigoAsiento: number;
  codigoUsuario: number;
  asiento: string;
  localidad: string;
  precio: number;
  fecha: string;
  estado: string;
  codigoVenta: number;
}

export interface TicketTransfer {
  codigo: number;
  codigoTicket: number;
  codigoCanal: number;
  codigoUsuarioEnvia: number;
  codigoUsuarioRecibe: number;
  fecha: string;
  estado: string;
}

export interface Event {
  codigo: number;
  codigoPromotor: number;
  nombrePromotor: string;
  codigoUbicacion: number;
  nombreUbicacion: string;
  nombre: string;
  mapaUrl: string;
  estado: string;
  artista: string;
  spotify: string;
  spotifyEmbedCode: string | null;
  youtube: string;
  tipoEvento: string;
  codigoTipo: number;
  requiereMapa: boolean;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  genero: string;
  eventoImagenes: EventImage[];
}

export interface EventImage {
  codigo: number;
  codigoEvento: number;
  urlImagen: string;
  orden: number;
  ancho: string;
  alto: string;
  codigoTipo: number;
}

export interface Country {
  codigo: number;
  iso: string;
  nombre: string;
  urlImagen: string;
}

export interface CarouselEvent {
  codigo: number;
  codigoEvento: number;
  urlImagen: string;
  orden: number;
  ancho: string;
  alto: string;
  codigoTipo: number;
  nombreTipo: string;
}

export interface Publicity {
  codigo: number;
  descripcion: string;
  urlPublicidad: string; 
  urlPromocional: string; 
  //imagen: string;
  //url: string;
}

export interface ApiContextType {
  apiUrl: string;
  setApiUrl: (baseUrl: string) => void;
  showSnackbar: boolean;
  setShowSnackbar: (show: boolean) => void;
  messageSnackbar: string;
  setMessageSnackbar: (message: string) => void;
  userSession?: User;
  setUserSession: (userSession: User) => void;
  uuid: string;
  idCountry: number;
  setIdCountry: (idCountry: number) => void;
  idEvent: string;
  setIdEvent: (idEvent: string) => void;
}

export interface CreateAccountType {
  codigoPromotor: number;
  nombre: string;
  correoElectronico: string;
  numeroCelular: string;
  usuario: string;
  contrasena: string;
  codigoRol: number;
}

export interface SeatsDetail {
  ocupado: any;
  codigo: number;
  codigoLocalidad: number;
  codigoMesa: null;
  codigoSector: number;
  estadoAsiento: string;
  estadoLocalidad: string;
  fee: number;
  nombre: string;
  nombreLocalidad: string;
  nombreSector: string;
  precio: number;
  precioEspecial: number;
}

export enum Estado {
  Ds = 'DS   '
}

export interface Sector {
  codigo: number;
  codigoLocalidad: number;
  nombre: string;
  estado: Estado;
  asientos: Asiento[];
}

export interface Asiento {
  codigo: number;
  codigoSector: number;
  nombre: string;
  nombreSector: null;
  nombreLocalidad: null;
  precioEspecial: number;
  estado: Estado;
}

export interface CustomAsiento extends Asiento {
  precio: number;
  fee: number;
}

export interface User {
  codigo: number;
  codigoPromotor: null;
  nombre: string;
  usuario: string;
  tokenPrivado: string;
  activo: string;
  ultimaConexion: Date;
  codigoRol: number;
  rol: string;
  estadoRol: string;
  paginasAcceso: PaginasAcceso[];
  rols: any[];
}

export interface PaginasAcceso {
  codigo: number;
  nombre: string;
  url: string;
  descripcion: string;
  codigoPadre: null;
  icono: null;
  orden: number;
  permisos: any[];
}

export interface RegisterSaleRequestType {
  codigo: number;
  codigoEmpresa: number;
  codigoPago: number;
  codigoCliente: number;
  codigoDescuento: number;
  fecha: string;
  descuento: number;
  total: number;
  estado: string;
  correoElectronico: string;
  numeroCelular: string;
  ventaDetalles: VentaDetalle[];
  ventaPropiedads: VentaPropiedad[];
}

export interface VentaDetalle {
  codigo: number;
  codigoVenta: number;
  codigoAsiento: number;
  cantidad: number;
  precioUnitario: number;
}

export interface VentaPropiedad {
  codigoVenta: number;
  codigoPropiedad: number;
  valor: string;
}

export interface ResponsePayment {
  respuesta: string;
  pago: Pago;
}

export interface Pago {
  codigo: number;
  codigoMetodo: number;
  fecha: Date;
  monto: number;
  estado: string;
  transaccionPasarela: string;
  detalle: string;
}
