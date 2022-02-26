import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  postRequestObservable<T>(url: string, reqBody: any, reqParams?: HttpParams, reqHeaders?: HttpHeaders) {
    return this.httpClient.post<T>(url, reqBody, { params: reqParams, headers: reqHeaders });
  }

  getRequestObservable<T>(url: string, reqParams?: HttpParams, reqHeaders?: HttpHeaders) {
    return this.httpClient.get<T>(url, { params: reqParams, headers: reqHeaders });
  }
}
