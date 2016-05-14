import { Component, Input } from '@angular/core';
import {RtSelectionAreaFor} from './selection-area-for';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';

@Component({
    selector: 'rt-selection-checkbox',
    template: '<input type="checkbox" (change)="changeHandler($event)" [checked]="item.selected"/>'
})
export class RtSelectionCheckbox {
    private selectionArea: RtSelectionAreaFor;
    @Input('index') index: number = null;
    constructor(selectionArea: RtSelectionAreaFor) {
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
