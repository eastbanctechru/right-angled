import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: 'input[rtCheckAll]'
})
export class CheckAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaForDirective) {
    }

    @HostListener('change', ['$event'])
    public changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectAllItems(this.recursive);
        } else {
            this.selectionArea.deselectAllItems(this.recursive);
        }
    }
}
