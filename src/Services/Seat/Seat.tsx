import {ApiRequest, RequestVerbs, SeatsDetail} from '../../Types/Types';
import {api} from '../api';

export interface requestSeat {
  codigoAsiento: number;
  uuid: string;
  fechaReserva: string;
}

export async function getSeats(id: number, apiUrl?: string): Promise<SeatsDetail[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Asiento/ObtieneAsientoPorIdEvento/${id}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as SeatsDetail[];
  } else {
    return [] as SeatsDetail[];
  }
}

export async function reservSeat(reserva: boolean, body: requestSeat, apiUrl?: string) {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.PUT,
    url: `/primeTixApi/api/Asiento/ReservaAsiento/${reserva}`,
    body,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as SeatsDetail[];
  } else {
    return [] as SeatsDetail[];
  }
}

export async function unReservSeat(uuid: string, idEvent: string, apiUrl?: string) {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.PUT,
    url: `/primeTixApi/api/Asiento/QuitarReservas/${uuid}?codigoEvento=${idEvent}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as SeatsDetail[];
  } else {
    return [] as SeatsDetail[];
  }
}

export async function getReservSeats(
  uuid: string,
  idEvent: number,
  apiUrl?: string
): Promise<SeatsDetail[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Asiento/ObtieneAsientoReservadosPorUuid?Uuid=${uuid}&codigoEvento=${idEvent}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as SeatsDetail[];
  } else {
    return [] as SeatsDetail[];
  }
}
