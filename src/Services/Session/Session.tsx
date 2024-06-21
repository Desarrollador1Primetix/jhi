import {ApiRequest, CreateAccountType, RequestVerbs, ResumeEvent, User} from '../../Types/Types';
import {api} from '../api';

export async function login(correo: string, contraseña: string, apiUrl?: string): Promise<User> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/securetixapi/api/Login/ValidaContrasenaLoginPrimetix?correoElectronico=${correo}&contrasena=${contraseña}`,
    baseUrl: apiUrl
  };
  // const requestParams: ApiRequest = {
  //   verb: RequestVerbs.GET,
  //   url: `/Usuario/LoginPrimetixWeb?usuario=${usuario}&contrasena=${password}`,
  //   // body: account,
  //   baseUrl: apiUrl
  // };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as User;
  } else {
    return {} as User;
  }
}

export async function createAccount(
  account: CreateAccountType,
  apiUrl?: string
): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/securetixapi/api/usuario/CrearUsuario`,
    body: account,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [] as ResumeEvent[];
  }
}

export async function generatePassword(email: string, apiUrl?: string): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.POST,
    url: `/securetixapi/api/Login/GeneraContrasenaTemporal?correoElectronico=${email}&codigoPais=1`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [] as ResumeEvent[];
  }
}

export async function validatePassword(
  email: string,
  password: string,
  apiUrl: string
): Promise<ResumeEvent[]> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/securetixapi/api/Login/ValidaContrasenaLoginPrimetix?correoElectronico=${email}&contrasena=${password}&numeroCelular=41376305`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as ResumeEvent[];
  } else {
    return [] as ResumeEvent[];
  }
}

export async function getUser(email: string, phone: string, apiUrl?: string): Promise<User> {
  const requestParams: ApiRequest = {
    verb: RequestVerbs.GET,
    url: `/securetixapi/api/usuario/ObtieneUsuario?correoElectronico=${email}&numeroCelular=${phone}`,
    baseUrl: apiUrl
  };

  const response = await api.request(requestParams);

  if (response.kind === 'ok') {
    return response.rawData as User;
  } else {
    return {} as User;
  }
}
