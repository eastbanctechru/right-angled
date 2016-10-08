import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { SelectionAreaDirective } from './selection-area.directive';

@Directive({
    selector: 'input[rtCheckAll]'
})
export class CheckAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionArea: SelectionAreaDirective) {
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
