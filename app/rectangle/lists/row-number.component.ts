import {Component, Input, OnChanges, Optional} from 'angular2/core';
import {ListComponent} from './list.component';
import {NgPagedListService} from '../bootstrap/ngPagedListService';

@Component({
    selector: 'rt-row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class RowNumberComponent implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    listHost: ListComponent;
    constructor(listHost: ListComponent) {
        this.listHost = listHost;
    }
    ngOnChanges(): void {
        if (this.listHost.isSimpleList || this.listHost.isBufferedList) {
            this.rowNumber = this.index + 1;
        } else if (this.listHost.isPagedList) {
            this.rowNumber = this.index + (<NgPagedListService>this.listHost.serviceInstance).displayFrom;
        }
    }
}
