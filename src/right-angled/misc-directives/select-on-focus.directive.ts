import { Renderer, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[rtSelectOnFocus]'
})
export class SelectOnFocusDirective {
    private nativeEl: HTMLInputElement;
    private renderer: Renderer;
    constructor(elementRef: ElementRef, renderer: Renderer) {
        this.nativeEl = elementRef.nativeElement;
        this.renderer = renderer;
    }
    @HostListener('focus')
    public onFocus(): void {
        this.renderer.invokeElementMethod(this.nativeEl, 'select', []);
    }
}
