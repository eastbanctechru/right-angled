import { Component, Input } from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';

@Component({
    selector: 'rt-selection-checkbox',
    template: '<input type="checkbox" (change)="changeHandler($event)" [checked]="item.selected"/>'
})
export class RtSelectionCheckboxComponent {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('index') index: number = null;
    constructor(selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    changeHandler(evt: Event): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionManager.selectIndex(this.index, true);
        } else {
            this.selectionArea.selectionManager.deselectIndex(this.index);
        }
    }
}
