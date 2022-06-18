import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(private toast: ToastrService) {}

  toastMessage(title: string, msg: string, type: number = 0){
    switch (type) {
      case 2:
        this.toast.info(msg, title, {positionClass: 'toast-bottom-right'});
        break;
      case 3:
        this.toast.warning(msg, title, {positionClass: 'toast-bottom-right'});
        break;
      case 4:
        this.toast.error(msg, title, {positionClass: 'toast-bottom-right'});
        break;
      default:
        this.toast.success(msg, title, {positionClass: 'toast-bottom-right'});
        break;
    }
  }

  onMessage(title: string, msg: string) {
    Swal.fire((title.length > 1) ? title :  "PARKS APP", msg, "info");
  }
  errorMessage(title: string, msg: string) {
    Swal.fire((title.length > 1) ? title :  "Error", msg, "error");
  }

}
