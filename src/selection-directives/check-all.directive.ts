import { Directive, HostListener, Input, SkipSelf } from '@angular/core';

import { RtSelectionService } from '../core/index';

@Directive({
    selector: 'input[rtCheckAll]'
})
export class CheckAllDirective {
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() private selectionService: RtSelectionService) {
    }

    @HostListener('change', ['$event'])
    public changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionService.selectAll(this.recursive);
        } else {
            this.selectionService.deselectAll(this.recursive);
        }
    }
}
