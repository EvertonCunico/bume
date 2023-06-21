import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit {

  private focus = true;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.focus) {
      // Otherwise Angular throws error: Expression has changed after it was checked.
      this.getFocus();
    }
  }

  @Input()
  set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }

  getFocus() {
    setTimeout(() => {
      this.setFocusOnElement();
    }, 100);
  }

  setFocusOnElement() {
    // For SSR (server side rendering) this is not safe.
    // Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
    const htmlEl: HTMLElement = this.el.nativeElement;
    let elFocus: any;

    switch (htmlEl.tagName) {
      case 'P-INPUTMASK':
        elFocus = htmlEl.getElementsByTagName('input')[0];
        if (elFocus) {
          elFocus.focus();
        }
        break;
      case 'APP-AUTOCOMPLETE':
        elFocus = htmlEl.getElementsByTagName('input')[0];
        if (elFocus) {
          elFocus.focus();
        }
        break;

      default:
        htmlEl.focus();
        break;
    }
    this.el.nativeElement.focus();
  }
}
