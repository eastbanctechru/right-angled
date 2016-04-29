import {Component, ChangeDetectorRef} from 'angular2/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';
import {KeyCodes} from 'e2e4/src/common/keyCodes';

@Component({
    selector: 'rt-take-row-count',
    template: '<input type="text" class="form-control" maxlength="3" (keyup)="onKeyUp($event)" [(ngModel)]="bufferedListService.takeRowCount" />'
})
export class RtTakeRowCount {
    bufferedListService: NgBufferedListService;
    changeDetectorRef: ChangeDetectorRef;
    constructor(listHost: RtList, changeDetectorRef: ChangeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        if (!listHost.isBufferedList) {
            throw new Error('[rt-load-more] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
    }
    onKeyUp(evt: KeyboardEvent): void {
        if (evt.keyCode === KeyCodes.Enter) {
            this.changeDetectorRef.detach();
            this.bufferedListService.loadData();
            setTimeout(() => this.changeDetectorRef.reattach());
        }
    }
}
