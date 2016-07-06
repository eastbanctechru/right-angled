import { HostListener, HostBinding, SkipSelf, Directive, Input } from '@angular/core';
import { RtSelectionAreaForDirective } from './selection-area-for.directive';

@Directive({
    selector: 'input[rt-selection-checkbox-for]'
})
export class RtSelectionCheckboxForDirective {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('rt-selection-checkbox-for') public index: number = null;
    constructor( @SkipSelf() selectionArea: RtSelectionAreaForDirective) {
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
