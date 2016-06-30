import { SkipSelf, HostListener, Directive, Input, Host } from '@angular/core';
import { RtSelectionAreaForDirective } from './selection-area-for';
@Directive({
    selector: '[rt-deselect-all]'
})
export class RtDeselectAllDirective {
    private selectionArea: RtSelectionAreaForDirective;
    @Input() public recursive: boolean = true;
    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    @HostListener('click')
    public clickHandler(event: MouseEvent): void {
        if (this.recursive && this.selectionArea.childSelectionAreas) {
            this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                if (area !== this.selectionArea) {
                    area.selectionManager.deselectAll();
                }
            });
        }
        this.selectionArea.selectionManager.deselectAll();
    }
}