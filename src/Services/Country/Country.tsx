import {ApiRequest, Country, RequestVerbs} from '../../Types/Types';
import {api} from '../api';

export async function getCountries(): Promise<Country[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/platformtixapi/api/Pais/ObtenerPaises`
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as Country[];
  } else {
    return [];
  }
}
