import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from 'app/auth/models';
import {environment} from "../../environments/environment";
import {JsonResponse} from "./json-response.interface";

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get appUrl(): string {
    return this._appUrl;
  }

  set appUrl(value: string) {
    this._appUrl = value;
  }
  public currentUser: User;
  private _url: string;
  private _appUrl: string;
  constructor(private http: HttpClient) {
    this._url    = environment.apiUrl;
    this._appUrl = environment.appUrl;
  }

  protected getHeaders(): HttpHeaders{
    return  new HttpHeaders({timeout: `${36000}`})
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  }

  openDocument(url: string) {
    window.open(url, '_blank');
  }

  delete(query: string, params: any = {}) {
    return this.http.delete<JsonResponse>(`${ this._url }${ query }`, { headers : this.getHeaders(), params });
  }

  post(query: string, body: any = {}, token: boolean = false) {
    return this.http.post<JsonResponse>(`${ this._url }${ query }`, body, { headers : this.getHeaders()});
  }

  put(query: string, body: any, token: boolean = false) {
    return this.http.put<JsonResponse>(`${ this._url }${ query }`, body, { headers : this.getHeaders()});
  }

  get(query: string, exParams: any = {}) {
    return this.http.get<JsonResponse>(`${this._url}${ query }`, { headers : this.getHeaders(), params: exParams });
  }

}

