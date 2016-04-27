import {Directive, Input} from 'angular2/core';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {RtSelectionAreaFor} from './selection-area-for';
@Directive({
    host: {
        '(mouseup)': 'mouseUpHandler($event)'
    },
    selector: '[rt-selectable-item]'
})
export class RtSelectableItem {
    private selectionArea: RtSelectionAreaFor;
    @Input('rt-selectable-item') item: ISelectable;
    private index: number = null;
    constructor(selectionArea: RtSelectionAreaFor) {
        this.selectionArea = selectionArea;
    }
    mouseUpHandler(event: MouseEvent): void {
        if (this.index === null) {
            this.index = this.selectionArea.selectionManager.getItemIndex(this.item);
        }
        this.selectionArea.selectionEventsHelper.mouseHandler(event, this.index);
    }
}
