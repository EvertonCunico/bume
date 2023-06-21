import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidations {

    validar(control: AbstractControl): boolean {
      control.markAsTouched();
      control.updateValueAndValidity();
      if (control instanceof FormGroup || control instanceof FormArray) {
        Object.keys(control.controls).forEach(
          key => {
              this.validar((control as any).controls[key]);
          }
        );
      }
      return control.valid;
    }

    verificarObrigatoriedade(control: AbstractControl): boolean {
      if (!control) {
        return false;
      }
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator['required']) {
          return true;
        }
      }
      if ((control instanceof FormGroup || control instanceof FormArray) && control.controls) {
        for (const controlName in control.controls) {
          if ((control as any).controls[controlName]) {
            if (this.verificarObrigatoriedade((control as any).controls[controlName])) {
              return true;
            }
          }
        }
      }
      return false;
    }

}
