import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule as PrimeNGCalendarModule } from 'primeng/calendar';

import { DatePickerComponent } from './date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGCalendarModule
  ]
})
export class DatePickerModule { }
