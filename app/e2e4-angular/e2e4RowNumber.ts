import {Component, Input, OnChanges, Optional} from 'angular2/core';
import {NgListService} from './ngListService';
import {NgBufferedListService} from './ngBufferedListService';
import {NgPagedListService} from './ngPagedListService';

@Component({
    selector: 'row-number',
    template: `{{rowNumber}}<ng-content></ng-content>`
})
export class E2E4RowNumber implements OnChanges {
    @Input() index: number;
    rowNumber: number;
    listService: NgListService | NgPagedListService | NgBufferedListService;
    constructor(
        @Optional() ngListService: NgListService,
        @Optional() ngPagedListService: NgPagedListService,
        @Optional() ngBufferedListService: NgBufferedListService) {
        this.listService = ngListService || ngPagedListService || ngBufferedListService;
    }
    ngOnChanges(): void {
        if (!(this.listService instanceof NgListService
            || this.listService instanceof NgPagedListService
            || this.listService instanceof NgBufferedListService)) {
            throw new Error('Context for row-number element must be instance of NgListService, NgPagedListService or NgBufferedListService.');
        }
        if (this.listService instanceof NgListService || this.listService instanceof NgBufferedListService) {
            this.rowNumber = this.index + 1;
        } else if (this.listService instanceof NgPagedListService) {
            this.rowNumber = this.index + (<NgPagedListService>this.listService).displayFrom;
        }
    }
}
