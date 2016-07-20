import { SkipSelf, HostListener, Directive, Input } from '@angular/core';

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
        this.selectionArea.selectionService.selectAll();
        // run this directly after render to give child selectionAreas ability to render
        setTimeout(() => {
            if (this.recursive && this.selectionArea.childSelectionAreas) {
                this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                    if (area !== this.selectionArea) {
                        area.selectionService.selectAll();
                    }
                });
            }
        }, 0);
    }
}
