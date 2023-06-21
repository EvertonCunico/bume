import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';

import { Coluna } from '@boom/modelos/coluna';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { ObjetctUtils } from '../../utils/object-utils';

@Pipe({
  name: 'campo'
})
export class CampoPipe implements PipeTransform {

  constructor(private datePipe: DatePipe,
              private decimalPipe: DecimalPipe,
              private currencyPipe: CurrencyPipe) { }

  transform(value: any, coluna: Coluna): string {
    if (!value && value !== 0) {
      return '';
    }
    value = coluna.propriedade ? ObjetctUtils.getValorPropriedade(value, coluna.propriedade) : value;
    let valor = value;
    switch (coluna.tipo) {
      case TiposCampo.DATA:
        valor = this.datePipe.transform(value, 'dd/MM/yyyy');
        break;
      case TiposCampo.DATAHORA:
        valor = this.datePipe.transform(value, 'dd/MM/yyyy H:mm:ss');
        break;
      case TiposCampo.HORA:
        valor = this.datePipe.transform(value, 'H:mm:ss');
        break;
      case TiposCampo.MOEDA:
        valor = this.currencyPipe.transform(value, 'R$ ')?.replace('.', ',');
        break;
      case TiposCampo.OBJETO:
        valor = this.getValoresObjeto(value, coluna);
        break;
      case TiposCampo.ENUM:
        valor = this.getValoresEnum(value, coluna);
        break;
    }
    if (coluna.mascara) {
      valor = this.formatarComMascara(valor, coluna.mascara);
    }
    return valor;
  }

  private getValoresEnum(value: any, coluna: Coluna): string {
    return coluna.opcoes ? coluna.opcoes[value] : value;
  }

  private formatarComMascara(value: string, pattern: string) {
    let i = 0;
    const v = value;
    return pattern.replace(/#/g, _ => v[i++]).replaceAll('undefined', '');
  }

  private getValoresObjeto(value: any, coluna: Coluna): string {
    if (coluna.propriedades) {
      const valores: any[] = [];
      coluna.propriedades.forEach(
        prop => {
          const v = ObjetctUtils.getValorPropriedade(value, prop);
          if (v) {
            valores.push(v);
          }
        }
      );
      return valores.join(' - ');
    } else {
      return value;
    }
  }

}
