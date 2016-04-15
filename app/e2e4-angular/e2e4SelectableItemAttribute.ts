import {Directive, Input} from 'angular2/core';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {E2E4SelectionArea} from './e2e4SelectionArea';
@Directive({
    host: {
        '(mouseup)': 'mouseUpHandler($event)'
    },
    selector: '[e2e4-selectable-item]'
})
export class E2E4SelectableItemAttribute {
    private selectionArea: E2E4SelectionArea;
    @Input() index: number;
    @Input() item: ISelectable;
    constructor(selectionArea: E2E4SelectionArea) {
        this.selectionArea = selectionArea;
    }
    mouseUpHandler(event: MouseEvent): void {
        this.selectionArea.selectionEventsHelper.mouseHandler(event, this.index, this.item);
    }
}
