import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngxOutsideClick]'
})
export class OutsideClickDirective implements OnInit, OnChanges {
  @Output() ngxOutsideClick = new EventEmitter<MouseEvent>();
  @Input() ngxOutsideClickEnabled = true;
  
  private cancelListener: Function | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.ngxOutsideClickEnabled) {
      this.listenDocumentClick();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ngxOutsideClickEnabled) {
      if (changes.ngxOutsideClickEnabled.currentValue) {
        this.listenDocumentClick();
      } else if(this.cancelListener) {
        this.cancelListener();
        delete this.cancelListener;
      }
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.ngxOutsideClick.emit(event);
    }
  }

  private listenDocumentClick() {
    if (typeof this.cancelListener === 'undefined') {
      this.cancelListener = this.renderer.listen(document, 'click', (event: MouseEvent) => this.onDocumentClick(event));
    }
  }
}
