import {Renderer, Directive, ElementRef, HostListener} from '@angular/core';
@Directive({
    selector: 'input[rt-select-on-focus]'
})
export class RtSelectOnFocus {
    nativeEl: HTMLInputElement;
    renderer: Renderer;
    constructor(elementRef: ElementRef, renderer: Renderer) {
        this.nativeEl = elementRef.nativeElement;
        this.renderer = renderer;
    }
    @HostListener('focus')
    onFocus(): void {
        this.renderer.invokeElementMethod(this.nativeEl, 'select', []);
    }
}
