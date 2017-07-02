import { AfterContentInit, Directive, ElementRef, Renderer } from "@angular/core";

@Directive({
    selector: "[rtFocusOnRender]"
})
export class FocusOnRenderDirective implements AfterContentInit {
    constructor(public renderer: Renderer, private elementRef: ElementRef) {}
    public ngAfterContentInit(): void {
        // we need set timeout for the cases when element itself is rendered by *ngIf directive and we need to wait it's rendering
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement, "focus"), 0);
    }
}
