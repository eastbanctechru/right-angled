import {Component} from 'angular2/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';
import {MISC_DIRECTIVES} from '../../misc-directives';

@Component({
    directives: [MISC_DIRECTIVES],
    selector: 'rt-take-row-count',
    template: '<input rt-select-on-focus type="text" class="form-control" maxlength="3" (keyup.enter)="onKeyUp($event)" [(ngModel)]="bufferedListService.takeRowCount" />'
})
export class RtTakeRowCount {
    bufferedListService: NgBufferedListService;
    constructor(listHost: RtList) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-take-row-count] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
    }
    onKeyUp(evt: KeyboardEvent): void {
        this.bufferedListService.loadData();
    }
}
