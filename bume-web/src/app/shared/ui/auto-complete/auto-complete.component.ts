import { Component, Input, ViewChild, forwardRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControlName, FormControlDirective } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

import { PesquisaGenericaService } from '@boom/services/api/pesquisa-generica.service.ts.service';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { Modelo } from '@boom/modelos/modelo';
import { AutoCompleteModel } from './auto-complete-model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true
  }]
})
export class AutoCompleteComponent implements ControlValueAccessor {

  @ContentChild(FormControlName)
  set formControlName(formControlName: FormControlName) {
    if (formControlName) {
      this.formCtrl = formControlName.control;
    }
  }

  @ContentChild(FormControlDirective)
  set formControl(formControl: FormControlDirective) {
    if (formControl) {
      this.formCtrl = formControl.control;
    }
  }

  @ViewChild(AutoComplete, { static: true })
  autoComplete!: AutoComplete;

  @Input()
  url!: string;

  @Input()
  dataKey!: string;

  @Input()
  set label(mascara: string) {
    this.mascaraLabel = mascara ? mascara : '{id}';
    this.camposLabel = [];
    const regExp = /{(.*?)}/g;
    const campos = this.mascaraLabel.match(regExp);
    campos?.forEach(
      key => {
        const campo = key.slice(1, key.length - 1);
        this.camposLabel?.push(campo);
      }
    );
  }

  /**
   * Mínimo de caracteres que tem que ser digitado para disparar a pesquisa
   */
  @Input()
  minLength = 1;

  /**
   * Máximo de caracteres que tem que ser digitado para disparar a pesquisa
   */
  @Input()
  maxlength?: number;

  /**
   * Tempo de delay entre a digitação e a pesquisa
   */
  @Input()
  delay = 300;

  /**
   * Mensagem quando nenhum registro for encontrado
   */
  @Input()
  emptyMessage = 'Nenhum registro encontrado';

  /**
   * Permite adicionar sugestões para seleção
   */
  @Input()
  sugestoes: any[] = [];


  sugestoesFiltrado: any[] = [];


  /**
   * Função a ser executada antes da pesquisa
   * Deve retornar o evento recebido por parâmetro para disparar a pesquisa
   * Se retornar null, cancela a pesquisa
   */
  @Input()
  prePesquisar!: (event: any) => any;

  /**
   * Evento disparado quando uma pesquisa é concluída
   */
  @Output()
  pesquisaConcluida: EventEmitter<{ query: string, registros: any[] }> = new EventEmitter();

  formCtrl!: FormControl;
  desativado?: boolean;
  mascaraLabel?: string;
  camposLabel?: string[];

  constructor(private pesquisaGenericaService: PesquisaGenericaService<AutoCompleteModel>) { }

  pesquisar(event: { query: string; }) {

    event = this.prePesquisar ? this.prePesquisar(event) : event;

    if (!event) {
      this.sugestoes = [];
      return;
    }

    const requisicao = {
      pagina: 1,
      valor: event.query,
      url: this.url,
      origem: 'AUTOCOMPLETE'
    } as RequisicaoPesquisa;

    this.pesquisaGenericaService.pesquisar(requisicao).subscribe(
      resultado => {
        if (resultado.data) {
          this.sugestoes = resultado.data.map(
            item => {
              item.autoCompleteLabel = this.buildLabel(item);
              return item;
            }
          );
        }

        this.sugestoesFiltrado = [];
        if (!event) {
          return;
        }
        let filtro : any[] = [];
        this.sugestoes.map(item => {
          item.autoCompleteLabel = this.buildLabel(item);
          if (item.autoCompleteLabel.toLowerCase().indexOf(event.query.toLowerCase()) > -1) {
            filtro.push(item);
          }
          return item;
        });
        this.sugestoesFiltrado = filtro;
        this.pesquisaConcluida.emit({
          query: event.query,
          registros: this.sugestoesFiltrado
        });
      },
      erro => {
        this.sugestoes = [];
        this.pesquisaConcluida.emit({
          query: event.query,
          registros: []
        });
      }
    );
  }

  isNumber(n: string) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  buildLabel(item: Modelo): any {
    if (!item) {
      return '';
    }
    let label = this.mascaraLabel;
    this.camposLabel?.forEach(
      campo => {
        const indicePonto = campo.indexOf('.');
        const primeiraPalavra = campo.substring(0, indicePonto).trim();
        const segundaPalavra = campo.substring(indicePonto + 1).trim();
        //label = label.replace('{' + campo + '}',primeiraPalavra === '' ? item[campo] : item[primeiraPalavra][segundaPalavra]) ;
        //TODO - Corrigir label
      }
    );
    return label;
  }

  writeValue(obj: any): void {
    if (obj === '') {
      obj = undefined;
    } else if (obj) {
      obj.autoCompleteLabel = this.buildLabel(obj);
    }
    this.autoComplete.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.autoComplete.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.autoComplete.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.desativado = isDisabled;
    this.autoComplete.setDisabledState(isDisabled);
  }

  /**
   * Call when value has changed programmatically
   */
  public onChange(newVal: any) {

  }

  public onTouched(_?: any) {

  }

  get value(): any {
    return this.autoComplete.value;
  }

  set value(v: any) {
    this.autoComplete.value = v;
  }

}
