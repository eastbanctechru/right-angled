import {Renderer, Directive, ElementRef, HostListener} from '@angular/core';
@Directive({
    /* tslint:disable:directive-selector-prefix */
    selector: 'input[rt-select-on-focus]'
    /* tslint:ensable:directive-selector-prefix */
})
export class RtSelectOnFocusDirective {
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
