import { AfterViewInit, Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: 'input[rtFocusOnRender]'
})
export class FocusOnRenderDirective  implements AfterViewInit{
    private nativeEl: HTMLInputElement;
    constructor(private renderer: Renderer, elementRef: ElementRef) {
        this.nativeEl = elementRef.nativeElement;
    }
    public ngAfterViewInit(): void {
        console.log('focus');
        this.renderer.invokeElementMethod(this.nativeEl, 'focus');
    }
}
