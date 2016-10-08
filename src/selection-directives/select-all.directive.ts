import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaDirective } from './selection-area.directive';

@Directive({
    selector: '[rtSelectAll]'
})
export class SelectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaDirective) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionArea.selectAllItems(this.recursive);
    }
}
