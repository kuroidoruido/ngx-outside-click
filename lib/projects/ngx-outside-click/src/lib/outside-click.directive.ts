import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngxOutsideClick]'
})
export class OutsideClickDirective implements OnInit, OnChanges {
  @Input() ngxOutsideClickEnabled = true;
  @Output() ngxOutsideClick = new EventEmitter<MouseEvent>();
  @Output() ngxOutsideClickInstance = new EventEmitter<OutsideClickDirective>();
  
  cancelListener: Function | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit(): void {
    this.ngxOutsideClickInstance.emit(this);
    if (this.ngxOutsideClickEnabled) {
      this.listenDocumentClick();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ngxOutsideClickEnabled) {
      if (changes.ngxOutsideClickEnabled.currentValue) {
        this.listenDocumentClick();
      } else {
        this.cancelListening();
      }
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.ngxOutsideClick.emit(event);
    }
  }

  cancelListening(): void {
    if (this.cancelListener) {
      this.cancelListener();
      delete this.cancelListener;
    }
  }

  private listenDocumentClick() {
    if (typeof this.cancelListener === 'undefined') {
      this.cancelListener = this.renderer.listen(document, 'click', (event: MouseEvent) => this.onDocumentClick(event));
    }
  }
}
