import { AfterContentInit, ElementRef } from '@angular/core';
export declare class FocusOnRenderDirective implements AfterContentInit {
    private elementRef;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
}
