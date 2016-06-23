import { HostListener, HostBinding, SkipSelf, Directive, Input } from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';
import {ISelectable} from 'e2e4';

@Directive({
    selector: 'input[rt-selection-checkbox-for]'
})
export class RtSelectionCheckboxForComponent {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('rt-selection-checkbox-for') index: number = null;
    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }

    @HostBinding('checked')
    get isChecked(): boolean {
        return this.index !== null && this.selectionArea.selectionManager.itemsSource[this.index] && this.selectionArea.selectionManager.itemsSource[this.index].selected;
    }
    @HostListener('change', ['$event'])
    changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionManager.selectIndex(this.index, true);
        } else {
            this.selectionArea.selectionManager.deselectIndex(this.index);
        }
    }
}
