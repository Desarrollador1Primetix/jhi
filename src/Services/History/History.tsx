import {ApiRequest, CarouselEvent, Event, RequestVerbs, ResumeTicketHistorial} from '../../Types/Types';
import {api} from '../api';

export async function getHistory(id: number, apiUrl?: string): Promise<ResumeTicketHistorial[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/tickettixapi/api/Ticket/ObtieneTicketHistorialPorIdUsuario?idUsuario=${id}`,
    baseUrl: apiUrl
  }; 

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeTicketHistorial[];
  } else {
    return [];
  }
}