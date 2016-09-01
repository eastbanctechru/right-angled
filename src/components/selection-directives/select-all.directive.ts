import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: '[rtSelectAll]'
})
export class SelectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionArea.selectAllItems(this.recursive);
    }
}
