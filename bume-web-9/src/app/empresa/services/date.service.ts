import { Injectable } from '@angular/core';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  mensagemService: MensagemService;

  getDataFromString(str: string): Date {
    let strData = '';
    let data: Date;
    if (str) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== '/') {
          strData = strData + str[i];
        }
      }
      data = new Date(strData.substring(4, 8) + '-' + strData.substring(2, 4) + '-' + strData.substring(0, 2) + ' 00:00:00');
      if (!moment(data, 'YYYY-MM-DD', true).isValid()) {
        this.mensagemService.notificarErro({assunto: 'Atenção!', detalhes: 'Data inválida!'});
      } else {
        return data;
      }
    } else {
      return null;
    }
  }

  getTimeFromString(str: string): Date {
    let strData = '';
    let data: Date;
    if (str) {
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== ':') {
          strData = strData + str[i];
        }
      }
      data = new Date('1899-01-01 '+strData.substring(0,2) + ':' + strData.substring(2, 4) + ':00 GMT-0300');
      if (!moment(data, 'YYYY-MM-DD', true).isValid()) {
        this.mensagemService.notificarErro({assunto: 'Atenção!', detalhes: 'Hora inválida!'});
      } else {
        return data;
      }
    } else {
      return null;
    }
  }

  toTime(timeString) {
    if (timeString) {
      const data = new Date();
      data.setHours(timeString[0] + timeString[1], timeString[2] + timeString[3], 0, 0);
      return data;
    } else {
      return null;
    }
  }
}
