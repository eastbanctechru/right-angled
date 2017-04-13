import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[rtSelectOnFocus]'
})
export class SelectOnFocusDirective {
    constructor(public renderer: Renderer, private elementRef: ElementRef) {
    }
    @HostListener('focus')
    public onFocus(): void {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'select', []);
    }
}
