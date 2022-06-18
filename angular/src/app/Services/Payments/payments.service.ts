import { Injectable } from '@angular/core';
import {Payments} from "../../Contracts/Payments/payments";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor() { }
  read(): Payments[] {
    return [
      {
        id: 1,
        name_payment_method: 'Efectivo',
        tag_method: '001'
      },{
        id: 2,
        name_payment_method: 'Tarjeta',
        tag_method: '002'
      },{
        id: 3,
        name_payment_method: 'Transferencia',
        tag_method: '003'
      },{
        id: 4,
        name_payment_method: 'Crédito con anticipo',
        tag_method: '004'
      },{
        id: 5,
        name_payment_method: 'Crédito sin anticipo',
        tag_method: '005'
      }
    ]
  }
}
