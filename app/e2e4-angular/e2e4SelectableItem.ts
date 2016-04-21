import {Directive, Input} from 'angular2/core';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {E2E4SelectionArea} from './e2e4SelectionArea';
@Directive({
    host: {
        '(mouseup)': 'mouseUpHandler($event)'
    },
    selector: '[e2e4-selectable-item]'
})
export class E2E4SelectableItem {
    private selectionArea: E2E4SelectionArea;
    @Input('e2e4-selectable-item') item: ISelectable;
    private index: number = null;
    constructor(selectionArea: E2E4SelectionArea) {
        this.selectionArea = selectionArea;
    }
    mouseUpHandler(event: MouseEvent): void {
        if (this.index === null) {
            this.index = this.selectionArea.selectionManager.getItemIndex(this.item);
        }
        this.selectionArea.selectionEventsHelper.mouseHandler(event, this.index);
    }
}
