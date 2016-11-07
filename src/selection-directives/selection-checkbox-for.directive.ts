import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { SkipSelf } from '@angular/core';

import { RtSelectionEvent } from '../core/selection/selection-event';
import { SelectionEventsEmitter } from '../core/selection/selection-events-emitter';
import { RtSelectionService } from '../core/selection/selection-service';

@Directive({
    exportAs: 'rtSelectionCheckboxFor',
    /* tslint:disable-next-line:directive-selector-name directive-selector-type directive-selector-prefix */
    selector: 'input[rtSelectionCheckboxFor]'
})
export class SelectionCheckboxForDirective implements SelectionEventsEmitter {
    public index: number = null;
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtSelectionCheckboxFor') public item: any = null;
    @Output() public itemSelected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public itemDeselected: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();
    @Output() public selectionChanged: EventEmitter<RtSelectionEvent> = new EventEmitter<RtSelectionEvent>();

    constructor( @SkipSelf() private selectionService: RtSelectionService) {
    }

    @HostBinding('checked')
    public get isChecked(): boolean {
        return this.selectionService.isIndexSelected(this.index);
    }
    @HostListener('change', ['$event.target.checked'])
    public changeHandler(isChecked: boolean): void {
        if (isChecked) {
            this.selectionService.selectIndex(this.index, true);
        } else {
            this.selectionService.deselectIndex(this.index);
        }
    }
}
