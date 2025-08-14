import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[rtSelectOnFocus]',
    standalone: false
})
export class SelectOnFocusDirective {
    constructor(private elementRef: ElementRef) {}
    @HostListener('focus')
    public onFocus(): void {
        this.elementRef.nativeElement.select([]);
    }
}
