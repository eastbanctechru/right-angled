import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[rtSelectOnFocus]'
})
export class SelectOnFocusDirective {
    private nativeEl: HTMLInputElement;
    constructor(public renderer: Renderer, elementRef: ElementRef) {
        this.nativeEl = elementRef.nativeElement;
    }
    @HostListener('focus')
    public onFocus(): void {
        this.renderer.invokeElementMethod(this.nativeEl, 'select', []);
    }
}
