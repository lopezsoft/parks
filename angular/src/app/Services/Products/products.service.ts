import { Injectable } from '@angular/core';
import { HttpServerService } from 'app/utils';
import {Observable} from "rxjs";
import {Products} from "../../Contracts/Products/products";
import {map} from "rxjs/operators";
import {JsonResponse} from "../../utils/json-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpServerService){}

  read(): Observable<Products[]> {
      return this.http.get('/master/getproducts', {
          type: 1,
          branch: 1
      })
          .pipe(map ((resp: JsonResponse) => {
              return resp.records;
          }));
  }
}
