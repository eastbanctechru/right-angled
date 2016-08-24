import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: 'input[rtSelectOnFocus]'
})
export class SelectOnFocusDirective {
    private nativeEl: HTMLInputElement;
    constructor(private renderer: Renderer, elementRef: ElementRef) {
        this.nativeEl = elementRef.nativeElement;
    }
    @HostListener('focus')
    public onFocus(): void {
        this.renderer.invokeElementMethod(this.nativeEl, 'select', []);
    }
}
