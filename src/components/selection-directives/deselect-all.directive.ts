import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: '[rtDeselectAll]'
})
export class DeselectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionArea.deselectAllItems(this.recursive);
    }
}
