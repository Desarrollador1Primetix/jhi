import moment from 'moment';
import {
  ApiRequest,
  RegisterSaleRequestType,
  RequestVerbs,
  ResponsePayment
} from '../../Types/Types';
import {api} from '../api';

export async function registerPayment(
  amount: number,
  apiUrl?: string
): Promise<ResponsePayment | null> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/PaymentTixApi/api/Pago/RegistraPago`,
    body: {
      codigo: 0,
      codigoMetodo: 1,
      fecha: moment().format('YYYY-MM-DDTHH:mm:ss'),
      monto: amount,
      estado: '',
      transaccionPasarela: '',
      detalle: ''
    },
    baseUrl: apiUrl
  };
  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData;
  } else {
    return null;
  }
}

export async function registerSale(
  body: RegisterSaleRequestType,
  apiUrl?: string
): Promise<string> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/PaymentTixApi/api/Venta/RegistraVenta`,
    body,
    baseUrl: apiUrl
  };
  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData;
  } else {
    return '';
  }
}
