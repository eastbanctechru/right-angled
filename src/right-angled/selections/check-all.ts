import { HostListener, HostBinding, SkipSelf, Directive, Input } from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';
import {ISelectable} from 'e2e4';

@Directive({
    selector: 'input[rt-check-all]'
})
export class RtCheckAllDirective {
    private selectionArea: RtSelectionAreaForDirective;
    @Input() recursive: boolean = true;
    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }

    @HostListener('change', ['$event'])
    changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionManager.selectAll();
            setTimeout(() => {
                if (this.recursive && this.selectionArea.childSelectionAreas) {
                    this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                        if (this.selectionArea !== area) {
                            area.selectionManager.selectAll();
                        }
                    });
                }
            }, 0);

        } else {
            if (this.recursive && this.selectionArea.childSelectionAreas) {
                this.selectionArea.childSelectionAreas.toArray().forEach(area => {
                    if (this.selectionArea !== area) {
                        area.selectionManager.deselectAll();
                    }
                });
            }
            this.selectionArea.selectionManager.deselectAll();
        }
    }
}
