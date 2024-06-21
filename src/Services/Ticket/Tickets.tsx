import {ApiRequest, CarouselEvent, Event, RequestVerbs, ResumeTickets, TicketTransfer, User} from '../../Types/Types';
import {api} from '../api';

export async function getTickets(id: number, apiUrl?: string): Promise<ResumeTickets> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/tickettixapi/api/Ticket/ObtieneTicketPorUsuario?idUsuario=${id}`,
    baseUrl: apiUrl
  }; 

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeTickets;
  } else {
    return {} as ResumeTickets;
  }
}

export async function putTicketTransferList(
  codigo:number, codigoTicket:number, codigoCanal:number, codigoUsuarioEnvia: number, 
  codigoUsuarioRecibe: number, fecha: string, estado: string, apiUrl?: string): 
  Promise<TicketTransfer> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/securetixapi/api/Login/ValidaContrasenaLoginPrimetix`,
    body: {codigo, codigoTicket, codigoCanal, codigoUsuarioEnvia, codigoUsuarioRecibe, fecha, estado},
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as TicketTransfer;
  } else {
    return {} as TicketTransfer;
  }
}