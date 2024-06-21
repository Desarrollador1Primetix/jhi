/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {ApiRequest} from '../Types/Types';
import type {ApiConfig} from './api.types';
import {getGeneralApiProblem} from './apiProblem';

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: 'https://api2.primetix.fun',
  timeout: 15000
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json'
      }
    });

    this.apisauce;
  }

  async request(params: ApiRequest) {
    const {verb, url, body, baseUrl, headers} = params;

    const base = baseUrl || this.config.url;

    this.apisauce.setBaseURL(base);

    const config: any = {headers: {}};

    if (headers) {
      for (const key in headers) {
        config.headers[key] = headers[key];
      }
    }

    const response: ApiResponse<any> = await this.apisauce[verb](url, body, config);

    if (response.status === 401) {
      //   await SecureStore.deleteItemAsync('bearerAccessToken');
    }

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);

      if (problem) return problem;
    }

    try {
      const rawData = response.status !== 206 ? response.data : {data: response.data};
      return {kind: 'ok', rawData};
    } catch (e: any) {
      //   if (__DEV__) {
      console.log(`Bad data: ${e.message}\n${response.data}\n${JSON.stringify(e.stack)}`);
      //   }
      return {kind: false, rawData: null};
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
