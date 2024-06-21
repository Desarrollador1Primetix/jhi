import {ApiRequest, CarouselEvent, Event, RequestVerbs, ResumeEvent, ResumeEventsByCountry} from '../../Types/Types';
import {api} from '../api';

export async function getEvents(apiUrl?: string): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Evento/ObtenerEventos`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [];
  }
}

export async function getEventsById(id: number, apiUrl?: string): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Evento/ObtenerEventosPorIdPais/${id}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [];
  }
}

export async function getEventsByCountry(id: number, apiUrl?: string): Promise<ResumeEventsByCountry[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Evento/ObtenerEventosAgrupadosPorIdPais/${id}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  console.log(response)

  if (response.kind === 'ok') {
    return response.rawData as ResumeEventsByCountry[];
  } else {
    return [];
  }
}

export async function getEvent(id: string, apiUrl?: string): Promise<Event> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Evento/ObtenerEventoPorId/${id}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as Event;
  } else {
    return {} as Event;
  }
}

export async function getEventByDate(
  startDate: string,
  endDate: string,
  apiUrl?: string
): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/Evento/ObtieneEventosPorFechas?fechaInicio=${startDate}&fechaFin=${endDate}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [];
  }
}

export async function getCarrousel(apiUrl?: string): Promise<CarouselEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/primeTixApi/api/Imagen/ObtieneCarrousel`,
    baseUrl: apiUrl
  };
  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as CarouselEvent[];
  } else {
    return [];
  }
}

export async function getEventsByName(name: string, apiUrl?: string): Promise<ResumeEvent[]> {
  if (name === '') {
    return getEvents();
  }
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/Evento/ObtieneEventosPorNombre?nombre=${name}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [] as ResumeEvent[];
  }
}
