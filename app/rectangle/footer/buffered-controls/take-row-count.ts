import {Component} from 'angular2/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';
import {MISC_DIRECTIVES} from '../../misc-directives';

@Component({
    directives: [MISC_DIRECTIVES],
    selector: 'rt-take-row-count',
    template: '<input rt-select-on-focus type="text" class="form-control" maxlength="3" (keyup.enter)="onEnter($event)" [(ngModel)]="rowCount"/>'
})
export class RtTakeRowCount {
    bufferedListService: NgBufferedListService;
    private innerRowCount: number;
    get rowCount(): number {
        return this.innerRowCount;
    }
    set rowCount(value: number) {
        this.innerRowCount = value;
        this.bufferedListService.takeRowCount = value;
        setTimeout(() => this.innerRowCount = this.bufferedListService.takeRowCount);
    }
    constructor(listHost: RtList) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-take-row-count] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
        this.innerRowCount = this.bufferedListService.takeRowCount;
    }
    onEnter(evt: KeyboardEvent): void {
        this.bufferedListService.loadData();
    }
}
