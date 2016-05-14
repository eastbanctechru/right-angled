import {Directive, ElementRef} from '@angular/core';
@Directive({
    host: {
        '(focus)': 'onFocus($event)'
    },
    selector: 'input[rt-select-on-focus]'
})
export class RtSelectOnFocus {
    nativeElement: HTMLInputElement;
    constructor(elementRef: ElementRef) {
        this.nativeElement = elementRef.nativeElement;
    }
    onFocus(evt: MouseEvent): void {
        this.nativeElement.select();
    }
}
