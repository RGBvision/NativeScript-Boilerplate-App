import * as Https from '@nativescript-community/https';
import {ApplicationSettings, Device} from '@nativescript/core';
import {DeviceInfo} from 'nativescript-dna-deviceinfo';
import {localize} from "@nativescript/localize";

export class API {

  private static request(http_method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD', api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return new Promise((resolve, reject) => {

      let query_string, uri;

      if ((http_method === 'GET') && params) {
        const esc = encodeURIComponent;
        query_string = Object.keys(params)
          .map(k => esc(k) + '=' + esc(params[k]))
          .join('&');
        uri = [api_function, query_string].join('?');
      } else {
        uri = api_function;
      }

      Https.request({
        url: `https://rgbvision.pro/api/${uri}`,
        method: http_method,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `RGBvision Mobile App (Platform: ${Device.os} / App version: ${DeviceInfo.appVersion()})`,
          "Accept-Language": ApplicationSettings.getString('user_lang', Device.language),
          "Timezone": DeviceInfo.timezone(),
          "Auth": ApplicationSettings.getString('auth_token', '')
        },
        allowLargeResponse: true,
        timeout: 30,
        body: http_method === 'GET' ? {} : params
      })
        .then(
          (response) => {

            const content = response.content.toJSON();

            if (response.statusCode === 200) {
              resolve(content);
            } else {
              reject(content.message || content.body?.message || localize('api.server_response_error'));
            }

          },

          (reason) => {
            reject(localize('api.server_error') || reason);
          }

        );
    });
  }

  public static get(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('GET', api_function, params);
  }

  public static post(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('POST', api_function, params);
  }

  public static put(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('PUT', api_function, params);
  }

  public static delete(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('DELETE', api_function, params);
  }

  public static patch(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('PATCH', api_function, params);
  }

  public static head(api_function: string, params?: Https.HttpsRequestObject | Https.HttpsFormDataParam[]): Promise<any> {
    return this.request('HEAD', api_function, params);
  }
}
