import {Directive, Input} from '@angular/core';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {RtSelectionAreaFor} from './selection-area-for';
@Directive({
    host: {
        '(mouseup)': 'mouseUpHandler($event)'
    },
    selector: '[rt-select-by-index]'
})
export class RtSelectByIndex {
    private selectionArea: RtSelectionAreaFor;
    @Input('rt-select-by-index') index: number = null;
    constructor(selectionArea: RtSelectionAreaFor) {
        this.selectionArea = selectionArea;
    }
    mouseUpHandler(event: MouseEvent): void {
        this.selectionArea.selectionEventsHelper.mouseHandler(event, this.index);
    }
}
