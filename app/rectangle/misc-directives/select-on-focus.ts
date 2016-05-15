import {Directive, ElementRef, HostListener} from '@angular/core';
@Directive({
    selector: 'input[rt-select-on-focus]'
})
export class RtSelectOnFocus {
    nativeElement: HTMLInputElement;
    constructor(elementRef: ElementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    @HostListener('focus')
    onFocus(): void {
        this.nativeElement.select();
    }
}
