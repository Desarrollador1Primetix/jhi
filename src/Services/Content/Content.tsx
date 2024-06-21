import {ApiRequest, Publicity, RequestVerbs} from '../../Types/Types';
import {api} from '../api';

export async function getPublicity(idPais: number, apiUrl: string): Promise<Publicity[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `platformtixapi/api/Publicidad/ObtenerPublicidad?codigoPais=${idPais}`,
    baseUrl: apiUrl
  };
  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as Publicity[];
  } else {
    return [];
  }
}

export async function getTermsAndConditions(apiUrl: string): Promise<string> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/api/Content/ObtieneTerminosCondiciones`,
    baseUrl: apiUrl
  };
  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData;
  } else {
    return '';
  }
}
