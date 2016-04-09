import {Directive, ElementRef, Input} from 'angular2/core';
import {Defaults} from 'e2e4/src/common/defaults';
@Directive({
    selector: '[e2e4-sort]'
})
export class E2E4Sort {
    constructor(el: ElementRef) {
        el.nativeElement.classList.add(Defaults.sortAttribute.sortableClassName);
    }
}
