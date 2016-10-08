import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaDirective } from './selection-area.directive';

@Directive({
    selector: '[rtDeselectAll]'
})
export class DeselectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaDirective) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionArea.deselectAllItems(this.recursive);
    }
}
