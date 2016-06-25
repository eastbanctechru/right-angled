import {SkipSelf, HostListener, Directive, Input, Host} from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';
@Directive({
    selector: '[rt-select-all]'
})
export class RtSelectAllDirective {
    private selectionArea: RtSelectionAreaForDirective;
    @Input() recursive: boolean = true;
    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    @HostListener('click')
    clickHandler(event: MouseEvent): void {
        this.selectionArea.selectionManager.selectAll();
        setTimeout(() => {
            if (this.recursive && this.selectionArea.childSelectionAreas) {
                this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                    if (area !== this.selectionArea) {
                        area.selectionManager.selectAll();
                    }
                });
            }
        }, 0);
    }
}
