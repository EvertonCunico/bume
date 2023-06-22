import { Component, ViewChild, forwardRef, Input, ContentChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]
})
export class DatePickerComponent implements ControlValueAccessor {

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

  @ViewChild(Calendar, { static: true }) calendar: Calendar;

  @Input() exibirHora;
  @Input() exibirSegundos;

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    hourFormat: '24',
  };

  formCtrl: FormControl;

  constructor() { }

  writeValue(obj: any): void {
    this.calendar.writeValue(new Date(obj));
  }

  registerOnChange(fn: any): void {
    this.calendar.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.calendar.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.calendar.setDisabledState(isDisabled);
  }

}
