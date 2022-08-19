import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[ImageLoadHandler]',
})
export class ImageLoadHandlerDirective {
  @Input() defaultSrc = '';

  constructor(private _el: ElementRef) {}

  @HostListener('error') onError() {
    if (this.defaultSrc) {
      this._el.nativeElement.src = this.defaultSrc;
    }
  }
}
