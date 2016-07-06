import { HostListener, HostBinding, SkipSelf, Directive, Input } from '@angular/core';

import { SelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: 'input[rtSelectionCheckboxFor]'
})
export class SelectionCheckboxForDirective {
    private selectionArea: SelectionAreaForDirective;
    @Input('rtSelectionCheckboxFor') public index: number = null;
    constructor( @SkipSelf() selectionArea: SelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }

    @HostBinding('checked')
    public get isChecked(): boolean {
        return this.index !== null && this.selectionArea.selectionService.itemsSource[this.index] && this.selectionArea.selectionService.itemsSource[this.index].selected;
    }
    @HostListener('change', ['$event'])
    public changeHandler(evt: MouseEvent): void {
        if ((evt.target as HTMLInputElement).checked) {
            this.selectionArea.selectionService.selectIndex(this.index, true);
        } else {
            this.selectionArea.selectionService.deselectIndex(this.index);
        }
    }
}
