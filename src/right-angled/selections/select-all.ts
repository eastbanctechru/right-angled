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
    mouseUpHandler(event: MouseEvent): void {
        this.selectionArea.selectionManager.selectAll();
        debugger;
        if (this.recursive && this.selectionArea.childSelectionAreas) {
            this.selectionArea.childSelectionAreas.toArray().forEach(area => area.selectionManager.selectAll());
        }
    }
}
