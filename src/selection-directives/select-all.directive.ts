import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { RtSelectionService } from '../core/index';

@Directive({
    selector: '[rtSelectAll]'
})
export class SelectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionService: RtSelectionService) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionService.selectAllItems(this.recursive);
    }
}
