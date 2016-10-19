import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { RtSelectionService } from '../core/index';

@Directive({
    selector: '[rtDeselectAll]'
})
export class DeselectAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionService: RtSelectionService) {
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        this.selectionService.deselectAll(this.recursive);
    }
}
