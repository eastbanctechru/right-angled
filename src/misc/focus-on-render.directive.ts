import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[rtFocusOnRender]'
})
export class FocusOnRenderDirective implements AfterContentInit {
    constructor(private elementRef: ElementRef) {}
    public ngAfterContentInit(): void {
        // we need set timeout for the cases when element itself is rendered by *ngIf directive and we need to wait it's rendering
        setTimeout(() => this.elementRef.nativeElement.focus(), 0);
    }
}
