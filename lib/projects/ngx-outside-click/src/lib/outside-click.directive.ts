import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxOutsideClick]'
})
export class OutsideClickDirective {
  @Output() ngxOutsideClick = new EventEmitter<MouseEvent>();
  @Input() ngxOutsideClickEnabled = true;
  
  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.ngxOutsideClick.emit(event);
    }
  }

}
