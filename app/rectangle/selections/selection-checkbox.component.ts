import { Component, Input, OnInit } from 'angular2/core';
import {SelectionAreaForDirective} from './selection-area-for.directive';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';

@Component({
    selector: 'rt-selection-checkbox',
    template: '<input type="checkbox" (change)="changeHandler($event)" [checked]="item.selected"/>'
})
export class SelectionCheckboxComponent implements OnInit {
    private selectionArea: SelectionAreaForDirective;
    @Input('for') item: ISelectable;
    private index: number = null;
    constructor(selectionArea: SelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    ngOnInit(): void {
        if (this.item.selected === undefined) {
            throw new Error('Binded item hasn\'t \'selected\' property and can\'t be used to match ISelectable interface');
        }
    }

    changeHandler(evt: Event): void {
        if (this.index === null) {
            this.index = this.selectionArea.selectionManager.getItemIndex(this.item);
        }
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionManager.selectIndex(this.index, true);
        } else {
            this.selectionArea.selectionManager.deselectIndex(this.index);
        }
    }
}
