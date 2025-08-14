import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  alert(message: string) {
    alertify.alert(message);
  }

  confirm(message: string, okCallback: () => void) {
    alertify.confirm(message, (e: any) => {
      if (e) okCallback();
    });
  }
}