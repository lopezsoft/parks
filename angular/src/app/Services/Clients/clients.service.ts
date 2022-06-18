import { Injectable } from '@angular/core';
import { HttpServerService } from 'app/utils';
import {Clients} from "../../Contracts/Clients/clients";
import {Observable} from "rxjs";
import {JsonResponse} from "../../utils/json-response.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpServerService) { }

  all(): Observable<Clients[]> {
      return this.http.get('/clients/all')
          .pipe(map((resp: JsonResponse) => {
            return resp.records;
          }));
  }

  read(query: string = null, start: number = 0): Observable<Clients[]> {
      const params  = {
          type: 3,
          query: query,
          start: start,
          page: 1,
          limit: 30
      };
      return this.http.get('/master/getusers', params)
          .pipe(map((resp: JsonResponse) => {
            return resp.records;
          }));
  }
}
