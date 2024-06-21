import {ApiResponse} from 'apisauce';

export interface apiError {
  message: string;
  type: string;
  timestamp: Date;
  path: string;
  method: string;
}

type errors =
  | 'AuthenticationNotVerified' //   *Not authenticated
  | 'timeout' //    * Times up.
  | 'cannot-connect' //    * Cannot connect to the server for some reason.
  | 'server' //    * The server experienced a problem. Any 5xx error.
  | 'unauthorized' //    * We're not allowed because we haven't identified ourself. This is 401.
  | 'forbidden' //    * We don't have access to perform that request. This is 403.
  | 'not-found' //    * Unable to find that resource.  This is a 404.
  | 'rejected' //    * All other 4xx series errors.
  | 'bad-data' //    * The data we received is not in the expected format.
  | 'unknown' //    * Something truly unexpected happened. Most likely can try again. This is a catch all.
  | 'ViolationsRemittanceError' //    * User has passed Remittance  anti-fraud limit
  | 'ViolationsMerchantError' //    * User has passed QR P2M  anti-fraud limit
  | 'ViolationsP2pError' //    * User has passed P2P anti-fraud limit
  | 'AlreadyLinkedAccountError'
  | 'InvitationCodeNotAvailable';

export interface GeneralApiProblem {
  kind: errors;
  temporary?: boolean;
  message: string;
  error?: apiError;
  mappedErrorType?: string;
}

// /**
//  * Attempts to get a common cause of problems from an api response.
//  *
//  * @param response The api response.
//  * @todo: Refactor this code to have generic error handling
//  */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return {kind: 'cannot-connect', temporary: true, message: 'Cannot connect'};
    case 'NETWORK_ERROR':
      return {kind: 'cannot-connect', temporary: true, message: 'Cannot connect'};
    case 'TIMEOUT_ERROR':
      return {kind: 'timeout', temporary: true, message: 'Time out'};
    case 'SERVER_ERROR':
      switch (response.status) {
        case 504:
          return {kind: 'timeout', temporary: true, message: 'Time out'};
        default:
          return {kind: 'server', message: 'Server error'};
      }
    case 'UNKNOWN_ERROR':
      return {kind: 'unknown', temporary: true, message: 'Unknown error'};
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 400:
          const error: apiError = response.data.error;
          if (response.data?.error?.type === 'InvitationCodeNotAvailable') {
            return {
              kind: 'InvitationCodeNotAvailable',
              message: error.message,
              error: error,
              mappedErrorType: error.type
            };
          }
          if (response.data?.error) {
            return {
              kind: 'AuthenticationNotVerified',
              message: error.message,
              error: error,
              mappedErrorType: error.type
            };
          } else {
            return {kind: 'rejected', message: ''};
          }
        case 401:
          return {kind: 'unauthorized', message: 'UnAuthorized'};
        case 403:
          return {kind: 'forbidden', message: 'Forbidden'};
        case 404:
          return {kind: 'not-found', message: 'Not Found'};
        case 409:
          if (response.data?.error) {
            const error: apiError = response.data.error;
            return {
              kind: 'AlreadyLinkedAccountError',
              message: error.message,
              error: error
            };
          } else {
            return {kind: 'rejected', message: 'Rejected'};
          }
        default:
          return {kind: 'rejected', message: 'Rejected'};
      }
    case 'CANCEL_ERROR':
      return;
  }
}
