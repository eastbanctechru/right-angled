import {Component, Input, OnChanges, Optional} from 'angular2/core';
import {E2E4List} from './e2e4List';
import {NgPagedListService} from '../bootstrap/ngPagedListService';

@Component({
    selector: 'row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class E2E4RowNumber implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    listHost: E2E4List;
    constructor(listHost: E2E4List) {
        this.listHost = listHost;
    }
    ngOnChanges(): void {
        if (this.listHost.ngListServiceMediator.isSimpleList || this.listHost.ngListServiceMediator.isBufferedList) {
            this.rowNumber = this.index + 1;
        } else if (this.listHost.ngListServiceMediator.isPagedList) {
            this.rowNumber = this.index + (<NgPagedListService>this.listHost.ngListServiceMediator.instance).displayFrom;
        }
    }
}
